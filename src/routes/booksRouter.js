
var express = require('express');
var mysql = require('mysql');

var booksRouter = express.Router();

var connection = mysql.createConnection({
  host: "localhost",
  user: "booksuser",
  password: "W3lc0m3Job",
  database: "booksdb"
});


connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n", err);  
 }
 });

var router = function (menu) {
	booksRouter.route('/')	
	.get( function(request, response) {
		connection.query('SELECT * from book;', function(err, rows, fields) {
 		
	   if (!err)
	     response.render('books', {title:'Books', books: rows, menu: menu});
	   else
	     console.log('Error while performing Query.');
	   });		
	});

	booksRouter.route('/:id')
	.all(function(req, resp, next){
		var id = req.params.id;
		var query = `SELECT * from book where id = ${id};`;		
		connection.query(query, function(err, rows, fields) {		

	   if (!err){	   	
	   		req.book = rows[0];
	   		next();
	   }	   
	   else
	     console.log('Error while performing Query.');
	   });	
		
	})
	.get( function(request, response) {
		var book = request.book || {};
		response.render('book', {title: book.title ? book.title + ' - ' + book.author: "Not found", menu: menu, book: book});
	});

	return booksRouter;
};

module.exports = router;