//https://www.goodreads.com/book/show/665?format=xml&key=9l1XU6LVJLCUQ9gfw7wFPA
var http = require('http');
var xml2js = require('xml2js');

var parser = xml2js.Parser({explicitArray: false});

var goodReadsService = function(){
	var getById = function(id, callback){
		var requestOptions = {
			method: 'get',
			host: 'www.goodreads.com', 
			path: '/book/show/657?format=xml&key=9l1XU6LVJLCUQ9gfw7wFPA'
		};
		var requestCallback = function(response){
			var responseString = '';

			response.on('data', function(data){
				responseString += data;				
			});

			response.on('end', function(){
				parser.parseString(responseString, function(error, result){
					var book = result.GoodreadsResponse.book;		
					console.log(book.authors.author[0]);
					callback(null, book);	
				});
				
			});
		};
		http.request(requestOptions, requestCallback).end();

			
	};

	return{
		getById: getById
	};
};

module.exports = goodReadsService;