const Grupo = require('../models/Grupos');
const Nivel = require('../models/Niveles');
const Usuario = require('../models/Usuario');
const Inscripcion = require('../models/Inscripciones');
const Unidades = require('../models/Unidades');
const Semanas = require('../models/Semanas');
const Curso = require('../models/Cursos');
const PermisoMaterial = require('../models/PermisoMaterial');
const Pdfs = require('../models/Pdfs');
const Ebooks = require('../models/Ebooks');
const { Op } = require('sequelize');
const { fixObjectUrls } = require('../utils/urlHelper');

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
                    estado: 'activo'
                },
                include: [{
                    model: Nivel, as: 'nivel',
                    attributes: ['id', 'nombre', 'logo_url'],
                    include: [{
                        model: Unidades, as: 'unidades',
                        attributes: ['id', 'nombre'],
                        include: [{ model: Semanas, as: 'semanas', attributes: ['id', 'nombre', 'identificador'] }]
                    }]
                }],
                order: [
                    ['id', 'DESC'],
                    [{ model: Nivel, as: 'nivel' }, 'orden', 'ASC'],
                    [{ model: Nivel, as: 'nivel' }, { model: Unidades, as: 'unidades' }, 'id', 'ASC'],
                    [{ model: Nivel, as: 'nivel' }, { model: Unidades, as: 'unidades' }, { model: Semanas, as: 'semanas' }, 'id', 'ASC']
                ]
            });
        } else if (user.rol === 'estudiante') {
            // Obtener unidades permitidas
            const permisos = await PermisoMaterial.findAll({
                where: { usuario_id: userId, tipo_recurso: 'unidad' }
            });
            const unidadesPermitidasIds = permisos.map(p => p.recurso_id);

            const inscripciones = await Inscripcion.findAll({
                where: { estudiante_id: userId },
                include: [{
                    model: Grupo,
                    as: 'grupo',
                    where: { estado: ['activo', 'completado'] },
                    include: [{
                        model: Nivel, as: 'nivel',
                        attributes: ['id', 'nombre', 'orden', 'logo_url'],
                        include: [{
                            model: Unidades, as: 'unidades',
                            where: { id: { [Op.in]: unidadesPermitidasIds } },
                            attributes: ['id', 'nombre'],
                            required: false,
                            include: [{ model: Semanas, as: 'semanas', attributes: ['id', 'nombre', 'identificador'] }]
                        }]
                    }]
                }],
                order: [
                    ['id', 'DESC'], // Inscripcion.id
                    [{ model: Grupo, as: 'grupo' }, { model: Nivel, as: 'nivel' }, 'orden', 'ASC'],
                    [{ model: Grupo, as: 'grupo' }, { model: Nivel, as: 'nivel' }, { model: Unidades, as: 'unidades' }, 'id', 'ASC'],
                    [{ model: Grupo, as: 'grupo' }, { model: Nivel, as: 'nivel' }, { model: Unidades, as: 'unidades' }, { model: Semanas, as: 'semanas' }, 'id', 'ASC']
                ]
            });

            grupos = inscripciones.map(i => i.grupo);
        }

        res.json(fixObjectUrls(grupos, [
            { field: 'nivel', fields: ['logo_url'] }
        ]));
    } catch (error) {
        console.error('Error en getGruposByUser:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getGrupoById = async (req, res) => {
    try {
        const { id } = req.params;
        const isNumeric = /^\d+$/.test(id);
        const where = isNumeric ? { id } : { identificador: id };

        let unidadesWhere = {};
        let pdfsWhere = {};
        let ebooksWhere = {};

        if (req.user && req.user.rol === 'estudiante') {
            const permisos = await PermisoMaterial.findAll({
                where: {
                    usuario_id: req.user.userId,
                    tipo_recurso: ['unidad', 'documento', 'ebook']
                }
            });
            const unidadesPermitidasIds = permisos.filter(p => p.tipo_recurso === 'unidad').map(p => p.recurso_id);
            const pdfsPermitidosIds = permisos.filter(p => p.tipo_recurso === 'documento').map(p => p.recurso_id);
            const ebooksPermitidosIds = permisos.filter(p => p.tipo_recurso === 'ebook').map(p => p.recurso_id);

            if (unidadesPermitidasIds.length === 0) {
                unidadesWhere = { id: -1 };
            } else {
                unidadesWhere = { id: { [Op.in]: unidadesPermitidasIds } };
            }

            if (pdfsPermitidosIds.length === 0) {
                pdfsWhere = { id: -1 };
            } else {
                pdfsWhere = { id: { [Op.in]: pdfsPermitidosIds } };
            }

            if (ebooksPermitidosIds.length === 0) {
                ebooksWhere = { id: -1 };
            } else {
                ebooksWhere = { id: { [Op.in]: ebooksPermitidosIds } };
            }
        }

        const grupo = await Grupo.findOne({
            where,
            include: [
                {
                    model: Nivel,
                    as: 'nivel',
                    attributes: ['id', 'nombre', 'logo_url'],
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
                            required: false,
                            include: [
                                {
                                    model: Semanas,
                                    as: 'semanas'
                                },
                                {
                                    model: Pdfs,
                                    as: 'pdf',
                                    where: Object.keys(pdfsWhere).length > 0 ? pdfsWhere : undefined,
                                    required: false
                                },
                                {
                                    model: Ebooks,
                                    as: 'ebook',
                                    where: Object.keys(ebooksWhere).length > 0 ? ebooksWhere : undefined,
                                    required: false
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

        res.json(fixObjectUrls(grupo, [
            {
                field: 'nivel', fields: [
                    'logo_url',
                    {
                        field: 'unidades', fields: [
                            { field: 'ebook', fields: ['imagen_portada'] },
                            { field: 'pdf', fields: ['imagen_portada', 'archivo_url'] }
                        ]
                    }
                ]
            }
        ]));
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
                    attributes: ['id', 'nombre', 'curso_id', 'logo_url'],
                    include: [
                        {
                            model: Curso,
                            as: 'curso',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: Usuario,
                    as: 'docente',
                    attributes: ['id', 'nombre']
                }
            ],
            order: [['id', 'DESC']]
        });
        res.json(fixObjectUrls(grupos, [
            { field: 'nivel', fields: ['logo_url'] }
        ]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createGrupo = async (req, res) => {
    try {
        const { codigo, horario, dias, fecha_inicio, descripcion, nivel_id, docente_id, estado } = req.body;

        const existingGrupo = await Grupo.findOne({ where: { codigo } });
        if (existingGrupo) {
            return res.status(400).json({ message: 'El código del grupo ya existe' });
        }



        const grupo = await Grupo.create({
            codigo,
            horario,
            dias,
            fecha_inicio,
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
        const { codigo, horario, dias, fecha_inicio, descripcion, nivel_id, docente_id, estado } = req.body;
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
        grupo.horario = horario || grupo.horario;
        grupo.dias = dias || grupo.dias;
        grupo.fecha_inicio = fecha_inicio || grupo.fecha_inicio;
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
