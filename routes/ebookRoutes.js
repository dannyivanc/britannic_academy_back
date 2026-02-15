const express = require('express');
const router = express.Router();
const ebookController = require('../controllers/ebookController');
const upload = require('../midleware/ebookUploadMiddleware');
const authMiddleware = require('../midleware/authMiddleware');

router.post('/', upload.fields([
    { name: 'archivo', maxCount: 1 },
    { name: 'imagen', maxCount: 1 }
]), ebookController.createOrUpdateEbook);

router.get('/', ebookController.getAllEbooks);
router.delete('/:id', ebookController.deleteEbook);

// Protected serving of ebook content
// This will match /view/:ebookId/path/to/file
router.get(/\/view\/(\d+)\/(.*)/, authMiddleware, ebookController.serveEbook);

module.exports = router;
