var express = require('express');
var app = express();

//start the server
var server = app.listen(3000);

app.get('/', function (req, res) {
 res.send('Greeting webapp!');
});

app.get('/greeting/:name', function(req, res){
    res.send("Hello, " + req.params.name)
});

app.get('/greeted', function(req, res){
    res.send(req.params.name)
});

app.get('/counter/<USER_NAME>', function(req, res){
    res.send(Hello, <USER_NAME> has been greeted <COUNTER> times.)
});
