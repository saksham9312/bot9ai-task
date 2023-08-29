const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbot_controller');
const conversationController = require('../controllers/conversation_controller');

router.get('/:chatbotId', chatbotController.fetchbyId);
router.put('/:chatbotId', chatbotController.updatebyId);
router.delete('/:chatbotId', chatbotController.deletebyId);

router.post('/:chatbotId/conversations', conversationController.create);
router.get('/:chatbotId/conversations', conversationController.fetchbyChatbotId);
module.exports = router;