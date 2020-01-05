//requiring user and event model
const Event = require('../models/events');
const User = require('../models/user');

//requiring modules necessary for sending mails
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
// const config = require('../util/config');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: 'dasdasdasd'
    }
}));

//register event for a user
exports.updateRegister = (req, res, next) => {

    const eventId = req.params.eventId;
    const name = req.body.name;
    const email = req.body.email;
    Event.findByPk(eventId)
    .then(event => {

        if (!event) {
            const error = new Error('Could not find event.');
            error.statusCode = 404;
            throw error;
        } 
    
            event.addRegister(req.userId)
            event.update({
                registrations: (event.registrations+1)
            })

        transporter.sendMail({
            to: email,
            from: req.email,
            subject: 'Registered for event',
            html: `<h1>Hi ${name} !. You have successfully registered for ${event.ename}</h1>`
            })

        res.status(200).json({ message: 'Successfully registered!' })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//get upcoming registered events
exports.getUpcomingRegister = (req, res, next) => {

    const today = new Date();
    var upcomingRegister = [];
    User.findByPk(req.userId)
    .then(user => {
        user.getRegister()
        .then(event => {

            event.forEach(element => {
                if ((parseInt(element.date.split('/')[2]*10000) + parseInt(element.date.split('/')[1]*100) + parseInt(element.date.split('/')[0])) >= (today.getFullYear()*10000 + (today.getMonth()+1)*100 + today.getDate()))
                    upcomingRegister.push(element);
            });
            
            res.status(200).json({ message: 'Registered events', event: upcomingRegister })
        })
        .catch(err => {
            throw err;
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//get visited registered events
exports.getVisitedRegister = (req, res, next) => {

    const today = new Date();
    var visitedRegister = [];
    User.findByPk(req.userId)
    .then(user => {
        user.getRegister()
        .then(event => {

            event.forEach(element => {
                if ((parseInt(element.date.split('/')[2]*10000) + parseInt(element.date.split('/')[1]*100) + parseInt(element.date.split('/')[0])) < (today.getFullYear()*10000 + (today.getMonth()+1)*100 + today.getDate()))
                    visitedRegister.push(element);
            });
            
            res.status(200).json({ message: 'Registered events', event: visitedRegister })
        })
        .catch(err => {
            throw err;
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//additional follow feature
exports.updateFollow = (req, res, next) => {

    const userId = req.params.userId;
    User.findByPk(userId)
    .then(user => {
        user.addFollow(req.userId)
        res.status(200).json({ message: 'Successfully followed!' })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//additional get follow feature
exports.getFollow = (req, res, next) => {

    User.findByPk(req.userId)
    .then(user => {
        user.getFollow()
        .then(fuser => {

            if (!fuser) {
                const error = new Error('You are not following anyone yet.');
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({ message: 'Following', following: fuser })
        })
        .catch(err => {
            throw err;
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//send enquiry to event organiser
exports.sendEnquiry = (req, res, next) => {

    const eventId = req.params.eventId;
    const enquiry = req.body.enquiry;
    Event.findByPk(eventId)
    .then(event => {

        if (!event) {
            const error = new Error('Could not find event.');
            error.statusCode = 404;
            throw error;
        } 

        User.findByPk(event.userId)
        .then(user => {

        transporter.sendMail({
            to: user.email,
            from: req.email,
            subject: 'Enquiry for event',
            html: `<h1>${enquiry}</h1>`
            })
            
        res.status(200).json({ message: 'Enquiry sent!' })
        })
        .catch(err => {
            throw err;
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}


