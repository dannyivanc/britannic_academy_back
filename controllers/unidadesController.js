const Unidades = require('../models/Unidades');
const Semanas = require('../models/Semanas');
const PermisoMaterial = require('../models/PermisoMaterial');
const { Op } = require('sequelize');

exports.getUnidadesByNivel = async (req, res) => {
    try {
        const { nivel_id } = req.params;
        const whereClause = { nivel_id };

        // Filtrar si es estudiante
        if (req.user && req.user.rol === 'estudiante') {
            const permisos = await PermisoMaterial.findAll({
                where: {
                    usuario_id: req.user.userId,
                    tipo_recurso: 'unidad'
                }
            });
            const unidadesPermitidasIds = permisos.map(p => p.recurso_id);

            if (unidadesPermitidasIds.length === 0) {
                return res.json([]);
            }
            whereClause.id = { [Op.in]: unidadesPermitidasIds };
        }

        const unidades = await Unidades.findAll({
            where: whereClause,
            include: [{ model: Semanas, as: 'semanas' }]
        });
        res.json(unidades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUnidad = async (req, res) => {
    try {
        const { nombre, nivel_id, cantidadSemanas } = req.body;

        const unidad = await Unidades.create({ nombre, nivel_id });

        if (cantidadSemanas && cantidadSemanas > 0) {
            const semanasPromises = [];
            for (let i = 1; i <= cantidadSemanas; i++) {
                semanasPromises.push(Semanas.create({
                    nombre: `Semana ${i}`,
                    unidad_id: unidad.id
                }));
            }
            await Promise.all(semanasPromises);
        }

        // Recargar con semanas
        const unidadConSemanas = await Unidades.findByPk(unidad.id, {
            include: [{ model: Semanas, as: 'semanas' }]
        });

        res.status(201).json(unidadConSemanas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUnidad = async (req, res) => {
    try {
        const { id } = req.params;
        await Semanas.destroy({ where: { unidad_id: id } });
        await Unidades.destroy({ where: { id } });
        res.json({ message: 'Unidad y semanas eliminadas correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addSemana = async (req, res) => {
    try {
        const { unidad_id } = req.body;

        // Contar semanas actuales para determinar el siguiente número
        const count = await Semanas.count({ where: { unidad_id } });
        const nextWeekNum = count + 1;

        const nuevaSemana = await Semanas.create({
            nombre: `Semana ${nextWeekNum}`,
            unidad_id
        });

        res.status(201).json(nuevaSemana);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSemanaIndividual = async (req, res) => {
    try {
        const { id } = req.params;
        const semana = await Semanas.findByPk(id);

        if (!semana) {
            return res.status(404).json({ message: 'Semana no encontrada' });
        }

        await semana.destroy();
        res.json({ message: 'Semana eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUnidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const unidad = await Unidades.findByPk(id);
        if (!unidad) {
            return res.status(404).json({ message: 'Unidad no encontrada' });
        }

        unidad.nombre = nombre;
        await unidad.save();

        res.json(unidad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteLastSemana = async (req, res) => {
    try {
        const { unidad_id } = req.params;

        const lastSemana = await Semanas.findOne({
            where: { unidad_id },
            order: [['id', 'DESC']]
        });

        if (!lastSemana) {
            return res.status(404).json({ message: 'No hay semanas para eliminar' });
        }

        await lastSemana.destroy();
        res.json({ message: 'Última semana eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSemana = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const semana = await Semanas.findByPk(id);
        if (!semana) {
            return res.status(404).json({ message: 'Semana no encontrada' });
        }

        semana.nombre = nombre;
        await semana.save();

        res.json(semana);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
