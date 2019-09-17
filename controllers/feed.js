const { validationResult } = require('express-validator');

const Event = require('../models/events');

exports.getEvents = (req, res, next) => {
    Events.findAll()
    .then(events => {
        res.status(200).json({
            message: 'Fetched events successfully',
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
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
        }

    const title = req.body.title;
    const content = req.body.content;
    Event.create({
        title: title,
        content: content,
        imageUrl: "sample url",
        creator: "John"
    })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Event created successfully",
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
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

exports.updateEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    const imageUrl = " url 2";
    const title = req.body.title;
    const content = req.body.content;
    const creator = "Mark"
    Event.findByPk(eventId)
    .then(event => {
        console.log(event,'...........')
        if (!event) {
            const error = new Error('Could not find event.');
            error.statusCode = 404;
            throw error;
        }
        event.update({
            title: title,
            content: content,
            imageUrl: imageUrl,
            creator: creator
        })
        res.status(201).json({ message: 'Event  updated', event: event
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
            const error = new Error('No Event found.');
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