const express = require('express');
// const { body } = require('express-validator');
 
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/posts', feedController.getEvents);

router.post(
    '/posts', isAuth,
//    [
//     body('title')
//     .trim()
//     .isLength({ min:5 }),
//     body('content')
//     .trim()
//     .isLength({ min:5 }),
//    ],
feedController.createEvent);

router.get('/myevents', isAuth, feedController.userEvents)

router.put('/update/:eventId', isAuth, feedController.updateEvent)

router.get('/getupdate/:eventId', isAuth, feedController.getupdateEvent)

router.delete('/delete/:eventId', isAuth, feedController.deleteEvent)

module.exports = router;