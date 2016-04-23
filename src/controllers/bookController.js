
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var mongoDbUrl = require('../config/database').MONGO_URL;

var bookController = function(bookService, menu){
	var getAll = function(request, response){
		mongodb.connect(mongoDbUrl, function(err, db){
			var books = db.collection('book');
			books.find({}).toArray(function(error, bookObjects){								
				response.render('books', {title:'Books', books: bookObjects, menu: menu});		
			});
			
		});
	     
	};

	var getById = function(req, resp){
			var id = req.params.id;
			mongodb.connect(mongoDbUrl, function(err, db){
				var books = db.collection('book');
				books.findOne({_id:  new ObjectId(id)}, function(error, bookObject){
					if(error){ resp.redirect('/books');}					
					var book = bookObject || {};
					bookService.getById(book.bookId, function(e, response){
						book.serviceBook = response;
						resp.render('book', {
						title: book.title ? book.title + ' - ' + book.author: 'Not found', 
						menu: menu, book: book
					});	
				});					
			
			});
		});
	};

	return {
		getAll: getAll,
		getById: getById
	};
};

module.exports = bookController;