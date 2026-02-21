const express = require('express');
const router = express.Router();
const nivelController = require('../controllers/nivelController');
const authMiddleware = require('../midleware/authMiddleware');
const nivelUploadMiddleware = require('../midleware/nivelUploadMiddleware');

router.get('/public', nivelController.getPublicNiveles);
router.get('/', authMiddleware, nivelController.getAllNiveles);
router.post('/', authMiddleware, nivelUploadMiddleware.fields([{ name: 'imagen', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), nivelController.createNivel);
router.put('/:id', authMiddleware, nivelUploadMiddleware.fields([{ name: 'imagen', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), nivelController.updateNivel);
router.patch('/:id/toggle', authMiddleware, nivelController.toggleNivelStatus);
router.post('/reorder', authMiddleware, nivelController.reorderNiveles);

module.exports = router;
