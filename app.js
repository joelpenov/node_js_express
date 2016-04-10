var express = require('express');

var app = express();

var PORT = 2526;

app.use(express.static('static'));
app.use(express.static('src/views'));


app.get('/', (request, response) =>{
    response.send('Hello');
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