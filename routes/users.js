const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const chatbotController = require('../controllers/chatbot_controller');
const authenticateToken = require('../middleware/jwt_authentication');

router.post('/', userController.create);
router.get('/', authenticateToken, userController.fetchall);
router.get('/:id',authenticateToken, userController.fetchbyId);
router.put('/:id', authenticateToken, userController.updatebyId);
router.delete('/:id', authenticateToken, userController.deletebyId);

router.post('/:userId/chatbots', authenticateToken,chatbotController.create);
router.get('/:userId/chatbots', authenticateToken, chatbotController.fetchbyUserId);
module.exports = router;