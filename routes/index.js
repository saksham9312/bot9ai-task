const express = require('express');
const router = express.Router();
console.log('router exported!');

router.use('/users', require('./users'));
router.use('/chatbots', require('./chatbots'));
router.use('/conversations', require('./conversations'));
router.use('/endusers', require('./endUser'));
module.exports = router;