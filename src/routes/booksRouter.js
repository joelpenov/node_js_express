
var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var mongoDbUrl = require('../config/database').MONGO_URL;

var booksRouter = express.Router();

var router = function (menu) {

	booksRouter.use(function(req, resp, next){
		if(!req.user){
			resp.redirect('/');
		}
		next();
	});

	booksRouter.route('/')
	.get( function(request, response) {
		
		mongodb.connect(mongoDbUrl, function(err, db){
			var books = db.collection('book');
			books.find({}).toArray(function(error, bookObjects){								
				response.render('books', {title:'Books', books: bookObjects, menu: menu});		
			});
			
		});
	     
	});

	booksRouter.route('/:id')
	.all(function(req, resp, next){
		var id = req.params.id;
		mongodb.connect(mongoDbUrl, function(err, db){
			var books = db.collection('book');			
			books.findOne({_id:  new ObjectId(id)}, function(error, bookObject){				
				req.book = bookObject;				
	   			next();		
			});
			
		});	   		
	})
	.get( function(request, response) {
		var book = request.book || {};		
		response.render('book', {title: book.title ? book.title + ' - ' + book.author: 'Not found', menu: menu, book: book});
	});

	return booksRouter;
};

module.exports = router;