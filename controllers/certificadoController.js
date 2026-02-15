const Certificados = require('../models/Certificados');
const Usuario = require('../models/Usuario');
const fs = require('fs');
const path = require('path');

// Generador de código alfanumérico único de 6 caracteres
const generateUniqueCode = async () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    let exists = true;

    while (exists) {
        code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        const existing = await Certificados.findOne({ where: { codigo: code } });
        if (!existing) {
            exists = false;
        }
    }
    return code;
};

exports.createCertificado = async (req, res) => {
    try {
        const { estudiante_id } = req.body;

        if (!estudiante_id) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'El ID del estudiante es requerido' });
        }

        const estudiante = await Usuario.findByPk(estudiante_id);
        if (!estudiante) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        let imagen_url = null;
        if (req.file) {
            imagen_url = `${req.protocol}://${req.get('host')}/uploads/certificados/${req.file.filename}`;
        }

        const codigo = await generateUniqueCode();

        const certificado = await Certificados.create({
            codigo,
            estudiante_id,
            imagen_url
        });

        res.status(201).json({
            message: 'Certificado creado correctamente',
            certificado
        });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllCertificados = async (req, res) => {
    try {
        const certificados = await Certificados.findAll({
            include: [{
                model: Usuario,
                as: 'estudiante',
                attributes: ['id', 'nombre', 'email']
            }],
            order: [['id', 'DESC']]
        });
        console.log('Certificados encontrados (simple):', certificados.length);
        res.json(certificados);
    } catch (error) {
        // console.error('Error en getAllCertificados:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getCertificadoByCodigo = async (req, res) => {
    try {
        const { codigo } = req.params;
        // console.log('--- VALIDAR CERTIFICADO ---');
        // console.log('Código recibido:', codigo);

        const certificado = await Certificados.findOne({
            where: { codigo },
            include: [{
                model: Usuario,
                as: 'estudiante',
                attributes: ['id', 'nombre', 'email']
            }]
        });

        if (!certificado) {
            return res.status(404).json({ message: 'Certificado no encontrado con ese código' });
        }

        res.json(certificado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCertificadosByEstudiante = async (req, res) => {
    try {
        const { estudiante_id } = req.params;
        const certificados = await Certificados.findAll({
            where: { estudiante_id },
            order: [['id', 'DESC']]
        });
        res.json(certificados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCertificado = async (req, res) => {
    try {
        const { id } = req.params;
        const certificado = await Certificados.findByPk(id);

        if (!certificado) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }

        if (certificado.imagen_url) {
            const fileName = certificado.imagen_url.split('/').pop();
            const filePath = path.join(__dirname, '..', 'uploads', 'certificados', fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await certificado.destroy();
        res.json({ message: 'Certificado eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateCertificado = async (req, res) => {
    try {
        // console.log('--- UPDATE CERTIFICADO ---');
        // console.log('Params ID:', req.params.id);
        // console.log('Body:', req.body);
        // console.log('File:', req.file);

        const { id } = req.params;
        const { estudiante_id } = req.body;
        const certificate = await Certificados.findByPk(id);

        if (!certificate) {
            if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }

        // Si se envía estudiante_id, verificamos que exista
        if (estudiante_id) {
            const estudiante = await Usuario.findByPk(estudiante_id);
            if (!estudiante) {
                if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
                return res.status(404).json({ message: 'Estudiante no encontrado' });
            }
            certificate.estudiante_id = estudiante_id;
        }

        // Si se sube nueva imagen
        if (req.file) {
            // Borrar imagen anterior si existe
            if (certificate.imagen_url) {
                const fileName = certificate.imagen_url.split('/').pop();
                const oldPath = path.join(__dirname, '..', 'uploads', 'certificados', fileName);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            // Asignar nueva imagen
            certificate.imagen_url = `${req.protocol}://${req.get('host')}/uploads/certificados/${req.file.filename}`;
        }

        await certificate.save();

        res.json({
            message: 'Certificado actualizado correctamente',
            certificate
        });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: error.message });
    }
};
