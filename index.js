// Gain access to express, express-handlebars and body-parser
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: "main",
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//start the server

app.get('/', function(req, res) {
    res.render("html_forms");
    //res.send('Greeting webapp!');
});

function getLanguage(lang){
  if(lang  === 'Sesotho')
  {
    return 'Dumela';
  }
  else if (lang === 'English'){
    return 'Hello';
  }

  else if (lang === 'IsiXhosa'){
    return 'Molo';
  }
}

var language = "";

app.post('/', function(req, res) {

    var inputName = req.body.takeName;
    language = req.body.language;
    res.redirect('greeting/' + inputName)
});


var storedNames = [];
//creating people
app.get('/greeting/:name', function(req, res) {
    var languageFunc = getLanguage(language);

    res.render('html_forms_greeting', {lang: languageFunc, name: req.params.name});
    //res.render('html_forms_greeting', {name: req.params.name});
    storedNames.push(req.params.name);

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
    res.render('html_forms_greeted', {
        name: uniqueNames
    });
    //res.send(displayName);
});

app.post('/greeted', function(req, res) {
    var inputName = req.body.takeName;
    res.redirect('counter/' + inputName);
});



//displaying how many times someone has been greeted
app.get('/counter/:name', function(req, res) {
    var counter = 0;
    for (var i = 0; i < storedNames.length; i++) {
        if (req.params.name === storedNames[i]) {
            counter++;
        }
    }
    res.render('html_forms_counter', {
        name: req.params.name,
        count: counter
    });
    //res.send("Hello, " + req.params.name + " has been greeted " + counter + " time(s).");
});

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
, {
    name: req.params.name
}, {
    count: counter
}
*/
