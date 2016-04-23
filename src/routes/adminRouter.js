var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books =[{title: 'Cuentos antes del Exilio', author: 'Juan Bosh', genre: 'Stories', read: false},
				{title: 'Conversacion en la catedral', author: 'Vincent Vangoh', genre: 'Mistery', read: false},
				{title: 'Guerra y paz', author: 'Zing Ong', genre: 'War', read: false},
				{title: 'Cien anos de soledad', author: 'Gabriel Garcia Marquez', genre: 'Magic', read: false}];

var router = function (menu) {	
	adminRouter.route('/addbooks/').get( function(req, res){
		 var connectionString = 'mongodb://localhost:27017/books';
		 mongodb.connect(connectionString, function(err, db){
		 	var booksDb = db.collection('book');
		 	booksDb.insertMany(books, function(error, resultSet){
		 		res.send(resultSet);
		 		db.close();
		 	});
		 });
	});

	return adminRouter;	
};


module.exports = router;