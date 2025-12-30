const Grupo = require('../models/Grupos');
const Nivel = require('../models/Niveles');
const Usuario = require('../models/Usuario');

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

        // Ciclar entre activo e inactivo (o completado si se prefiere una lógica más compleja)
        // Por simplicidad en el toggle, alternaremos entre activo e inactivo
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
