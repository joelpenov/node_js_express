var goodReadsService = require('../services/goodReadsService')();	
var express = require('express');

var booksRouter = express.Router();

var router = function (menu) {
	var bookController = require('../controllers/bookController')(goodReadsService, menu);

	booksRouter.use(function(request, response, next){
		if(!request.user){
			response.redirect('/');
			return;
		}
		next();
	});

	booksRouter.route('/')
	.get( bookController.getAll);

	booksRouter.route('/:id')
	.get(bookController.getById);
	
	return booksRouter;
};

module.exports = router;
