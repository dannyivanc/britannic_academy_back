const Pdfs = require('../models/Pdfs');
const Unidades = require('../models/Unidades');
const Semanas = require('../models/Semanas');
const Niveles = require('../models/Niveles');
const Cursos = require('../models/Cursos');
const fs = require('fs');
const path = require('path');

exports.createOrUpdatePdf = async (req, res) => {
    try {
        const { nombre, unidad_id } = req.body;
        const files = req.files; // Ahora usamos fields, así que es un objeto con arrays

        const archivo = files && files['archivo'] ? files['archivo'][0] : null;
        const imagen = files && files['imagen'] ? files['imagen'][0] : null;

        if (!archivo && !req.body.id) {
            return res.status(400).json({ error: 'El archivo PDF es requerido' });
        }

        let pdf = await Pdfs.findOne({ where: { unidad_id } });

        if (pdf) {
            // Actualizar existente
            if (archivo) {
                const oldPath = path.join(__dirname, '..', pdf.archivo_url);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                pdf.archivo_url = archivo.path;
            }
            if (imagen) {
                if (pdf.imagen_portada) {
                    const oldImgPath = path.join(__dirname, '..', pdf.imagen_portada);
                    if (fs.existsSync(oldImgPath)) fs.unlinkSync(oldImgPath);
                }
                pdf.imagen_portada = imagen.path;
            }
            pdf.nombre = nombre || pdf.nombre;
            await pdf.save();
            return res.json({ message: 'PDF actualizado correctamente', pdf });
        } else {
            // Crear nuevo
            pdf = await Pdfs.create({
                nombre,
                unidad_id,
                archivo_url: archivo ? archivo.path : null,
                imagen_portada: imagen ? imagen.path : null
            });
            return res.status(201).json({ message: 'PDF creado correctamente', pdf });
        }
    } catch (error) {
        console.error('Error al gestionar PDF:', error);
        res.status(500).json({ error: 'Error al gestionar PDF' });
    }
};

exports.getAllPdfs = async (req, res) => {
    try {
        const pdfs = await Pdfs.findAll({
            include: [
                {
                    model: Unidades,
                    as: 'unidad',
                    include: [
                        {
                            model: Niveles,
                            as: 'nivel',
                            include: [{ model: Cursos, as: 'curso' }]
                        }
                    ]
                }
            ]
        });
        res.json(pdfs);
    } catch (error) {
        console.error('Error al obtener PDFs:', error);
        res.status(500).json({ error: 'Error al obtener PDFs' });
    }
};

exports.deletePdf = async (req, res) => {
    try {
        const { id } = req.params;
        const pdf = await Pdfs.findByPk(id);

        if (!pdf) {
            return res.status(404).json({ error: 'PDF no encontrado' });
        }

        // Borrar archivo físico
        const filePath = path.join(__dirname, '..', pdf.archivo_url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        if (pdf.imagen_portada) {
            const imgPath = path.join(__dirname, '..', pdf.imagen_portada);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }

        await pdf.destroy();
        res.json({ message: 'PDF eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar PDF:', error);
        res.status(500).json({ error: 'Error al eliminar PDF' });
    }
};

exports.downloadPdf = async (req, res) => {
    try {
        const { id } = req.params;
        const pdf = await Pdfs.findByPk(id);

        if (!pdf) {
            return res.status(404).json({ error: 'PDF no encontrado' });
        }

        const filePath = path.join(__dirname, '..', pdf.archivo_url);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Archivo físico no encontrado' });
        }

        // res.download will set appropriate headers for file download
        res.download(filePath, pdf.nombre + '.pdf');
    } catch (error) {
        console.error('Error al descargar PDF:', error);
        res.status(500).json({ error: 'Error al descargar PDF' });
    }
};
