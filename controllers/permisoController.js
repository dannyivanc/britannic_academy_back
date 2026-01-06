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

// Actualizar permisos (Recibe lista de objetos { tipo, id })
// Esta función espera recibir TODOS los permisos QUE DEBEN QUEDAR.
// Borra lo anterior y crea lo nuevo.
// Opcional: Podría recibir filtros por tipo si queremos actualizar solo juegos sin tocar documentos.
exports.updatePermisosUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const { materiales } = req.body; // Array de { tipo_recurso, recurso_id }

        if (!Array.isArray(materiales)) {
            return res.status(400).json({ error: 'Formato de datos inválido' });
        }

        // Transacción simple: borrar todo y crear nuevos
        // NOTA: Si queremos ser más finos y solo actualizar juegos, habría que filtrar el destroy.
        // Asumimos que el frontend envía TODO lo que el usuario debe tener (snapshot completo) 
        // o envía un flag 'tipo' para saber qué borrar.
        // Para soportar modularidad, permitiremos pasar un filtro query param opcional ?tipo=juego

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
