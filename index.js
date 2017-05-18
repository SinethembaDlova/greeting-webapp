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
