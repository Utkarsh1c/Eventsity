const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup',
 
[
    body('email')
    .isEmail()

    .custom((value) => {
        return User.findOne({ 
            where: { email: value }
        })
        .then(userDoc => {
            if(userDoc) {
                return Promise.reject('E-mail address already exists')
            }
        })
    })
    .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min:6 }),
    body('name')
        .trim()
        .not()
        .isEmpty()
    ],
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;