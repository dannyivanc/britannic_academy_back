const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');
const authMiddleware = require('../midleware/authMiddleware');

router.get('/', authMiddleware, grupoController.getAllGrupos);
router.get('/:id', authMiddleware, grupoController.getGrupoById);
router.get('/user/:userId', authMiddleware, grupoController.getGruposByUser);
router.post('/', authMiddleware, grupoController.createGrupo);
router.put('/:id', authMiddleware, grupoController.updateGrupo);
router.patch('/:id/toggle', authMiddleware, grupoController.toggleGrupoStatus);

module.exports = router;
