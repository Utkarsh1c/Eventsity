const express = require('express');

 //requiring feed controller
const feedController = require('../controllers/feed');

//requiring middleware for authorization purpose
const isAuth = require('../middleware/is-auth');

//router defined in express
const router = express.Router();

//handling user post and get requests
router.get('/posts', feedController.getEvents);

router.get('/posts/:eventId', feedController.getEvent);

router.post('/posts', isAuth, feedController.createEvent);

router.get('/myevents', isAuth, feedController.userEvents)

router.put('/update/:eventId', isAuth, feedController.updateEvent)

router.get('/getupdate/:eventId', isAuth, feedController.getupdateEvent)

router.delete('/delete/:eventId', isAuth, feedController.deleteEvent)

module.exports = router;