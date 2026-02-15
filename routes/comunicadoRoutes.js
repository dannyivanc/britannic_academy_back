const express = require('express');
const router = express.Router();
const comunicadoController = require('../controllers/comunicadoController');
const authMiddleware = require('../midleware/authMiddleware');
const comunicadoUploadMiddleware = require('../midleware/comunicadoUploadMiddleware');

router.get('/public', comunicadoController.getPublicComunicados);
router.get('/', authMiddleware, comunicadoController.getAllComunicados);
router.post('/', authMiddleware, comunicadoUploadMiddleware.single('imagen'), comunicadoController.createComunicado);
router.put('/:id', authMiddleware, comunicadoUploadMiddleware.single('imagen'), comunicadoController.updateComunicado);
router.delete('/:id', authMiddleware, comunicadoController.deleteComunicado);

module.exports = router;
