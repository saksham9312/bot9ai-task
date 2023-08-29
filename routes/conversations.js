const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation_controller');

router.get('/:conversationId', conversationController.fetchbyId);
router.put('/:conversationId', conversationController.updatebyId);
router.delete('/:conversationId', conversationController.deletebyId);
module.exports = router;