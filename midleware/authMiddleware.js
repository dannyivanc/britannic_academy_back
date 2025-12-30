const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Token no proporcionado o formato inválido" });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Buscar el usuario en la base de datos
        const user = await Usuario.findByPk(decodedToken.userId);

        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        // Verificar que el sessionToken coincida (sesión única)
        if (user.sessionToken !== decodedToken.sessionToken) {
            return res.status(401).json({
                message: "Sesión inválida. Se ha iniciado sesión en otro dispositivo.",
                sessionExpired: true
            });
        }

        // Verificar timeout de inactividad (30 minutos = 1800000 ms)
        const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutos
        const now = new Date();
        const ultimaActividad = new Date(user.ultimaActividad);
        const timeSinceLastActivity = now - ultimaActividad;

        if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
            // Limpiar la sesión por inactividad
            await user.update({
                sessionToken: null,
                ultimaActividad: null
            });
            return res.status(401).json({
                message: "Sesión expirada por inactividad",
                sessionExpired: true
            });
        }

        // Actualizar la última actividad
        await user.update({ ultimaActividad: now });

        req.user = {
            userId: decodedToken.userId,
            usuario: decodedToken.usuario,
            rol: decodedToken.rol
        };
        next();
    } catch (error) {
        res.status(401).json({ message: "Autenticacion fallida", error: error.message });
    }
};
