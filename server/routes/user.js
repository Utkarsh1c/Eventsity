const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/followed', userController.updateFollow);

module.exports = router;