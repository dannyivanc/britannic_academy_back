const Unidades = require('../models/Unidades');
const Semanas = require('../models/Semanas');

exports.getUnidadesByGrupo = async (req, res) => {
    try {
        const { grupo_id } = req.params;
        const unidades = await Unidades.findAll({
            where: { grupo_id },
            include: [{ model: Semanas, as: 'semanas' }]
        });
        res.json(unidades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUnidad = async (req, res) => {
    try {
        const { nombre, grupo_id, cantidadSemanas } = req.body;

        const unidad = await Unidades.create({ nombre, grupo_id });

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
