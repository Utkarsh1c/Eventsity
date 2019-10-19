const express = require('express');
 
//requiring middleware for authorization purpose
const isAuth = require('../middleware/is-auth');

//requiring user controller
const userController = require('../controllers/user');

//router defined in express
const router = express.Router();

//handling user post and get requests
router.post('/enquiry/:eventId', isAuth, userController.sendEnquiry)

router.post('/register/:eventId', isAuth, userController.updateRegister)

router.get('/registered/upcoming', isAuth, userController.getUpcomingRegister)

router.get('/registered/visited', isAuth, userController.getVisitedRegister)

router.post('/follow/:userId', isAuth, userController.updateFollow)

router.get('/followed', isAuth, userController.getFollow)

module.exports = router;