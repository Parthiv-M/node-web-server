const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//app.get() handler for an HTTP request
//has two arguments requset and response

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');  //what engine to use for viewing

app.use((req, res, next) => {
    //create a logger for all the requests made on the server
    var now = new Date().toString();

    //request method gives all details about the request method
    var log = now + ':' + req.method + req.url

    console.log(log);
    fs.appendFileSync('server.log', log + '\n');    
    next();
});

// app.use((req,res, next) => {    //maintainence page...
//     res.render('maintainence.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');

    // res.send({
    //     name: 'theProton',
    //     likes: 'soullesssnowball'
    // })

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear : new Date().getFullYear()
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});//makes the app listen to a port, 3000 used for developing