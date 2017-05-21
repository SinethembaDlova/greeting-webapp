// Gain access to express, express-handlebars and body-parser
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use(bodyParser);
app.engine('hbs', exphbs({defaultLayout: "main", extname: 'hbs'}));
app.set('view engine', 'hbs');


//start the server

app.get('/', function(req, res) {
    res.render("html_forms");
    //res.send('Greeting webapp!');
});

app.post('/', function(req, res){
  var inputName = req.body.takeName;
  console.log(req.body);
  res.render("html_forms", {name:inputName});
});


// var storedNames = [];
// //creating people
// app.get('/greeting/:name', function(req, res) {
//   res.send("Hello, " + req.params.name);
//   //res.render("html_forms_greeting");
//   storedNames.push(req.params.name);
// });
//
// //displaying all the created names
// app.get('/greeted', function(req, res) {
//     var uniqueNames = [];
//     var displayName = '';
//
//     for (var i = 0; i < storedNames.length; i++) {
//         if (uniqueNames.indexOf(storedNames[i]) == -1) {
//             displayName += storedNames[i] + "<br>";
//             uniqueNames.push(storedNames[i]);
//         }
//     }
//     console.log(uniqueNames);
//     res.send(displayName);
//
// });
//
//
// //displaying how many times someone has been greeted
// app.get('/counter/:name', function(req, res) {
//     var counter = 0;
//     for (var i = 0; i < storedNames.length; i++) {
//         if (req.params.name === storedNames[i]) {
//             counter++;
//         }
//     }
//     res.send("Hello, " + req.params.name + " has been greeted " + counter + " times.");
// });

app.listen(3000, function(err) {
  if (err) {
    return err;
  } else {
    console.log('server running');
  }
});

/*var iqhosha = document.querySelector(".inputCover button");
var igama = document.querySelector('.inputCover input');
igqhosha.addEventListener('click',res.redirect(server +'/greeting/' + igama) );
*/
