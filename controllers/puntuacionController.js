const Puntuacion = require('../models/Puntuacion');
const Usuario = require('../models/Usuario');
const { Op } = require('sequelize');

exports.registrarPuntuacion = async (req, res) => {
    try {
        const { userId } = req.user;
        const { juego_id, tipo_juego, puntaje } = req.body;

        if (!juego_id || !tipo_juego || puntaje === undefined) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        // Buscar si ya existe una puntuación para este usuario y juego
        const puntuacionExistente = await Puntuacion.findOne({
            where: {
                usuario_id: userId,
                juego_id: juego_id,
                tipo_juego: tipo_juego
            }
        });

        if (puntuacionExistente) {
            // Solo actualizar si el nuevo puntaje es mejor (tiempo menor)
            if (puntaje < puntuacionExistente.puntaje) {
                puntuacionExistente.puntaje = puntaje;
                puntuacionExistente.fecha = new Date();
                await puntuacionExistente.save();
                return res.json({ message: 'Mejor puntuación actualizada', puntuacion: puntuacionExistente });
            } else {
                return res.json({ message: 'Puntuación actual es mejor que la nueva', puntuacion: puntuacionExistente });
            }
        } else {
            // Crear nueva puntuación
            const nuevaPuntuacion = await Puntuacion.create({
                usuario_id: userId,
                juego_id: juego_id,
                tipo_juego: tipo_juego,
                puntaje: puntaje
            });
            return res.json({ message: 'Puntuación registrada correctamente', puntuacion: nuevaPuntuacion });
        }
    } catch (error) {
        console.error('Error al registrar puntuación:', error);
        res.status(500).json({ error: 'Error al registrar la puntuación' });
    }
};

exports.getLeaderboard = async (req, res) => {
    try {
        const { juego_id, tipo_juego } = req.query;
        const { userId } = req.user;

        if (!juego_id || !tipo_juego) {
            return res.status(400).json({ error: 'Faltan parámetros de consulta' });
        }

        // Obtener los mejores 10 (puntaje menor)
        const top10 = await Puntuacion.findAll({
            where: {
                juego_id: juego_id,
                tipo_juego: tipo_juego
            },
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['id', 'nombre']
            }],
            order: [['puntaje', 'ASC']],
            limit: 10
        });

        // Obtener la posición del usuario actual
        // Primero, obtener todas las puntuaciones ordenadas para este juego
        const todasPuntuaciones = await Puntuacion.findAll({
            where: {
                juego_id: juego_id,
                tipo_juego: tipo_juego
            },
            attributes: ['usuario_id', 'puntaje'],
            order: [['puntaje', 'ASC']]
        });

        const userRankIndex = todasPuntuaciones.findIndex(p => p.usuario_id === userId);
        const userScore = todasPuntuaciones[userRankIndex] ? todasPuntuaciones[userRankIndex].puntaje : null;

        res.json({
            top10,
            userRank: userRankIndex !== -1 ? userRankIndex + 1 : null,
            userScore: userScore
        });
    } catch (error) {
        console.error('Error al obtener leaderboard:', error);
        res.status(500).json({ error: 'Error al obtener el leaderboard' });
    }
};
