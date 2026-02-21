const express = require('express');
const router = express.Router();
const puntuacionController = require('../controllers/puntuacionController');
const authMiddleware = require('../midleware/authMiddleware');

router.post('/registrar', authMiddleware, puntuacionController.registrarPuntuacion);
router.get('/leaderboard', authMiddleware, puntuacionController.getLeaderboard);

module.exports = router;
