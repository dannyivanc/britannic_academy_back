const PermisoMaterial = require('../models/PermisoMaterial');
const { Op } = require('sequelize');

// Obtener todos los permisos de un usuario
exports.getPermisosUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const permisos = await PermisoMaterial.findAll({
            where: { usuario_id: usuarioId }
        });

        // Devolvemos la lista estructurada o plana
        res.json(permisos);
    } catch (error) {
        console.error('Error al obtener permisos:', error);
        res.status(500).json({ error: 'Error al obtener permisos' });
    }
};

exports.updatePermisosUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const { materiales } = req.body;

        if (!Array.isArray(materiales)) {
            return res.status(400).json({ error: 'Formato de datos inválido' });
        }



        const { tipo } = req.query;
        const whereClause = { usuario_id: usuarioId };
        if (tipo) {
            whereClause.tipo_recurso = tipo;
        }

        await PermisoMaterial.destroy({
            where: whereClause
        });

        if (materiales.length > 0) {
            const nuevosPermisos = materiales.map(m => ({
                usuario_id: usuarioId,
                tipo_recurso: m.tipo_recurso,
                recurso_id: m.recurso_id
            }));
            await PermisoMaterial.bulkCreate(nuevosPermisos);
        }

        res.json({ message: 'Permisos actualizados correctamente' });
    } catch (error) {
        console.error('Error al actualizar permisos:', error);
        res.status(500).json({ error: 'Error al actualizar permisos' });
    }
};
