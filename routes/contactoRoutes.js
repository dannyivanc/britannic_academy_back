const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');
const authMiddleware = require('../midleware/authMiddleware');
const upload = require('../midleware/contactoUploadMiddleware');

router.get('/public', contactoController.getPublicContactos);
router.get('/', authMiddleware, contactoController.getAllContactos);
router.post('/', authMiddleware, upload.single('image'), contactoController.createContacto);
router.put('/:id', authMiddleware, upload.single('image'), contactoController.updateContacto);
router.delete('/:id', authMiddleware, contactoController.deleteContacto);

module.exports = router;
