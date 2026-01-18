const Videos = require('../models/Videos');
const Semanas = require('../models/Semanas');
const Unidades = require('../models/Unidades');
const Niveles = require('../models/Niveles');
const Cursos = require('../models/Cursos');
const PermisoMaterial = require('../models/PermisoMaterial');
const { Op } = require('sequelize');

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Videos.findAll({
            include: [{
                model: Semanas,
                as: 'semana',
                attributes: ['id', 'nombre', 'unidad_id'],
                include: [{
                    model: Unidades,
                    as: 'unidad',
                    attributes: ['id', 'nombre', 'nivel_id'],
                    include: [{
                        model: Niveles,
                        as: 'nivel',
                        attributes: ['id', 'nombre', 'curso_id'],
                        include: [{
                            model: Cursos,
                            as: 'curso',
                            attributes: ['id', 'nombre']
                        }]
                    }]
                }]
            }],
            order: [['id', 'DESC']]
        });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVideosBySemana = async (req, res) => {
    try {
        const { semanaId } = req.params;
        const whereClause = { semana_id: semanaId };

        if (req.user && req.user.rol === 'estudiante') {
            const permisos = await PermisoMaterial.findAll({
                where: {
                    usuario_id: req.user.userId,
                    tipo_recurso: 'video'
                }
            });
            const videosPermitidosIds = permisos.map(p => p.recurso_id);
            if (videosPermitidosIds.length === 0) return res.json([]);
            whereClause.id = { [Op.in]: videosPermitidosIds };
        }

        const videos = await Videos.findAll({ where: whereClause });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los videos de la semana' });
    }
};

exports.createVideo = async (req, res) => {
    try {
        const { nombre, semana_id, descripcion, video_url } = req.body;
        const video = await Videos.create({
            nombre,
            semana_id,
            descripcion,
            video_url
        });
        res.status(201).json({ message: 'Video creado', video });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, semana_id, descripcion, video_url } = req.body;
        const video = await Videos.findByPk(id);

        if (!video) return res.status(404).json({ message: 'Video no encontrado' });

        video.nombre = nombre || video.nombre;
        video.semana_id = semana_id || video.semana_id;
        video.descripcion = descripcion !== undefined ? descripcion : video.descripcion;
        video.video_url = video_url || video.video_url;

        await video.save();
        res.json({ message: 'Video actualizado', video });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Videos.findByPk(id);
        if (!video) return res.status(404).json({ message: 'Video no encontrado' });

        await video.destroy();
        res.json({ message: 'Video eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
