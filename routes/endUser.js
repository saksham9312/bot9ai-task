const express = require('express');
const router = express.Router();
const endUserController = require('../controllers/endUser_controller');

router.post('/', endUserController.create);
router.get('/', endUserController.fetchall);
router.get('/:endUserId', endUserController.fetchbyId);
router.put('/:endUserId', endUserController.updatebyId);
router.delete('/:endUserId', endUserController.deletebyId);
module.exports = router;