var express = require('express');
var booksRouter = express.Router();

var fakeBooks = [{title: 'Cuentos antes del Exilio', author: 'Juan Bosh', genre: 'Stories', read: false},
				{title: 'Conversacion en la catedral', author: 'Vincent Vangoh', genre: 'Mistery', read: false},
				{title: 'Guerra y paz', author: 'Zing Ong', genre: 'War', read: false},
				{title: 'Cien anos de soledad', author: 'Gabriel Garcia Marquez', genre: 'Magic', read: false},]

var router = function (menu) {
	booksRouter.route('/')
	.get( function(request, response) {
		response.render('books', {title:'Books', books: fakeBooks, menu: menu});
	});

	booksRouter.route('/:id')
	.get( function(request, response) {
		var id = request.params.id;
		var book = fakeBooks[parseInt(id) - 1];
		response.render('book', {title:book.title, menu: menu, book: book});
	});

	return booksRouter;
};

module.exports = router;