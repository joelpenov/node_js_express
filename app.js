var express = require('express');

var app = express();

var PORT = process.env.PORT || 5346;

app.use(express.static('static'));

app.set(('./src/views'));
app.set('views', './src/views');

var booksRouter = express.Router();

// var habdlebars = require('express-handlebars');
// app.engine('.hbs', habdlebars({extname: '.hbs'}));

app.set('view engine', 'ejs');


booksRouter.route('/')
.get( function(request, response) {
	response.send('/books');
});

booksRouter.route('/single')
.get( function(request, response) {
	response.send('/books/single');
});

app.use('/books', booksRouter);

app.get('/', (request, response) =>{
    response.render('index', {title: 'Title from render', menu: [
    	{link:'/books', label:'Books'},
    	{link:'/authors', label:'Authors'}
    	]});
});

app.get('/books', (request, response) =>{
    response.send('Hello Books');
});

app.listen(PORT, (error) => { 
                if(error) 
                {
                    console.log(error);
                    return;
                }
                console.log(`App running on ${PORT}` );
            });