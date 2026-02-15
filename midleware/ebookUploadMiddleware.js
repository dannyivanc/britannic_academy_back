const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/ebooks_temp'; // Temporary storage for zip
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log('Filtrando archivo:', file.originalname, 'mimetype:', file.mimetype);
        const filetypes = /zip|jpeg|jpg|png|webp|jfif/; // zip for ebook, images for cover
        const mimetype = filetypes.test(file.mimetype) || file.mimetype === 'application/x-zip-compressed' || file.mimetype === 'application/zip';
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype || extname) {
            console.log('Archivo aceptado:', file.originalname);
            return cb(null, true);
        }
        console.warn('Archivo rechazado:', file.originalname);
        cb(new Error('Solo se permiten archivos ZIP (para el ebook) e imágenes (para la portada)'));
    }
});

module.exports = upload;
