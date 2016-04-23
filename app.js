var bodyParser = require('body-parser');
var express = require('express');

var expressSession = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');

var app = express();

var PORT = process.env.PORT || 5346;

var menu = [
    		{link:'/books', label:'Books'},
    		{link:'/authors', label:'Authors'},
    	];

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({secret: 'k#njAd9$_-_N6Tr5_?',  resave: true, saveUninitialized: true}));
require('./src/config/passport')(app);

app.set(('./src/views'));
app.set('views', './src/views');

var booksRouter = require('./src/routes/booksRouter')(menu);
var adminRouter = require('./src/routes/adminRouter')(menu);
var authRouter = require('./src/routes/authRouter')(menu);

app.set('view engine', 'ejs');

app.use('/books', booksRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function (request, response){
    response.render('index', {title: 'Hssome', menu: menu});
});

app.listen(PORT, function(error) { if(error){console.log('Something was wrong...: ' + error);return;}
                console.log(`App running on ${PORT}` );
            });