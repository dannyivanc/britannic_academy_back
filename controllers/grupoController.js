const Grupo = require('../models/Grupos');
const Nivel = require('../models/Niveles');
const Usuario = require('../models/Usuario');
const Inscripcion = require('../models/Inscripciones');
const Unidades = require('../models/Unidades');
const Semanas = require('../models/Semanas');
const Curso = require('../models/Cursos');
const PermisoMaterial = require('../models/PermisoMaterial');
const { Op } = require('sequelize');

exports.getGruposByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Usuario.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        let grupos = [];

        if (user.rol === 'docente') {
            grupos = await Grupo.findAll({
                where: {
                    docente_id: userId,
                    estado: 'activo' // mostrar solo grupos activos
                },
                include: [{ model: Nivel, as: 'nivel', attributes: ['nombre'] }],
                order: [['id', 'DESC']]
            });
        } else if (user.rol === 'estudiante') {
            const inscripciones = await Inscripcion.findAll({
                where: { estudiante_id: userId },
                include: [{
                    model: Grupo,
                    as: 'grupo',
                    where: {
                        estado: ['activo', 'completado'] // mostrar solo grupos activos y completados
                    },
                    include: [{ model: Nivel, as: 'nivel', attributes: ['nombre'] }]
                }]
            });
            grupos = inscripciones.map(i => i.grupo);
        }

        res.json(grupos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGrupoById = async (req, res) => {
    try {
        const { id } = req.params;

        let unidadesWhere = {};

        // Filtrar unidades si es estudiante
        if (req.user && req.user.rol === 'estudiante') {
            const permisos = await PermisoMaterial.findAll({
                where: {
                    usuario_id: req.user.userId,
                    tipo_recurso: 'unidad'
                }
            });
            const unidadesPermitidasIds = permisos.map(p => p.recurso_id);

            if (unidadesPermitidasIds.length === 0) {
                unidadesWhere = { id: -1 }; // Force empty result
            } else {
                unidadesWhere = { id: { [Op.in]: unidadesPermitidasIds } };
            }
        }

        const grupo = await Grupo.findByPk(id, {
            include: [
                {
                    model: Nivel,
                    as: 'nivel',
                    attributes: ['id', 'nombre'],
                    include: [
                        {
                            model: Curso,
                            as: 'curso',
                            attributes: ['id', 'nombre']
                        },
                        {
                            model: Unidades,
                            as: 'unidades',
                            where: Object.keys(unidadesWhere).length > 0 ? unidadesWhere : undefined,
                            required: false, // Permitir que el grupo cargue aunque no tenga unidades (o el filtro las oculte todas)
                            include: [
                                {
                                    model: Semanas,
                                    as: 'semanas'
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Usuario,
                    as: 'docente',
                    attributes: ['id', 'nombre']
                }
            ]
        });

        if (!grupo) {
            return res.status(404).json({ message: 'Grupo no encontrado' });
        }

        res.json(grupo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.findAll({
            include: [
                {
                    model: Nivel,
                    as: 'nivel',
                    attributes: ['id', 'nombre']
                },
                {
                    model: Usuario,
                    as: 'docente',
                    attributes: ['id', 'nombre']
                }
            ],
            order: [['id', 'DESC']]
        });
        res.json(grupos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createGrupo = async (req, res) => {
    try {
        const { codigo, nombre, descripcion, nivel_id, docente_id, estado } = req.body;

        const existingGrupo = await Grupo.findOne({ where: { codigo } });
        if (existingGrupo) {
            return res.status(400).json({ message: 'El código del grupo ya existe' });
        }

        const grupo = await Grupo.create({
            codigo,
            nombre,
            descripcion,
            nivel_id,
            docente_id,
            estado: estado || 'activo'
        });
        res.status(201).json({ message: 'Grupo creado', grupo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, nombre, descripcion, nivel_id, docente_id, estado } = req.body;
        const grupo = await Grupo.findByPk(id);

        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });

        if (grupo.estado === 'completado') {
            return res.status(403).json({ message: 'No se puede modificar un grupo que ya ha sido completado' });
        }

        if (codigo && codigo !== grupo.codigo) {
            const existingGrupo = await Grupo.findOne({ where: { codigo } });
            if (existingGrupo) {
                return res.status(400).json({ message: 'El código del grupo ya existe' });
            }
        }

        grupo.codigo = codigo || grupo.codigo;
        grupo.nombre = nombre || grupo.nombre;
        grupo.descripcion = descripcion !== undefined ? descripcion : grupo.descripcion;
        grupo.nivel_id = nivel_id || grupo.nivel_id;
        grupo.docente_id = docente_id || grupo.docente_id;
        grupo.estado = estado || grupo.estado;

        await grupo.save();
        res.json({ message: 'Grupo actualizado', grupo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.toggleGrupoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const grupo = await Grupo.findByPk(id);

        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });

        if (grupo.estado === 'completado') {
            return res.status(403).json({ message: 'No se puede cambiar el estado de un grupo completado' });
        }
        grupo.estado = grupo.estado === 'activo' ? 'inactivo' : 'activo';
        await grupo.save();

        res.json({
            message: `Grupo ${grupo.estado}`,
            estado: grupo.estado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
