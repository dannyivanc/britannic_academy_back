const Nivel = require('../models/Niveles');
const Curso = require('../models/Cursos');
const fs = require('fs');
const path = require('path');
const { fixObjectUrls } = require('../utils/urlHelper');

exports.getAllNiveles = async (req, res) => {
    try {
        const niveles = await Nivel.findAll({
            include: [{
                model: Curso,
                as: 'curso',
                attributes: ['id', 'nombre']
            }],
            order: [['orden', 'ASC']]
        });
        res.json(fixObjectUrls(niveles, ['imagen_url', 'logo_url']));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPublicNiveles = async (req, res) => {
    try {
        const niveles = await Nivel.findAll({
            where: { estado: true },
            attributes: ['id', 'codigo', 'nombre', 'descripcion', 'curso_id', 'imagen_url', 'logo_url'], // Solo info relevante
            include: [{
                model: Curso,
                as: 'curso',
                attributes: ['nombre']
            }],
            order: [['orden', 'ASC']]
        });
        res.json(fixObjectUrls(niveles, ['imagen_url', 'logo_url']));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNivel = async (req, res) => {
    try {
        const { codigo, nombre, descripcion, curso_id, orden } = req.body;
        let imagen_url = null;
        let logo_url = null;

        if (req.files && req.files['imagen']) {
            const file = req.files['imagen'][0];
            imagen_url = `${process.env.URL_SERVER || `${req.protocol}://${req.get('host')}`}/uploads/niveles/${file.filename}`;
        }

        if (req.files && req.files['logo']) {
            const file = req.files['logo'][0];
            logo_url = `${process.env.URL_SERVER || `${req.protocol}://${req.get('host')}`}/uploads/niveles/${file.filename}`;
        }

        const existingNivel = await Nivel.findOne({ where: { codigo } });
        if (existingNivel) {
            // Cleanup files if already exists
            if (req.files) {
                Object.values(req.files).flat().forEach(f => fs.unlinkSync(f.path));
            }
            return res.status(400).json({ message: 'El código del nivel ya existe' });
        }

        const nivel = await Nivel.create({
            codigo,
            nombre,
            descripcion,
            curso_id,
            orden,
            imagen_url,
            logo_url,
            estado: true
        });
        res.status(201).json({ message: 'Nivel creado', nivel: fixObjectUrls(nivel, ['imagen_url', 'logo_url']) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateNivel = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, nombre, descripcion, curso_id, orden } = req.body;
        const nivel = await Nivel.findByPk(id);

        if (!nivel) {
            if (req.files) {
                Object.values(req.files).flat().forEach(f => fs.unlinkSync(f.path));
            }
            return res.status(404).json({ message: 'Nivel no encontrado' });
        }

        if (codigo && codigo !== nivel.codigo) {
            const existingNivel = await Nivel.findOne({ where: { codigo } });
            if (existingNivel) {
                if (req.files) {
                    Object.values(req.files).flat().forEach(f => fs.unlinkSync(f.path));
                }
                return res.status(400).json({ message: 'El código del nivel ya existe' });
            }
        }

        // Handle Main Image
        if (req.files && req.files['imagen']) {
            const file = req.files['imagen'][0];
            if (nivel.imagen_url) {
                const oldFileName = nivel.imagen_url.split('/').pop();
                const oldPath = path.join(__dirname, '..', 'uploads', 'niveles', oldFileName);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            nivel.imagen_url = `${process.env.URL_SERVER || `${req.protocol}://${req.get('host')}`}/uploads/niveles/${file.filename}`;
        }

        // Handle Logo
        if (req.files && req.files['logo']) {
            const file = req.files['logo'][0];
            if (nivel.logo_url) {
                const oldFileName = nivel.logo_url.split('/').pop();
                const oldPath = path.join(__dirname, '..', 'uploads', 'niveles', oldFileName);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            nivel.logo_url = `${process.env.URL_SERVER || `${req.protocol}://${req.get('host')}`}/uploads/niveles/${file.filename}`;
        }

        nivel.codigo = codigo || nivel.codigo;
        nivel.nombre = nombre || nivel.nombre;
        nivel.descripcion = descripcion !== undefined ? descripcion : nivel.descripcion;
        nivel.curso_id = curso_id || nivel.curso_id;
        nivel.orden = orden !== undefined ? orden : nivel.orden;

        await nivel.save();
        res.json({ message: 'Nivel actualizado', nivel: fixObjectUrls(nivel, ['imagen_url', 'logo_url']) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.toggleNivelStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const nivel = await Nivel.findByPk(id);

        if (!nivel) return res.status(404).json({ message: 'Nivel no encontrado' });

        nivel.estado = !nivel.estado;
        await nivel.save();

        res.json({
            message: `Nivel ${nivel.estado ? 'activado' : 'desactivado'}`,
            estado: nivel.estado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.reorderNiveles = async (req, res) => {
    try {
        const { orders } = req.body; // Espera un arreglo de { id, orden }
        if (!Array.isArray(orders)) {
            return res.status(400).json({ message: 'Se esperaba un arreglo de ordenación' });
        }

        const sequelize = require('../config/database');

        await sequelize.transaction(async (t) => {
            for (const item of orders) {
                await Nivel.update(
                    { orden: item.orden },
                    { where: { id: item.id }, transaction: t }
                );
            }
        });

        res.json({ message: 'Orden de niveles actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
