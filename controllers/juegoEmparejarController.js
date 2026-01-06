const JuegoSelCor = require('../models/JuegoSelCor');
const ListaJuegos = require('../models/ListaJuegos');
const JuegoEmpList = require('../models/JuegoEmpList');
const fs = require('fs');
const path = require('path');

const deleteFile = (url) => {
    if (!url) return;
    try {
        const filename = url.split('/').pop();
        const filePath = path.join(__dirname, '..', 'uploads', 'games', filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (err) {
        console.error('Error al eliminar archivo:', err);
    }
};

exports.getGameData = async (req, res) => {
    try {
        const { listaId } = req.params;
        const lista = await ListaJuegos.findByPk(listaId);

        let items;
        if (lista && lista.tipo === 'seleccion') {
            items = await JuegoSelCor.findAll({ where: { lista_id: listaId } });
        } else {
            items = await JuegoEmpList.findAll({ where: { lista_id: listaId } });
        }

        // Retornamos objeto completo si es posible o solo items, el front actual espera array directo en data?
        // GameCreateComponent espera { ...propiedadesLista, palabras: [] } en getGameById. 
        // Este endpoint es getGameData (para jugar).
        // Necesitamos getGameById para el admin. ¿Está aquí?
        // En router: router.get('/:id', authMiddleware, juegoEmparejarController.getGameById);

        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos del juego' });
    }
};

exports.getGameById = async (req, res) => {
    try {
        const { id } = req.params;
        const lista = await ListaJuegos.findByPk(id, {
            include: [
                { model: JuegoEmpList, as: 'palabras' }, // Para emparejar
                // { model: JuegoSelCor, as: 'items_seleccion' } // Necesito definir la asociación en el modelo ListaJuegos?
                // Si no está definida, mejor hacemos query manual.
                {
                    model: require('../models/Semanas'), as: 'semana', include: [
                        {
                            model: require('../models/Unidades'), as: 'unidad', include: [
                                { model: require('../models/Niveles'), as: 'nivel' }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!lista) return res.status(404).json({ error: 'Juego no encontrado' });

        let result = lista.toJSON();

        if (lista.tipo === 'seleccion') {
            const items = await JuegoSelCor.findAll({ where: { lista_id: id } });
            result.palabras = items; // Usamos el mismo campo 'palabras' o 'items' para polimorfismo en frontend?
            // El front GameCreate usa 'palabras'. SelectionGameCreate usará 'items' o 'palabras'.
            // Mantengamos 'items' para distinguir.
            result.items = items;
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener juego' });
    }
};

exports.createGame = async (req, res) => {
    try {
        const { nombre, semana_id, palabras, items, imagen_portada, descripcion, tipo } = req.body;

        if (!nombre || !semana_id) {
            return res.status(400).json({ error: 'Datos incompletos: nombre y semana_id son requeridos' });
        }

        const gameType = tipo || 'emparejar';

        const nuevaLista = await ListaJuegos.create({
            nombre,
            semana_id,
            imagen_portada: imagen_portada || null,
            descripcion: descripcion || (gameType === 'seleccion' ? 'Juego de Selección Correcta' : 'Emparejar imágenes - palabras'),
            tipo: gameType
        });

        if (gameType === 'seleccion') {
            if (items && Array.isArray(items)) {
                const itemsPromesas = items.map(p => JuegoSelCor.create({
                    lista_id: nuevaLista.id,
                    imagen_url: p.imagen_url,
                    palabra_correcta: p.palabra_correcta,
                    palabra_incorrecta1: p.palabra_incorrecta1,
                    palabra_incorrecta2: p.palabra_incorrecta2,
                    palabra_incorrecta3: p.palabra_incorrecta3,
                    pregunta: p.pregunta
                }));
                await Promise.all(itemsPromesas);
            }
        } else {
            if (palabras && Array.isArray(palabras)) {
                const palabrasPromesas = palabras.map(p => JuegoEmpList.create({
                    lista_id: nuevaLista.id,
                    palabra: p.palabra,
                    imagen_url: p.imagen_url
                }));
                await Promise.all(palabrasPromesas);
            }
        }

        res.status(201).json(nuevaLista);
    } catch (error) {
        console.error('Error al crear el juego:', error);
        res.status(500).json({ error: 'Error al crear el juego' });
    }
};

exports.updateGame = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, semana_id, palabras, items, imagen_portada, descripcion, tipo } = req.body;

        const lista = await ListaJuegos.findByPk(id);
        if (!lista) return res.status(404).json({ error: 'Juego no encontrado' });

        // Actualizar datos básicos
        // ... (lógica de borrar portada si cambia)
        if (imagen_portada !== undefined && lista.imagen_portada && lista.imagen_portada !== imagen_portada) {
            deleteFile(lista.imagen_portada);
        }

        await lista.update({
            nombre,
            semana_id,
            imagen_portada: imagen_portada !== undefined ? imagen_portada : lista.imagen_portada,
            descripcion: descripcion || lista.descripcion
            // tipo usualmente no cambia, pero si se envía se ignora o se valida
        });

        if (lista.tipo === 'seleccion') {
            // Logic for Selection Game Items
            // 1. Get old items images to delete files
            const oldItems = await JuegoSelCor.findAll({ where: { lista_id: id } });
            const oldImages = oldItems.map(i => i.imagen_url).filter(u => u);
            const newImages = (items || []).map(i => i.imagen_url).filter(u => u);

            const imagesToDelete = oldImages.filter(oldUrl => !newImages.includes(oldUrl));
            imagesToDelete.forEach(url => deleteFile(url));

            // 2. Replace items
            await JuegoSelCor.destroy({ where: { lista_id: id } });
            if (items && Array.isArray(items)) {
                const itemsPromesas = items.map(p => JuegoSelCor.create({
                    lista_id: id,
                    imagen_url: p.imagen_url,
                    palabra_correcta: p.palabra_correcta,
                    palabra_incorrecta1: p.palabra_incorrecta1,
                    palabra_incorrecta2: p.palabra_incorrecta2,
                    palabra_incorrecta3: p.palabra_incorrecta3,
                    pregunta: p.pregunta
                }));
                await Promise.all(itemsPromesas);
            }

        } else {
            // Logic for Word Match (Existing)
            // ... (Already implemented, keep it)
            const oldWords = await JuegoEmpList.findAll({ where: { lista_id: id } });
            const oldImagesWord = oldWords.map(p => p.imagen_url).filter(u => u);
            const newImagesWord = (palabras || []).map(p => p.imagen_url).filter(u => u);

            const imagesToDeleteWord = oldImagesWord.filter(oldUrl => !newImagesWord.includes(oldUrl));
            imagesToDeleteWord.forEach(url => deleteFile(url));

            await JuegoEmpList.destroy({ where: { lista_id: id } });
            if (palabras && Array.isArray(palabras)) {
                const palabrasPromesas = palabras.map(p => JuegoEmpList.create({
                    lista_id: id,
                    palabra: p.palabra,
                    imagen_url: p.imagen_url
                }));
                await Promise.all(palabrasPromesas);
            }
        }

        res.json({ message: 'Juego actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el juego' });
    }
};
