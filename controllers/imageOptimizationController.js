const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

exports.optimizeImage = async (filePath) => {
    try {
        const image = sharp(filePath);
        const metadata = await image.metadata();

        // Configuración de optimización
        let pipeline = image;

        // Redimensionar si es muy grande
        if (metadata.width > 1024) {
            pipeline = pipeline.resize(1024, null, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        // Convertir SIEMPRE a WebP (formato ligero con soporte de transparencia)
        pipeline = pipeline.webp({ quality: 80 });

        // Procesar a buffer
        const buffer = await pipeline.toBuffer();

        // Definir el nuevo path con extensión .webp
        const directory = path.dirname(filePath);
        const extension = path.extname(filePath);
        const basename = path.basename(filePath, extension);
        const newFilename = `${basename}.webp`;
        const newFilePath = path.join(directory, newFilename);

        // Guardar el nuevo archivo
        fs.writeFileSync(newFilePath, buffer);

        // Si la extensión cambió (ej. de .png a .webp), borrar el original
        if (filePath !== newFilePath) {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        console.log(`Imagen convertida a WebP: ${newFilename}`);

        // Devolver el nuevo nombre de archivo
        return newFilename;

    } catch (error) {
        console.error('Error al optimizar imagen:', error);
        // Si falla, devolvemos el nombre original para no romper el flujo
        return path.basename(filePath);
    }
};
