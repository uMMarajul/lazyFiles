const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes
router.post('/login', userController.login);
router.post('/logout', userController.logout);


// Protected routes (requires authentication)
router.get('/me', authMiddleware, userController.getProfile);
router.put('/me', authMiddleware, userController.updateProfile);
router.delete('/me', authMiddleware, userController.deleteAccount);

module.exports = router;
