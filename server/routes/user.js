const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/follow', userController.updateFollow);

router.post('/interest', userController.updateInterest);

module.exports = router;