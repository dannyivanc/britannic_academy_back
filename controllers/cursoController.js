const Cursos = require('../models/Cursos');
const sequelize = require('../config/database');

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
            attributes: ['id', 'nombre', 'descripcion'], // Solo info relevante
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

        const existingCurso = await Cursos.findOne({ where: { nombre } });
        if (existingCurso) {
            return res.status(400).json({ message: 'El nombre del curso ya existe' });
        }

        const curso = await Cursos.create({
            nombre,
            descripcion,
            lugar,
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

        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        if (nombre && nombre !== curso.nombre) {
            const existingCurso = await Cursos.findOne({ where: { nombre } });
            if (existingCurso) {
                return res.status(400).json({ message: 'El nombre del curso ya existe' });
            }
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
