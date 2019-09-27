const express = require('express');
 
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/enquiry/:eventId', isAuth, userController.sendEnquiry)

router.post('/register/:eventId', isAuth, userController.updateRegister)

router.get('/registered/upcoming', isAuth, userController.getUpcomingRegister)

router.get('/registered/visited', isAuth, userController.getVisitedRegister)

router.post('/follow/:userId', isAuth, userController.updateFollow)

router.get('/followed', isAuth, userController.getFollow)

module.exports = router;