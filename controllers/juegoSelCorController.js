const JuegoSelCor = require('../models/JuegoSelCor');
const sequelize = require('../config/database');

// Crear un nuevo ítem (palabras + imagen)
exports.createItem = async (req, res) => {
    try {
        const { lista_id, palabra_correcta, palabra_incorrecta1, palabra_incorrecta2, palabra_incorrecta3, pregunta } = req.body;

        let imagen_url = '';
        if (req.file) {
            // Asumimos que el uploadMiddleware pone el archivo en req.file
            // Necesitamos la URL accesible.
            imagen_url = `${process.env.APP_URL || 'http://localhost:3000'}/uploads/${req.file.filename}`;
        }

        const nuevoItem = await JuegoSelCor.create({
            lista_id,
            palabra_correcta,
            palabra_incorrecta1,
            palabra_incorrecta2,
            palabra_incorrecta3,
            pregunta,
            imagen_url
        });

        res.status(201).json(nuevoItem);
    } catch (error) {
        console.error('Error al crear item de selección correcta:', error);
        res.status(500).json({ error: 'Error al crear el ítem.' });
    }
};

// Obtener datos del juego (Aleatorio Max 10)
exports.getGameData = async (req, res) => {
    try {
        const { listaId } = req.params;

        // Obtener todos los ítems de la lista
        // (Si son muchos, podríamos optimizar con random() de SQL, pero para <100 ítems JS es suficiente)
        const allItems = await JuegoSelCor.findAll({
            where: { lista_id: listaId }
        });

        // Barajar y tomar máximo 10
        const shuffled = allItems.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);

        res.json(selected);
    } catch (error) {
        console.error('Error al obtener datos del juego:', error);
        res.status(500).json({ error: 'Error al cargar el juego.' });
    }
};
