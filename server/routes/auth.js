const express = require('express');

//destructuring body in express validator
const { body } = require('express-validator');

//requiring user model
const User = require('../models/user');

//requiring auth controller
const authController = require('../controllers/auth');

//requiring middleware for authorization purpose
const isAuth = require('../middleware/is-auth');

//router defined in express
const router = express.Router();

//handling user post and get requests plus necessary validation
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
                // return Promise.reject('E-mail address already exists')
                throw new Error('E-mail address already exists');
            }
        })
    })
    .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min:6 })
        .custom((pass, { req }) => {
            if (pass !== req.body.cpassword.trim())
            // return Promise.reject('Password confirmation does not match password');
            throw new Error('Password confirmation does not match password');
            return true;
    }),
    body('name')
        .trim()
        .not()
        .isEmpty()
    ],
    authController.signup
);

router.post('/login', authController.login);

router.post('/logoutAll', isAuth, authController.logoutFromAllUser);

router.post('/delete', isAuth, authController.delUser);

router.post('/verify/:userId', authController.verifyUser);

router.post('/resend/:userId', authController.resendOtp);

module.exports = router;