const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const authMiddleware = require('../midleware/authMiddleware');

router.get('/', authMiddleware, videoController.getAllVideos);
router.get('/semanas/:semanaId', authMiddleware, videoController.getVideosBySemana);
router.post('/', authMiddleware, videoController.createVideo);
router.put('/:id', authMiddleware, videoController.updateVideo);
router.delete('/:id', authMiddleware, videoController.deleteVideo);

module.exports = router;
