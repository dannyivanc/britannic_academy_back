const Galeria = require('../models/Galeria');
const sequelize = require('../config/database');
const fs = require('fs');
const path = require('path');
const { fixObjectUrls } = require('../utils/urlHelper');

exports.getPublicGaleria = async (req, res) => {
    try {
        const galeria = await Galeria.findAll({
            where: { proximo: false },
            order: [['id', 'DESC']]
        });
        res.json(fixObjectUrls(galeria, ['imagen_url']));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProximo = async (req, res) => {
    try {
        const item = await Galeria.findOne({
            where: { proximo: true }
        });
        res.json(item ? fixObjectUrls(item, ['imagen_url']) : {});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllGaleria = async (req, res) => {
    try {
        const galeria = await Galeria.findAll({
            order: [['id', 'DESC']]
        });
        res.json(fixObjectUrls(galeria, ['imagen_url']));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createGaleria = async (req, res) => {
    try {
        const { nombre } = req.body;
        let imagen_url = null;

        if (req.file) {
            imagen_url = `${process.env.URL_SERVER || `${req.protocol}://${req.get('host')}`}/uploads/galeria/${req.file.filename}`;
        }

        const item = await Galeria.create({
            nombre,
            imagen_url,
            proximo: false
        });
        res.status(201).json({ message: 'Imagen agregada a la galería', item: fixObjectUrls(item, ['imagen_url']) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateGaleria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const item = await Galeria.findByPk(id);

        if (!item) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(404).json({ message: 'Item no encontrado' });
        }

        if (req.file) {
            if (item.imagen_url) {
                const oldFileName = item.imagen_url.split('/').pop();
                const oldPath = path.join(__dirname, '..', 'uploads', 'galeria', oldFileName);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            item.imagen_url = `${process.env.URL_SERVER || `${req.protocol}://${req.get('host')}`}/uploads/galeria/${req.file.filename}`;
        }

        item.nombre = nombre || item.nombre;
        await item.save();
        res.json({ message: 'Galería actualizada', item: fixObjectUrls(item, ['imagen_url']) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteGaleria = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Galeria.findByPk(id);

        if (!item) return res.status(404).json({ message: 'Item no encontrado' });

        if (item.imagen_url) {
            const fileName = item.imagen_url.split('/').pop();
            const filePath = path.join(__dirname, '..', 'uploads', 'galeria', fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await item.destroy();
        res.json({ message: 'Imagen eliminada de la galería' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.setProximo = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { proximo } = req.body; // boolean

        const item = await Galeria.findByPk(id, { transaction: t });
        if (!item) {
            await t.rollback();
            return res.status(404).json({ message: 'Item no encontrado' });
        }

        if (proximo) {
            // Desactivar cualquier otro proximo anterior
            await Galeria.update({ proximo: false }, {
                where: { proximo: true },
                transaction: t
            });
        }

        item.proximo = proximo;
        await item.save({ transaction: t });

        await t.commit();
        res.json({ message: proximo ? 'Establecido como próximo' : 'Quitado de próximo', item });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
};
