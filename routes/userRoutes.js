const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../midleware/authMiddleware'); // Typo in path 'midleware' kept for consistency

router.use(authenticateToken); // Protect all user routes

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.patch('/:id/toggle-status', userController.toggleUserStatus);

module.exports = router;
