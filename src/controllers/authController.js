var mongodb = require('mongodb').MongoClient;
var mongoDbUrl = require('../config/database').MONGO_URL;

var authController = function(){

	var signUp = function(req, resp){		
		mongodb.connect(mongoDbUrl, function(err, db){
			var users = db.collection('users');
			var user = {username: req.body.userName, password: req.body.password};
			users.insert(user, function(err, result){
			req.login(result.ops[0], function(){
				resp.redirect('/auth/profile');
			});
			});
		});
		
	};

	var signIn = function(req, resp){
			resp.redirect('/books');
		};

	var getProfile = function(req, resp){
			resp.json(req.user);		
		};

	var middleware = function(req, resp, next){
		if(!req.user){
			resp.redirect('/');
		}
		next();
	};

	return {
		signUp: signUp, 
		signIn: signIn, 
		getProfile: getProfile, 
		middleware: middleware
	};
};

module.exports = authController;
