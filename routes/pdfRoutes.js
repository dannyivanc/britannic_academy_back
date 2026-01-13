const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const upload = require('../midleware/pdfUploadMiddleware');
const authMiddleware = require('../midleware/authMiddleware');

router.post('/', upload.fields([
    { name: 'archivo', maxCount: 1 },
    { name: 'imagen', maxCount: 1 }
]), pdfController.createOrUpdatePdf);
router.get('/', pdfController.getAllPdfs);
router.get('/download/:id', authMiddleware, pdfController.downloadPdf);
router.delete('/:id', pdfController.deletePdf);

module.exports = router;
