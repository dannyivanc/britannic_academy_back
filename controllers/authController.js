const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { usuario, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Usuario.create({ usuario, password: hashedPassword });
        res.status(201).json({ message: 'Usuario creado correctamente', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        if (!usuario) {
            return res.status(400).json({ error: 'El campo usuario es obligatorio' });
        }

        const user = await Usuario.findOne({ where: { usuario } });
        if (!user) {
            return res.status(401).json({ message: 'Autenticacion fallida' });
        }
        if (!user.activo) {
            return res.status(401).json({ message: 'Usuario inactivo. Contacte al administrador.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Autenticacion fallida' });
        }

        // Generar un token de sesión único
        const crypto = require('crypto');
        const sessionToken = crypto.randomBytes(32).toString('hex');

        // Actualizar el usuario con el nuevo sessionToken y última actividad
        await user.update({
            sessionToken: sessionToken,
            ultimaActividad: new Date()
        });

        const token = jwt.sign(
            { userId: user.id, usuario: user.usuario, rol: user.rol, sessionToken: sessionToken },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token, expiresIn: 3600, rol: user.rol, usuario: user.usuario, nombre: user.nombre, id: user.id });
    } catch (error) {
        // console.error('Error en login:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await Usuario.findByPk(userId);

        if (user) {
            await user.update({
                sessionToken: null,
                ultimaActividad: null
            });
        }

        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verify = async (req, res) => {
    res.status(200).json({ message: 'Sesión válida', user: req.user });
};
