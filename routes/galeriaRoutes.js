const express = require('express');
const router = express.Router();
const galeriaController = require('../controllers/galeriaController');
const authMiddleware = require('../midleware/authMiddleware');
const galeriaUploadMiddleware = require('../midleware/galeriaUploadMiddleware');

router.get('/public', galeriaController.getPublicGaleria);
router.get('/proximo', galeriaController.getProximo);
router.get('/', authMiddleware, galeriaController.getAllGaleria);
router.post('/', authMiddleware, galeriaUploadMiddleware.single('imagen'), galeriaController.createGaleria);
router.put('/:id', authMiddleware, galeriaUploadMiddleware.single('imagen'), galeriaController.updateGaleria);
router.delete('/:id', authMiddleware, galeriaController.deleteGaleria);
router.patch('/:id/proximo', authMiddleware, galeriaController.setProximo);

module.exports = router;
