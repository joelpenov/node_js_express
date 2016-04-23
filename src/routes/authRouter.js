var express = require('express');
var mongodb = require('mongodb').MongoClient;
var mongoDbUrl = require('../config/database').MONGO_URL;
var authRouter = express.Router();
var passport = require('passport');

var router = function (menu) {
	authRouter.route('/signup')
	.post(function(req, resp){		
		console.log(req.body);
		mongodb.connect(mongoDbUrl, function(err, db){
			var users = db.collection('users');
			var user = {username: req.body.userName, password: req.body.password};
			users.insert(user, function(err, result){
			req.login(result.ops[0], function(){
				resp.redirect('/auth/profile');
			});
			});
		});
		
	});

	authRouter.route('/signin')	
	.post(passport.authenticate('local',
		{failureRedirect: '/'}),function(req, resp){
			resp.redirect('/auth/profile');
		}
		);

	authRouter.route('/profile')
	.all(function(req, resp, next){
		if(!req.user){
			resp.redirect('/');
		}
		next();
	})
	.get(function(req, resp){
		console.log(req.user);
		resp.json(req.user);		
	});

	return authRouter;
};


module.exports = router;