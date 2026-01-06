const express = require('express');
const router = express.Router();
const unidadesController = require('../controllers/unidadesController');
const authMiddleware = require('../midleware/authMiddleware');

router.get('/nivel/:nivel_id', authMiddleware, unidadesController.getUnidadesByNivel);
router.post('/', authMiddleware, unidadesController.createUnidad);
router.put('/:id', authMiddleware, unidadesController.updateUnidad);
router.delete('/:id', authMiddleware, unidadesController.deleteUnidad);

// Rutas para semanas individuales
router.post('/semanas', authMiddleware, unidadesController.addSemana);
router.put('/semanas/:id', authMiddleware, unidadesController.updateSemana);
router.delete('/semanas/ultima/:unidad_id', authMiddleware, unidadesController.deleteLastSemana);
router.delete('/semanas/:id', authMiddleware, unidadesController.deleteSemanaIndividual);

module.exports = router;
