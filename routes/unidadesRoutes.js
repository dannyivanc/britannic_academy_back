const express = require('express');
const router = express.Router();
const unidadesController = require('../controllers/unidadesController');

router.get('/nivel/:nivel_id', unidadesController.getUnidadesByNivel);
router.post('/', unidadesController.createUnidad);
router.put('/:id', unidadesController.updateUnidad);
router.delete('/:id', unidadesController.deleteUnidad);

// Rutas para semanas individuales
router.post('/semanas', unidadesController.addSemana);
router.put('/semanas/:id', unidadesController.updateSemana);
router.delete('/semanas/ultima/:unidad_id', unidadesController.deleteLastSemana);
router.delete('/semanas/:id', unidadesController.deleteSemanaIndividual);

module.exports = router;
