//requiring validation result from routes
const { validationResult } = require('express-validator');

//requiring user and event model
const Event = require('../models/events');
const User = require('../models/user');

//get all upcoming events in discover
exports.getEvents = (req, res, next) => {

    const today = new Date();
    loadedEvent = [];
    Event.findAll()
    .then(event => {

        event.forEach(element => {
            if ((parseInt(element.date.split('/')[2]*10000) + parseInt(element.date.split('/')[1]*100) + parseInt(element.date.split('/')[0])) >= (today.getFullYear()*10000 + (today.getMonth()+1)*100 + today.getDate()))
                loadedEvent.push(element);
        });

        res.status(200).json({
            message: 'Fetched events successfully',
            event: loadedEvent
        })

    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//get a particular event 
exports.getEvent = (req, res, next) => {

    const eventId = req.params.eventId;
    Event.findByPk(eventId)
    .then(event => {

        res.status(200).json({
            message: 'Fetched event successfully',
            event: event
        })

    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//user to create an event
exports.createEvent = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
        }
    
    const description = req.body.description;
    const ename = req.body.ename;
    const imagePath = req.body.imagePath;
    const evenue = req.body.evenue;
    const fevenue = req.body.fevenue;
    const category = req.body.category;
    const orgname = req.body.orgname;
    const date = req.body.date;
    User.findByPk(req.userId)
    .then(user => {
    
        user.createEvent({

            description: description,
            ename: ename,
            imagePath: imagePath,
            evenue: evenue,
            fevenue: fevenue,
            category: category,
            orgname: orgname,
            date: date,

        })
        .then(result => {
            res.status(201).json({
                message: 'Event created',
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    })
    .catch(err => console.log(err))
}

//all events created by that user
exports.userEvents = (req, res, next) => {

    Event.findAll({ where: { userId: req.userId }})
    .then(event => {
        res.status(200).json({ message: 'Event fetched', event: event })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//user to update his created event
exports.updateEvent = (req, res, next) => {

    const description = req.body.description;
    const ename = req.body.ename;
    const imagePath = req.body.imagePath;
    const evenue = req.body.evenue;
    const fevenue = req.body.fevenue;
    const category = req.body.category;
    const orgname = req.body.orgname;
    const date = req.body.date;
    const eventId = req.params.eventId;
    Event.findByPk(eventId)
    .then(event => {

        if (!event) {
            const error = new Error('Could not find event.');
            error.statusCode = 404;
            throw error;
        }

        if (event.userId !== req.userId) {
            const error = new Error('Forbidden to update event.');
            error.statusCode = 403;
            throw error;
        }

        event.update({
            description: description,
            ename: ename,
            imagePath: imagePath,
            evenue: evenue,
            fevenue: fevenue,
            category: category,
            orgname: orgname,
            date: date
            })

        res.status(201).json({ message: 'Event updated', event: event
        })
    })

    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//user to get all previous details during updating event 
exports.getupdateEvent = (req, res, next) => {

    const eventId = req.params.eventId;
    Event.findByPk(eventId)
    .then(event => {

        if (!event) {
            const error = new Error('Could not find event.');
            error.statusCode = 404;
            throw error;
        }
        res.status(201).json({ message: 'Event to be updated', event: event
        })

    })

    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//user to delete his created event
exports.deleteEvent = (req, res, next) => {

    const eventId = req.params.eventId;
    Event.findByPk(eventId)
    .then(event => {

        if (!event) {
            const error = new Error('Could not find event.');
            error.statusCode = 404;
            throw error;
        } 
        
        if (event.userId !== req.userId) {
            const error = new Error('Forbidden to delete event.');
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({ message: 'Event deleted!' })
        return event.destroy();

    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}



