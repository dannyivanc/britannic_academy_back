const express = require('express');
const router = express.Router();
const unidadesController = require('../controllers/unidadesController');

router.get('/grupo/:grupo_id', unidadesController.getUnidadesByGrupo);
router.post('/', unidadesController.createUnidad);
router.put('/:id', unidadesController.updateUnidad);
router.delete('/:id', unidadesController.deleteUnidad);

// Rutas para semanas individuales
router.post('/semanas', unidadesController.addSemana);
router.delete('/semanas/:id', unidadesController.deleteSemanaIndividual);

module.exports = router;
