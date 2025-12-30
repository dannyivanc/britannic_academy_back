const Inscripciones = require('../models/Inscripciones');
const Usuario = require('../models/Usuario');

exports.getAllInscripciones = async (req, res) => {
    try {
        const inscripciones = await Inscripciones.findAll({
            include: [
                { model: Usuario, as: 'estudiante', attributes: ['id', 'nombre', 'celular', 'usuario', 'email'] }
            ]
        });
        res.json(inscripciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInscripcionById = async (req, res) => {
    try {
        const { id } = req.params;
        const inscripcion = await Inscripciones.findByPk(id);
        if (!inscripcion) return res.status(404).json({ message: 'Inscripción no encontrada' });
        res.json(inscripcion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createInscripcion = async (req, res) => {
    try {
        const { grupo_id, estudiante_id, estado } = req.body;

        // Verificar si ya existe el estudiante en ese grupo
        const existing = await Inscripciones.findOne({ where: { grupo_id, estudiante_id } });
        if (existing) {
            return res.status(400).json({ message: 'El estudiante ya está inscrito en este grupo' });
        }

        const inscripcion = await Inscripciones.create({
            grupo_id,
            estudiante_id,
            estado: estado || 'activo'
        });
        res.status(201).json({ message: 'Inscripción creada correctamente', inscripcion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInscripcion = async (req, res) => {
    try {
        const { id } = req.params;
        const { grupo_id, estudiante_id, estado } = req.body;
        const inscripcion = await Inscripciones.findByPk(id);

        if (!inscripcion) return res.status(404).json({ message: 'Inscripción no encontrada' });

        inscripcion.grupo_id = grupo_id || inscripcion.grupo_id;
        inscripcion.estudiante_id = estudiante_id || inscripcion.estudiante_id;
        inscripcion.estado = estado || inscripcion.estado;

        await inscripcion.save();
        res.json({ message: 'Inscripción actualizada', inscripcion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteInscripcion = async (req, res) => {
    try {
        const { id } = req.params;
        const inscripcion = await Inscripciones.findByPk(id);
        if (!inscripcion) return res.status(404).json({ message: 'Inscripción no encontrada' });

        await inscripcion.destroy();
        res.json({ message: 'Inscripción eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
