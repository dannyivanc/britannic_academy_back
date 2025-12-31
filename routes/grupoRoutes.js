const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

router.get('/', grupoController.getAllGrupos);
router.get('/:id', grupoController.getGrupoById);
router.get('/user/:userId', grupoController.getGruposByUser);
router.post('/', grupoController.createGrupo);
router.put('/:id', grupoController.updateGrupo);
router.patch('/:id/toggle', grupoController.toggleGrupoStatus);

module.exports = router;
