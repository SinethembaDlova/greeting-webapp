// Gain access to express, express-handlebars and body-parser
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');

app.use(express.static('public'));

//start the server
var server = app.listen(3000);


app.get('/', function(req, res) {
    res.send('Greeting webapp!');
});

var storedNames = [];
//creating people
app.get('/greeting/:name', function(req, res) {
    res.send("Hello, " + req.params.name)
    storedNames.push(req.params.name);
    //console.log(storedNames);
});

//displaying all the created names
app.get('/greeted', function(req, res) {
    var uniqueNames = [];
    var displayName = '';

    for (var i = 0; i < storedNames.length; i++) {
        if (uniqueNames.indexOf(storedNames[i]) == -1) {
            displayName += storedNames[i] + "<br>";
            uniqueNames.push(storedNames[i]);
        }
    }
    console.log(uniqueNames);
    res.send(displayName);

});


//displaying how many times someone has been greeted
app.get('/counter/:name', function(req, res) {
    var counter = 0;
    for (var i = 0; i < storedNames.length; i++) {
        if (req.params.name === storedNames[i]) {
            counter++;
        }
    }
    res.send("Hello, " + req.params.name + " has been greeted " + counter + " times.");
});
