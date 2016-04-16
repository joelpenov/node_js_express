var express = require('express');

var app = express();

var PORT = process.env.PORT || 5346;

app.use(express.static('static'));

app.set(('./src/views'));
app.set('views', './src/views');


// var habdlebars = require('express-handlebars');
// app.engine('.hbs', habdlebars({extname: '.hbs'}));

app.set('view engine', 'ejs');


app.get('/', (request, response) =>{
    response.render('index', {title: 'Title from render', patriots: ['Juan Pablo Duarte', 'Ramon Matias Mella', 'Francisco del Rosario Sanchez']});
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