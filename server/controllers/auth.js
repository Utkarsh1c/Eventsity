//requiring user and otp model
const User = require('../models/user');
const Otp = require('../models/otp');

//requiring module for hashing 
const bcrypt = require('bcryptjs');

//requiring modules necessary for sending mails
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const config = require('../util/config');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config
    }
}));

//requiring jason web token module
const jwt = require('jsonwebtoken');

//requiring validation result from routes
const { validationResult } = require('express-validator');

//signing up users
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
    const password = req.body.password.trim();
    
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

        bcrypt.hash(otp, 8)

        .then(hashedOtp => {
            const otp = new Otp({
                otp: hashedOtp,
            })
            otp.save();
            setTimeout(() => {
                otp.update({
                    otp: ""
                })
            }, 120000)
        })
        .catch(err => {
            throw err
        })
        
        transporter.sendMail({
            to: email,
            from: 'eventsity@gmail.com',
            subject: 'New signup',
            html: `<h1>Thanks for signing up with EventSity</h1>
                   <h1>Here is your otp ${otp}</h1>`
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

//resend otp to user
exports.resendOtp = (req, res, next) => {

    const userId = req.params.userId;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    User.findByPk(userId)
    .then(user => {
        bcrypt.hash(otp, 8)
        .then(hashedOtp => {
            Otp.findByPk(userId)
            .then(otp => {
                
                otp.update({
                    otp: hashedOtp
                })
                setTimeout(() => {
                    otp.update({
                        otp: ""
                    })
                }, 120000)
            })
            .catch(err => {
                throw err
            })

            transporter.sendMail({
                to: user.email,
                from: 'eventsity@gmail.com',
                subject: 'Resend otp',
                html: `<h1>Thanks for signing up with EventSity</h1>
                    <h1>Here is your otp ${otp}</h1>`
            })

        })
        res.status(200).json({ message: 'Otp resent!'})
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//verify user otp
exports.verifyUser = (req, res, next) => {

    const userId = req.params.userId;
    const userOtp = req.body.otp;
    Otp.findByPk(userId)

    .then(async otp => {

        if (!otp.otp) {
            const error = new Error('Otp expired!');
            error.statusCode = 400;
            throw error;
        }
        
        const isEqual = await bcrypt.compare(userOtp, otp.otp);
        if (!isEqual) {
            const error_1 = new Error('Wrong otp!');
            error_1.statusCode = 401;
            throw error_1;
        }
        User.findByPk(userId)
            .then(user => {

                if (!user) {
                    const error_2 = new Error('Could not find user.');
                    error_2.statusCode = 404;
                    throw error_2;
                }

                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, 'somesupersecretsecret', { expiresIn: '6h' });
                otp.destroy();
                user.update({
                    isVerified: true
                });

                res.status(200).json({ message: 'User verified', token: token, userId: user.id, name: user.name });
            });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
    next(err);
    })


}

//logging in authorized user
exports.login = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password.trim();
    User.findOne({ where: { email: email }})
    .then(user => 
        {

            if(!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }

            if(!user.isVerified) {

                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                console.log(otp);
                bcrypt.hash(otp, 8)
                .then(hashedOtp => {
                    Otp.findByPk(user.id)
                    .then(otp => {

                        otp.update({
                            otp: hashedOtp
                        })
                        setTimeout(() => {
                            otp.update({
                                otp: ""
                            })
                        }, 120000)

                    })
                    .catch(err => {
                        throw err
                    })

                    transporter.sendMail({
                        to: email,
                        from: 'eventsity@gmail.com',
                        subject: 'Resend otp',
                        html: `<h1>Thanks for signing up with EventSity</h1>
                               <h1>Here is your otp ${otp}</h1>`
                    })

                })
                
                .catch(err => {
                    if(!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                })

                return res
                .status(401)
                .json({
                    message: 'User is not verified',
                    userId: user.id
                })
            }

            return bcrypt.compare(password, user.password)
    .then(isEqual => {

        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 403;
            throw error;
        }

        const token = jwt.sign({
            email: user.email,
            userId: user.id
        },
        'somesupersecretsecret',
        { expiresIn: '6h' }
        )

        user.update({
            isLoggedIn: true
        })
    
        res.status(200).json({ token: token, userId: user.id, name: user.name
            })
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//deactivating user account
exports.delUser = (req, res, next) => {
    
    const password = req.body.password.trim();
    var loadedUser;
    User.findByPk(req.userId)
    .then(user => {

        if (!user) {
            const error = new Error('Could not find user.');
            error.statusCode = 404;
            throw error;
        } 

        loadedUser = user;
        return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
        
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({ message: 'User deleted' })
        return loadedUser.destroy();
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//logging out user from all devices
exports.logoutFromAllUser = (req, res, next) => {

    User.findByPk(req.userId)
    .then(user => {

        if (!user) {
            const error = new Error('Could not find user.');
            error.statusCode = 404;
            throw error;
        } 

        user.update({
            isLoggedIn: false
        })

        res.status(200).json({ message: 'Logged out from all devices.' })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}


