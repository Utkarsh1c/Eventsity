const { validationResult } = require('express-validator');

const Event = require('../models/events');

const User = require('../models/user');

exports.getEvents = (req, res, next) => {
    Event.findAll()
    .then(events => {
        res.status(200).json({
            message: 'Fetched posts successfully',
            events: events
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
    }

exports.createEvent = (req, res, next) => {
    const userId = req.params.userId;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
        }
    
    const ename = req.body.ename;
    const imagePath = req.body.imagePath;
    const evenue = req.body.evenue;
    const fevenue = req.body.fevenue;
    const category = req.body.category;
    const date = req.body.date;
    User.findByPk(userId)
        .then(user => {
    user.createEvent({
        ename: ename,
        imagePath: imagePath,
        evenue: evenue,
        fevenue: fevenue,
        category: category,
        date: date,
        // userId: req.user.id
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

exports.getEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    Event.findByPk(eventId)
    .then(event => {
        if (!event) {
            const error = new Error('Could not find event.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Event fetched', event: event })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

// exports.getEvent = (req, res, next) => {
//     // const eventId = req.params.eventId;
//     // req.user.getEvents({ where: {userId: eventId}})
//     req.user.getEvents()
//     // Event.findAll({ where: {userId: eventId}})
//     .then(event => {
//         if (!event) {
//             const error = new Error('Could not find event.');
//             error.statusCode = 404;
//             throw error;
//         }
//         res.status(200).json({ message: 'Event fetched', event: event })
//     })
//     .catch(err => {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         next(err);
//     })
// }

exports.updateEvent = (req, res, next) => {
    const ename = req.body.ename;
    const imagePath = req.body.imagePath;
    const evenue = req.body.evenue;
    const fevenue = req.body.fevenue;
    const category = req.body.category;
    const date = req.body.date;
    const eventId = req.params.eventId;
    Event.findByPk(eventId)
    .then(event => {
        console.log(event,'...........')
        if (!event) {
            const error = new Error('Could not find event.');
            error.statusCode = 404;
            throw error;
        }
        event.update({
            ename: ename,
            imagePath: imagePath,
            evenue: evenue,
            fevenue: fevenue,
            category: category,
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

exports.deleteEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    Event.findByPk(eventId)
    .then(event => {
        if (!event) {
            const error = new Error('Could not find event.');
            error.statusCode = 404;
            throw error;
        } 
        res.status(200).json({ message: 'Event deleted' })
        return event.destroy();
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}