const Comunicado = require('../models/Comunicado');
const fs = require('fs');
const path = require('path');
const { fixObjectUrls } = require('../utils/urlHelper');

exports.getPublicComunicados = async (req, res) => {
    try {
        const comunicados = await Comunicado.findAll({
            order: [['id', 'DESC']]
        });
        res.json(fixObjectUrls(comunicados, ['imagen_url']));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllComunicados = async (req, res) => {
    try {
        const comunicados = await Comunicado.findAll({
            order: [['id', 'DESC']]
        });
        res.json(fixObjectUrls(comunicados, ['imagen_url']));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createComunicado = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        let imagen_url = null;

        if (req.file) {
            imagen_url = `${process.env.URL_SERVER || `${req.protocol}://${req.get('host')}`}/uploads/comunicados/${req.file.filename}`;
        }

        const comunicado = await Comunicado.create({
            titulo,
            descripcion,
            imagen_url
        });
        res.status(201).json({ message: 'Comunicado creado exitosamente', comunicado: fixObjectUrls(comunicado, ['imagen_url']) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateComunicado = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion } = req.body;
        const comunicado = await Comunicado.findByPk(id);

        if (!comunicado) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(404).json({ message: 'Comunicado no encontrado' });
        }

        if (req.file) {
            if (comunicado.imagen_url) {
                const oldFileName = comunicado.imagen_url.split('/').pop();
                const oldPath = path.join(__dirname, '..', 'uploads', 'comunicados', oldFileName);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            comunicado.imagen_url = `${process.env.URL_SERVER || `${req.protocol}://${req.get('host')}`}/uploads/comunicados/${req.file.filename}`;
        }

        comunicado.titulo = titulo || comunicado.titulo;
        comunicado.descripcion = descripcion !== undefined ? descripcion : comunicado.descripcion;

        await comunicado.save();
        res.json({ message: 'Comunicado actualizado', comunicado: fixObjectUrls(comunicado, ['imagen_url']) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteComunicado = async (req, res) => {
    try {
        const { id } = req.params;
        const comunicado = await Comunicado.findByPk(id);

        if (!comunicado) return res.status(404).json({ message: 'Comunicado no encontrado' });

        if (comunicado.imagen_url) {
            const fileName = comunicado.imagen_url.split('/').pop();
            const filePath = path.join(__dirname, '..', 'uploads', 'comunicados', fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await comunicado.destroy();
        res.json({ message: 'Comunicado eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
