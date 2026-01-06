const ListaJuegos = require('../models/ListaJuegos');
const JuegoEmpList = require('../models/JuegoEmpList');
const PermisoMaterial = require('../models/PermisoMaterial');
const fs = require('fs');
const path = require('path');
const imageOptimizer = require('./imageOptimizationController');
const { Op } = require('sequelize');

// Obtener todas las listas de una semana (Genérico para el selector de juegos)
exports.getListasBySemana = async (req, res) => {
    try {
        const { semanaId } = req.params;
        const whereClause = { semana_id: semanaId };

        // Filtrado por rol de estudiante
        if (req.user && req.user.rol === 'estudiante') {
            const permisos = await PermisoMaterial.findAll({
                where: {
                    usuario_id: req.user.userId,
                    tipo_recurso: 'juego'
                }
            });
            const juegosPermitidosIds = permisos.map(p => p.recurso_id);

            // Si no tiene ningún permiso, forzamos resultado vacío
            if (juegosPermitidosIds.length === 0) {
                return res.json([]);
            }

            whereClause.id = { [Op.in]: juegosPermitidosIds };
        }

        const listas = await ListaJuegos.findAll({
            where: whereClause
        });
        res.json(listas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las listas de palabras' });
    }
};

// Subida de imágenes (Genérico)
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se subió ninguna imagen' });
        }

        const filePath = path.join(__dirname, '..', 'uploads', 'games', req.file.filename);
        const newFilename = await imageOptimizer.optimizeImage(filePath);

        // req.get('host') obtiene el valor del encabezado HTTP 'Host' enviado por el cliente (ej. 'localhost:3000' o 'tu-ip-o-dominio.com').
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/games/${newFilename}`;
        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Error al subir la imagen' });
    }
};

// Obtener todos los juegos con sus relaciones (Para la vista de administración general)
exports.getAllGames = async (req, res) => {
    try {
        const listas = await ListaJuegos.findAll({
            include: [
                {
                    model: require('../models/Semanas'),
                    as: 'semana',
                    include: [
                        {
                            model: require('../models/Unidades'),
                            as: 'unidad',
                            include: [
                                {
                                    model: require('../models/Niveles'),
                                    as: 'nivel',
                                    include: [
                                        {
                                            model: require('../models/Cursos'),
                                            as: 'curso'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [['id', 'DESC']]
        });
        res.json(listas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener todos los juegos' });
    }
};

// Obtener un juego por ID (Genérico, incluye detalles si existen)
// Nota: Si hay múltiples tipos de juegos, este include podría ser dinámico o traer todos los posibles.
// Por ahora mantendremos el include de JuegoEmpList ya que es lo único que hay.
exports.getGameById = async (req, res) => {
    try {
        const { id } = req.params;
        const lista = await ListaJuegos.findByPk(id, {
            include: [
                { model: JuegoEmpList, as: 'palabras' }, // Esto podría moverse a un controlador específico si se desea desacoplar totalmente
                {
                    model: require('../models/Semanas'),
                    as: 'semana',
                    include: [{
                        model: require('../models/Unidades'),
                        as: 'unidad',
                        include: [{
                            model: require('../models/Niveles'),
                            as: 'nivel'
                        }]
                    }]
                }
            ]
        });
        if (!lista) return res.status(404).json({ error: 'Juego no encontrado' });
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el juego' });
    }
};
