const express = require('express');
const router = express.Router();
const nivelController = require('../controllers/nivelController');
const authMiddleware = require('../midleware/authMiddleware');

router.get('/public', nivelController.getPublicNiveles);
router.get('/', authMiddleware, nivelController.getAllNiveles);
router.post('/', authMiddleware, nivelController.createNivel);
router.put('/:id', authMiddleware, nivelController.updateNivel);
router.patch('/:id/toggle', authMiddleware, nivelController.toggleNivelStatus);
router.post('/reorder', authMiddleware, nivelController.reorderNiveles);

module.exports = router;
