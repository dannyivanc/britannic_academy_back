const express = require('express');
const router = express.Router();
const listaJuegoController = require('../controllers/listaJuegoController');
const juegoEmparejarController = require('../controllers/juegoEmparejarController');
const upload = require('../midleware/uploadMiddleware');

const authMiddleware = require('../midleware/authMiddleware');

// Rutas Genéricas
router.get('/semanas/:semanaId/listas', authMiddleware, listaJuegoController.getListasBySemana);
router.get('/all', authMiddleware, listaJuegoController.getAllGames);
router.get('/:id', authMiddleware, juegoEmparejarController.getGameById);
router.post('/upload-image', authMiddleware, upload.single('image'), listaJuegoController.uploadImage);

// Rutas Específicas para Juego de Emparejar
router.get('/listas/:listaId/palabras', authMiddleware, juegoEmparejarController.getGameData);
router.post('/listas', authMiddleware, juegoEmparejarController.createGame);
router.put('/:id', authMiddleware, juegoEmparejarController.updateGame);

// Rutas Específicas para Juego de Selección Correcta
const juegoSelCorController = require('../controllers/juegoSelCorController');
router.get('/listas/:listaId/seleccion-correcta', authMiddleware, juegoSelCorController.getGameData);
router.post('/seleccion-correcta', authMiddleware, upload.single('image'), juegoSelCorController.createItem);

// Rutas de Permisos (Admin)
const permisoController = require('../controllers/permisoController');
router.get('/permisos/usuario/:usuarioId', authMiddleware, permisoController.getPermisosUsuario);
router.post('/permisos/usuario/:usuarioId', authMiddleware, permisoController.updatePermisosUsuario);

module.exports = router;
