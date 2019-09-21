const User = require('../models/user');
const Otp = require('../models/otp');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

        
    // const otp = Math.floor(100000 + Math.random() * 900000);
    // const email= req.body.email;
    // const name = req.body.name;
    // const password = req.body.password;

    // bcrypt.hash(otp, 8)
   

   
    // var token = new Token({ userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    bcrypt.hash(password, 8)
    .then(hashedPw => {
        const user = new User({
            email: email,
            password: hashedPw,
            name: name
        })
        return user.save();
    })
    .then(result => {
        // const hostUrl = process.env.hostURL;
        transporter.sendMail({
            to: 'email',
            from: 'eventsity@gmail.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
            // content: [
            //     {
            //       type: 'text/plain',
            //       value: `Click on this link to verify your email ${hostUrl}/verification?token=${token}&email=${to}`
            //     }
        })
        res.status(201).json({ message: 'User created', userId: result.id })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password.trim();
    let loadedUser;
    User.findOne({where: { email: email }})
    .then(user => 
        {
            if(!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
    .then(isEqual => {
        if (!isEqual) {
            // console.log('pass................');
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser.id
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
        )
        res.status(200).json({ token: token, userId: loadedUser.id
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.delUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
    .then(user => {
        if (!user) {
            const error = new Error('Could not find user.');
            error.statusCode = 404;
            throw error;
        } 
        res.status(200).json({ message: 'User deleted' })
        return user.destroy();
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
