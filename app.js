
var express = require('express');

var app = express();

var PORT = process.env.PORT || 5346;

var menu = [
    		{link:'/books', label:'Books'},
    		{link:'/authors', label:'Authors'},
    	];

app.use(express.static('static'));

app.set(('./src/views'));
app.set('views', './src/views');

var booksRouter = require('./src/routes/booksRouter')(menu);
var adminRouter = require('./src/routes/adminRouter')(menu);

app.set('view engine', 'ejs');

app.use('/books', booksRouter);
app.use('/admin', adminRouter);

app.get('/', function (request, response){
    response.render('index', {title: 'Hssome', menu: menu});
});

app.get('/books',function (request, response){
    response.send('Hello Books');
});

app.listen(PORT, function(error) { 
                if(error) 
                {
                    console.log("Something was wrong...: " + error);
                    return;
                }
                console.log(`App running on ${PORT}` );
            });