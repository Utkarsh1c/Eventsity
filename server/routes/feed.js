const express = require('express');
const { body } = require('express-validator');
 
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/posts', feedController.getEvents);

router.post(
    '/posts/:userId',
//    [
//     body('title')
//     .trim()
//     .isLength({ min:5 }),
//     body('content')
//     .trim()
//     .isLength({ min:5 }),
//    ],
feedController.createEvent);

router.get('/posts/:eventId', feedController.getEvent)

router.put('/posts/:eventId', feedController.updateEvent)

router.delete('/posts/:eventId', feedController.deleteEvent)

module.exports = router;