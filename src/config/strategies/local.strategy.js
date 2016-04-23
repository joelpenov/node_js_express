var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;
var mongoURL = require('../database').MONGO_URL;

module.exports = function(){
	passport.use(new LocalStrategy({
		usernameField: 'userName',
		passwordField: 'password'
	}, function(username, password, done){
		mongodb.connect(mongoURL, function(err, db){
			var users = db.collection('users');			
			users.findOne({username: username}, function(err, userEntity){				
				if(userEntity.password === password){ done(null, userEntity);}
				else done(null, false, {message: '401, unauthorize user'});
			});
			
		});
			
	}));
};