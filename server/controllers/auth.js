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

        
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    const email= req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
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
        bcrypt.hash(otp, 8)
        .then(hashedOtp => {
            const otp = new Otp({
                otp: hashedOtp,
            })
            otp.save();
        })
        .catch(err => {
            throw err
        })
        
        transporter.sendMail({
            to: email,
            from: 'eventsity@gmail.com',
            subject: 'Signup succeeded!',
            html: `<h1>Your otp ${otp}</h1>`

            // content: [
            //     {
            //       type: 'text/plain',
            //       value: `Click on this link to verify your email ${hostUrl}/verification?token=${token}&email=${to}`
            //     }
        })
        res.status(201).json({ message: 'Succesfully signed up', userId: result.id })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.resetOtp = (req, res, next) => {
    const userId = req.params.userId;
    const email= req.body.email;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    bcrypt.hash(otp, 8)
    .then(hashedOtp => {
        Otp.findByPk(userId)
        .then(otp => {
            otp.update({
                otp: hashedOtp
            })
        .catch(err => {
            throw err
        })
        transporter.sendMail({
            to: email,
            from: 'eventsity@gmail.com',
            subject: 'Reset otp!',
            html: `<h1>Your otp ${otp}</h1>`
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
})
}

exports.verifyUser = (req, res, next) => {
    const userId = req.params.userId;
    const userOtp = req.body.otp;
    Otp.findByPk(userId)
    .then(otp => {
        setTimeout(function() {
            otp.destroy();
        }, 60000)
        if (!otp) {
            const error = new Error('Otp expired!');
            error.statusCode = 400;
            throw error;
        }
        return bcrypt.compare(userOtp, otp.otp)
    })
    .then(isEqual => {
        
        if (!isEqual) {
            const error = new Error('Wrong otp!');
            error.statusCode = 401;
            throw error;
        }
        return User.findByPk(userId)
            .then(user => {
                if (!user) {
                    const error = new Error('Could not find user.');
                    error.statusCode = 404;
                    throw error;
                }
                user.update({
                    isVerified: true
                })
            })

        })

    .then(result => {
        res.status(200).json({ message: 'User verified' })
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
    User.findOne({ where: { email: email }})
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
