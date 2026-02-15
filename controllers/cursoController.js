const Cursos = require('../models/Cursos');
const sequelize = require('../config/database');
const fs = require('fs');
const path = require('path');

exports.getAllCursos = async (req, res) => {
    try {
        const cursos = await Cursos.findAll({
            order: [['lugar', 'ASC']]
        });
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPublicCursos = async (req, res) => {
    try {
        const cursos = await Cursos.findAll({
            where: { estado: true },
            attributes: ['id', 'nombre', 'descripcion', 'imagen_url'], // Solo info relevante
            order: [['lugar', 'ASC']]
        });
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCurso = async (req, res) => {
    try {
        const { nombre, descripcion, lugar } = req.body;
        let imagen_url = null;

        if (req.file) {
            imagen_url = `${req.protocol}://${req.get('host')}/uploads/cursos/${req.file.filename}`;
        }

        const existingCurso = await Cursos.findOne({ where: { nombre } });
        if (existingCurso) {
            // Borrar imagen subida si el nombre ya existe
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'El nombre del curso ya existe' });
        }

        const curso = await Cursos.create({
            nombre,
            descripcion,
            lugar,
            imagen_url,
            estado: true
        });
        res.status(201).json({ message: 'Curso creado', curso });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, lugar } = req.body;
        const curso = await Cursos.findByPk(id);

        if (!curso) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        if (nombre && nombre !== curso.nombre) {
            const existingCurso = await Cursos.findOne({ where: { nombre } });
            if (existingCurso) {
                if (req.file) fs.unlinkSync(req.file.path);
                return res.status(400).json({ message: 'El nombre del curso ya existe' });
            }
        }

        if (req.file) {
            // Borrar imagen anterior si existe
            if (curso.imagen_url) {
                const oldFileName = curso.imagen_url.split('/').pop();
                const oldPath = path.join(__dirname, '..', 'uploads', 'cursos', oldFileName);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            curso.imagen_url = `${req.protocol}://${req.get('host')}/uploads/cursos/${req.file.filename}`;
        }

        curso.nombre = nombre || curso.nombre;
        curso.descripcion = descripcion !== undefined ? descripcion : curso.descripcion;
        curso.lugar = lugar !== undefined ? lugar : curso.lugar;

        await curso.save();
        res.json({ message: 'Curso actualizado', curso });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.toggleCursoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Cursos.findByPk(id);

        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        curso.estado = !curso.estado;
        await curso.save();

        res.json({
            message: `Curso ${curso.estado ? 'activado' : 'desactivado'}`,
            estado: curso.estado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.reorderCursos = async (req, res) => {
    try {
        const { orders } = req.body; // Expects array of { id, lugar }
        if (!Array.isArray(orders)) {
            return res.status(400).json({ message: 'Se esperaba un arreglo de ordenación' });
        }

        // Use a transaction for safety
        await sequelize.transaction(async (t) => {
            for (const item of orders) {
                await Cursos.update(
                    { lugar: item.lugar },
                    { where: { id: item.id }, transaction: t }
                );
            }
        });

        res.json({ message: 'Orden de cursos actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNavbarData = async (req, res) => {
    try {
        const Niveles = require('../models/Niveles');
        const Unidades = require('../models/Unidades');
        const Semanas = require('../models/Semanas');

        const cursos = await Cursos.findAll({
            where: { estado: true },
            attributes: ['id', 'nombre'],
            include: [{
                model: Niveles,
                as: 'niveles',
                where: { estado: true },
                attributes: ['id', 'nombre'],
                required: false,
                include: [{
                    model: Unidades,
                    as: 'unidades',
                    attributes: ['id', 'nombre'],
                    include: [{
                        model: Semanas,
                        as: 'semanas',
                        attributes: ['id', 'nombre']
                    }]
                }]
            }],
            order: [
                ['lugar', 'ASC'],
                [{ model: Niveles, as: 'niveles' }, 'orden', 'ASC']
            ]
        });
        res.json(cursos);
    } catch (error) {
        console.error('Error fetching navbar data:', error);
        res.status(500).json({ message: error.message });
    }
};

