const express = require('express');
const { body } = require('express-validator');
 
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

router.put('/update/:eventId', feedController.updateEvent)

router.post('/enquiry/:eventId', isAuth, feedController.sendEnquiry)

router.post('/register/:eventId', isAuth, feedController.updateRegister)

router.get('/registered', isAuth, feedController.getRegister)

router.delete('/delete/:eventId', feedController.deleteEvent)

module.exports = router;