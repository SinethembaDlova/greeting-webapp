// Gain access to express, express-handlebars and body-parser
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

//require mangoose and create a database that takes strings
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/greeted_names');

var GreetedName = mongoose.model('greeted_names', {
    name: String
});

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

var storedNames = [];
var uniqueNames = [];
var displayName = '';
//start the server

app.get('/', function(req, res) {
  res.render('html_forms', {
      //lang: languageFunc,
      //name: req.params.name,
      //counting: uniqueNames.length
  });
});

function getLanguage(lang) {
    if (lang === 'Sesotho') {
        return 'Dumela';
    } else if (lang === 'English') {
        return 'Hello';
    } else if (lang === 'IsiXhosa') {
        return 'Molo';
    }
}

var language = "";

app.post('/', function(req, res) {

    var inputName = req.body.takeName;
    language = req.body.language;

    //sending the name that we get from the input box to Mongo
    var names = new GreetedName({
        name: inputName
    });

    names.save(function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('hello');
            //redicting into another route
            res.redirect('greeting/' + inputName)
        }
    });

});


//creating people
app.get('/greetings', function(req, res) {

  res.render('html_forms_greeting', {
      //lang: languageFunc,
      //name: req.params.name,
      //counting: uniqueNames.length
  });
});

app.get('/greeting/:name', function(req, res) {

    var languageFunc = getLanguage(language);

    storedNames.push(req.params.name);
    counterFunc();

    console.log(uniqueNames.length);
    res.render('html_forms_greeting', {
        lang: languageFunc,
        name: req.params.name,
        counting: uniqueNames.length
    });
    //res.render('html_forms_greeting', {name: req.params.name});
});

//displaying all the created names
app.get('/greeted', function(req, res) {

    res.render('html_forms_greeted', {
        name: uniqueNames
    });
    //res.send(displayName);
});

app.post('/greeted', function(req, res) {
    var inputName = req.body.takeName;

    //sending the name that we get from the input box to Mongo
    var names = new GreetedName({
        name: inputName
    });

    GreetedName.find(function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            //redicting into another route
            res.redirect('/greetings' + inputName);
        }
    });

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


function counterFunc() {
    for (var i = 0; i < storedNames.length; i++) {
        if (uniqueNames.indexOf(storedNames[i]) == -1) {
            displayName += storedNames[i] + "<br>";
            uniqueNames.push(storedNames[i]);
        }
    }
}

app.listen(app.get('port'), function(err) {
    if (err) {
        return err;
    } else {
        console.log('server running on port 3000');
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
