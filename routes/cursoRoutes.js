const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const authMiddleware = require('../midleware/authMiddleware');
const cursoUploadMiddleware = require('../midleware/cursoUploadMiddleware');

router.get('/public', cursoController.getPublicCursos);
router.get('/navbar', cursoController.getNavbarData);
router.get('/', authMiddleware, cursoController.getAllCursos);
router.post('/', authMiddleware, cursoUploadMiddleware.single('imagen'), cursoController.createCurso);
router.put('/:id', authMiddleware, cursoUploadMiddleware.single('imagen'), cursoController.updateCurso);
router.patch('/:id/toggle', authMiddleware, cursoController.toggleCursoStatus);
router.post('/reorder', authMiddleware, cursoController.reorderCursos);

module.exports = router;
