const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const authMiddleware = require('../midleware/authMiddleware');

router.get('/public', cursoController.getPublicCursos);
router.get('/', authMiddleware, cursoController.getAllCursos);
router.post('/', authMiddleware, cursoController.createCurso);
router.put('/:id', authMiddleware, cursoController.updateCurso);
router.patch('/:id/toggle', authMiddleware, cursoController.toggleCursoStatus);
router.post('/reorder', authMiddleware, cursoController.reorderCursos);

module.exports = router;
