const express = require('express');
const router = express.Router();
const certificadoController = require('../controllers/certificadoController');
const authMiddleware = require('../midleware/authMiddleware');
const certificadoUploadMiddleware = require('../midleware/certificadoUploadMiddleware');

// Rutas públicas (para validar certificados)
router.get('/validar/:codigo', certificadoController.getCertificadoByCodigo);

// Rutas protegidas
router.get('/', authMiddleware, certificadoController.getAllCertificados);
router.get('/estudiante/:estudiante_id', authMiddleware, certificadoController.getCertificadosByEstudiante);
router.post('/', authMiddleware, certificadoUploadMiddleware.single('imagen'), certificadoController.createCertificado);
router.put('/:id', authMiddleware, certificadoUploadMiddleware.single('imagen'), certificadoController.updateCertificado);
router.delete('/:id', authMiddleware, certificadoController.deleteCertificado);

module.exports = router;
