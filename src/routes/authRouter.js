var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var authController = require('../controllers/authController')();

var router = function () {

	authRouter.route('/signup')
	.post(authController.signUp);

	authRouter.route('/signin')	
	.post(passport.authenticate('local',{failureRedirect: '/'}), authController.signIn);

	authRouter.route('/profile')
	.all(authController.middleware)
	.get(authController.getProfile);

	return authRouter;
};


module.exports = router;