const Ebooks = require('../models/Ebooks');
const Unidades = require('../models/Unidades');
const Niveles = require('../models/Niveles');
const Cursos = require('../models/Cursos');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

exports.createOrUpdateEbook = async (req, res) => {
    try {
        // console.log('--- Gestión de Ebook ---');
        // console.log('Body:', req.body);
        // console.log('Files:', req.files);
        const { nombre, unidad_id } = req.body;
        const files = req.files;
        // console.log(`[createOrUpdateEbook] Iniciando para unidad: ${unidad_id}, nombre: ${nombre}`);

        const archivo = files && files['archivo'] ? files['archivo'][0] : null;
        const imagen = files && files['imagen'] ? files['imagen'][0] : null;

        if (!archivo && !req.body.id) {
            return res.status(400).json({ error: 'El archivo ZIP es requerido' });
        }

        let ebook = await Ebooks.findOne({ where: { unidad_id } });
        // console.log(`[createOrUpdateEbook] Ebook encontrado: ${ebook ? 'SÍ' : 'NO'}`);

        const processZip = (zipFile, ebookId) => {
            try {
                const extractPath = path.join('uploads', 'ebooks', ebookId.toString());
                if (fs.existsSync(extractPath)) {
                    // console.log(`[processZip] Limpiando directorio existente: ${extractPath}`);
                    fs.rmSync(extractPath, { recursive: true, force: true });
                }
                fs.mkdirSync(extractPath, { recursive: true });

                // console.log(`[processZip] Extrayendo ZIP: ${zipFile.path} a ${extractPath}`);
                const zip = new AdmZip(zipFile.path);
                zip.extractAllTo(extractPath, true);

                // Better flattening: find the REAL root folder
                // Ignore __MACOSX and hidden files
                const items = fs.readdirSync(extractPath).filter(item => !item.startsWith('__') && !item.startsWith('.'));

                if (items.length === 1 && fs.lstatSync(path.join(extractPath, items[0])).isDirectory()) {
                    const subDirName = items[0];
                    const subDirPath = path.join(extractPath, subDirName);
                    // console.log(`[processZip] Aplanando desde carpeta raíz única: ${subDirName}`);

                    const subItems = fs.readdirSync(subDirPath);
                    subItems.forEach(item => {
                        const oldPath = path.join(subDirPath, item);
                        const newPath = path.join(extractPath, item);

                        // Robust move for Windows
                        if (fs.existsSync(newPath)) {
                            fs.rmSync(newPath, { recursive: true, force: true });
                        }
                        fs.renameSync(oldPath, newPath);
                    });

                    try {
                        fs.rmSync(subDirPath, { recursive: true, force: true });
                    } catch (e) {
                        // console.warn(`[processZip] No se pudo borrar subcarpeta temporal (posible archivo bloqueado): ${subDirPath}`);
                    }
                }

                // console.log('[processZip] Extracción y aplanamiento completados');

                // Final check: entry point
                const indexPath = path.join(extractPath, 'index.html');
                if (!fs.existsSync(indexPath)) {
                    // Check if there is an index.html inside mobile/
                    const mobileIndexPath = path.join(extractPath, 'mobile', 'index.html');
                    if (fs.existsSync(mobileIndexPath)) {
                        console.log('[processZip] index.html encontrado en subcarpeta mobile/');
                    } else {
                        console.warn('[processZip] ADVERTENCIA: No se encontró index.html en la raíz ni en mobile/');
                    }
                }

                if (fs.existsSync(zipFile.path)) {
                    fs.unlinkSync(zipFile.path);
                }

                return extractPath;
            } catch (zipError) {
                // console.error('[processZip] Error:', zipError);
                throw new Error('Error al procesar ZIP: ' + zipError.message);
            }
        };

        if (ebook) {
            // Update existing
            if (archivo) {
                // console.log('[createOrUpdateEbook] Procesando archivo ZIP...');
                const newDirPath = processZip(archivo, ebook.id);
                ebook.directorio_path = newDirPath;
                ebook.archivo_url = path.join(newDirPath, 'index.html');
                // console.log('[createOrUpdateEbook] Guardando cambios de archivo...');
                await ebook.save();
            }
            if (imagen) {
                if (ebook.imagen_portada) {
                    const oldImgPath = path.resolve(process.cwd(), ebook.imagen_portada);
                    if (fs.existsSync(oldImgPath)) fs.unlinkSync(oldImgPath);
                }
                ebook.imagen_portada = imagen.path;
            }
            ebook.nombre = nombre || ebook.nombre;
            await ebook.save();
            return res.json({ message: 'Ebook actualizado correctamente', ebook });
        } else {
            // Create new
            ebook = await Ebooks.create({
                nombre,
                unidad_id,
                archivo_url: 'temp',
                directorio_path: 'temp',
                imagen_portada: imagen ? imagen.path : null
            });

            if (archivo) {
                // console.log('[createOrUpdateEbook] Procesando archivo ZIP para nuevo ebook...');
                const newDirPath = processZip(archivo, ebook.id);
                ebook.directorio_path = newDirPath;
                ebook.archivo_url = path.join(newDirPath, 'index.html');
            }
            // console.log('[createOrUpdateEbook] Guardando nuevo ebook...');
            await ebook.save();

            return res.status(201).json({ message: 'Ebook creado correctamente', ebook });
        }
    } catch (error) {
        // console.error('Error al gestionar Ebook:', error);
        res.status(500).json({ error: 'Error al gestionar Ebook' });
    }
};

exports.getAllEbooks = async (req, res) => {
    try {
        const ebooks = await Ebooks.findAll({
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
        res.json(ebooks);
    } catch (error) {
        // console.error('Error al obtener Ebooks:', error);
        res.status(500).json({ error: 'Error al obtener Ebooks' });
    }
};

exports.deleteEbook = async (req, res) => {
    try {
        const { id } = req.params;
        const ebook = await Ebooks.findByPk(id);

        if (!ebook) {
            return res.status(404).json({ error: 'Ebook no encontrado' });
        }

        // Delete directory
        const dirPath = path.join(__dirname, '..', ebook.directorio_path);
        if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, { recursive: true, force: true });
        }

        if (ebook.imagen_portada) {
            const imgPath = path.join(__dirname, '..', ebook.imagen_portada);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }

        await ebook.destroy();
        res.json({ message: 'Ebook eliminado correctamente' });
    } catch (error) {
        // console.error('Error al eliminar Ebook:', error);
        res.status(500).json({ error: 'Error al eliminar Ebook' });
    }
};

// Protected serving of ebook files
exports.serveEbook = (req, res) => {
    const ebookId = req.params[0];
    const filePath = req.params[1] || 'index.html';

    // If token is provided in query (first hit from iframe), set it as a cookie
    if (req.query.token) {
        res.cookie('token', req.query.token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
    }

    const cleanEbookId = ebookId.toString().trim();
    let cleanFilePath = (req.params[1] || 'index.html').split('?')[0];

    let fullPath = path.join(process.cwd(), 'uploads', 'ebooks', cleanEbookId, cleanFilePath);

    // console.log(`[serveEbook] Demandado: ${cleanFilePath}, EbookId: ${cleanEbookId}`);

    // Fallback logic
    if (!fs.existsSync(fullPath) || !fs.lstatSync(fullPath).isFile()) {
        // If index.html requested but missing in root, check in mobile/
        if (cleanFilePath === 'index.html') {
            const mobilePath = path.join(process.cwd(), 'uploads', 'ebooks', cleanEbookId, 'mobile', 'index.html');
            if (fs.existsSync(mobilePath)) {
                // console.log(`[serveEbook] Redirecting to mobile/index.html for ebook ${cleanEbookId}`);
                const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
                // Ensure the redirect uses the correct base path
                return res.redirect(`/api/ebooks/view/${cleanEbookId}/mobile/index.html${query}`);
            }
        }

        // General fallback: if not found, try adding 'mobile/' prefix
        if (!cleanFilePath.startsWith('mobile/')) {
            const mobileFallbackPath = path.join(process.cwd(), 'uploads', 'ebooks', cleanEbookId, 'mobile', cleanFilePath);
            if (fs.existsSync(mobileFallbackPath) && fs.lstatSync(mobileFallbackPath).isFile()) {
                fullPath = mobileFallbackPath;
                // console.log(`[serveEbook] Found in mobile fallback: ${fullPath}`);
            }
        }
    }

    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
        // Inyectar script de corrección si es HTML para arreglar el layout del flipbook
        if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const correctionScript = `
                <style>
                    body, html { margin: 0; padding: 0; overflow: hidden !important; height: 100% !important; background: transparent !important; }
                    .bookContainer { height: 100vh !important; }
                    .book { position: absolute !important; }
                </style>
                <script>
                    window.addEventListener('load', function() {
                        // Forzar recalculación de layout del flipbook
                        setTimeout(function() {
                            window.dispatchEvent(new Event('resize'));
                            // Intentar forzar el centrado si el script del flipbook falla
                            var book = document.querySelector('.book');
                            if (book && getComputedStyle(book).position === 'static') {
                                book.style.position = 'absolute';
                            }
                        }, 500);
                    });
                </script>
            `;
            content = content.replace('</body>', correctionScript + '</body>');
            return res.send(content);
        }
        res.sendFile(fullPath);
    } else {
        // console.error(`[serveEbook] Archivo no encontrado: ${fullPath}`);
        res.status(404).json({ error: 'Archivo no encontrado', path: fullPath });
    }
};
