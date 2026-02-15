const Contactos = require('../models/Contactos');
const path = require('path');
const fs = require('fs');
const imageOptimizer = require('./imageOptimizationController');

// Obtener todos los contactos (para admin)
exports.getAllContactos = async (req, res) => {
    try {
        const contactos = await Contactos.findAll();
        res.json(contactos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener contactos públicos
exports.getPublicContactos = async (req, res) => {
    try {
        const contactos = await Contactos.findAll();
        res.json(contactos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createContacto = async (req, res) => {
    try {
        const { pais, telefono, facebook } = req.body;
        let imagen_url = null;

        if (req.file) {
            const filePath = path.join(__dirname, '..', 'uploads', 'contactos', req.file.filename);
            const newFilename = await imageOptimizer.optimizeImage(filePath);
            imagen_url = `${req.protocol}://${req.get('host')}/uploads/contactos/${newFilename}`;
        }

        const contacto = await Contactos.create({
            pais,
            telefono,
            facebook,
            imagen_url
        });
        res.status(201).json({ message: 'Contacto creado', contacto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateContacto = async (req, res) => {
    try {
        const { id } = req.params;
        const { pais, telefono, facebook } = req.body;
        const contacto = await Contactos.findByPk(id);

        if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });

        if (req.file) {
            // Eliminar imagen anterior si existe
            if (contacto.imagen_url) {
                const oldFilename = contacto.imagen_url.split('/').pop();
                const oldPath = path.join(__dirname, '..', 'uploads', 'contactos', oldFilename);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }

            const filePath = path.join(__dirname, '..', 'uploads', 'contactos', req.file.filename);
            const newFilename = await imageOptimizer.optimizeImage(filePath);
            contacto.imagen_url = `${req.protocol}://${req.get('host')}/uploads/contactos/${newFilename}`;
        }

        contacto.pais = pais || contacto.pais;
        contacto.telefono = telefono || contacto.telefono;
        contacto.facebook = facebook || contacto.facebook;

        await contacto.save();
        res.json({ message: 'Contacto actualizado', contacto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteContacto = async (req, res) => {
    try {
        const { id } = req.params;
        const contacto = await Contactos.findByPk(id);

        if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });

        // Eliminar imagen del servidor
        if (contacto.imagen_url) {
            const filename = contacto.imagen_url.split('/').pop();
            const filePath = path.join(__dirname, '..', 'uploads', 'contactos', filename);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await contacto.destroy();
        res.json({ message: 'Contacto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
