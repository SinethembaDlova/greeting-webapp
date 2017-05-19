// call express and store in a variable
var express = require('express');
var app = express();

//start the server
var server = app.listen(3000);



app.get('/', function (req, res) {
 res.send('Greeting webapp!');
});

var storedNames = [];
var nameGreeted = {};
var counter = 0;

//creating people
app.get('/greeting/:name', function(req, res){
    res.send("Hello, " + req.params.name)
    storedNames.push(req.params.name);

});
 //console.log(storedNames);

//displaying all the created names
app.get('/greeted', function(req, res){
   var displayName = '';
   for (var i = 0; i < storedNames.length; i++) {
     displayName += storedNames[i] + "<br>";
     //console.log(storedNames[i]);
   }
   res.send(displayName);

});


//displaying how many times someone has been greeted
app.get('/counter/:name', function(req, res){
     if (nameGreeted[req.params.name] === undefined){
       nameGreeted[req.params.name] = true;
       counter++;
     }
     res.send("Hello, " + req.params.name + " has been greeted " + counter + " times.");
});
