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
var language = "";

function getLanguage(lang) {
    if (lang === 'Sesotho') {
        return 'Dumela';
    } else if (lang === 'English') {
        return 'Hello';
    } else if (lang === 'IsiXhosa') {
        return 'Molo';
    }
}


app.get('/', function(req, res) {

  GreetedName.find(function(err, allNames) {
      if (err) {
          console.log(err);
      } else {
          console.log(allNames);
          //redicting into another route
          res.render('html_forms', {
              //lang: languageFunc,
              name: req.params.name,
              counting: allNames.length
          });

      }
  });
});


app.post('/', function(req, res) {

    var inputName = req.body.takeName;
    language = req.body.language;

    //sending the name that we get from the input box to Mongo
    var names = new GreetedName({
        name: inputName
    });

    names.save(function(err, names) {
        if (err) {
            console.log(err);
        } else {
            console.log(names);
            //redicting into another route
            res.redirect('greeting/' + inputName)
        }
    });

});


//creating people
app.get('/greetings', function(req, res) {

    res.render('html_forms_greeting', {
        lang: languageFunc,
        name: req.params.name,
        counting: uniqueNames.length
    });
});

app.get('/greeting/:name', function(req, res) {

    var languageFunc = getLanguage(language);

    storedNames.push(req.params.name);
    counterFunc();

    GreetedName.find(function(err, allNames) {
        if (err) {
            console.log(err);
        } else {
            console.log(allNames);
            //redicting into another route
            res.render('html_forms_greeting', {
                lang: languageFunc,
                name: req.params.name,
                counting: allNames.length
            });
        }
    });


    //res.render('html_forms_greeting', {name: req.params.name});
});

//displaying all the created names
app.get('/greeted', function(req, res) {
    //trying to retrieve the data stored in database
    GreetedName.find(function(err, allNames) {
        if (err) {
            console.log(err);
        } else {
            console.log(allNames);

            res.render('html_forms_greeted', {
                names: allNames
            });

        }
    });

    //res.redirect('/greetings' + inputName);
});

app.post('/greeted', function(req, res) {

});



//displaying how many times someone has been greeted
app.get('/counter/:name', function(req, res) {
    /*var counter = 0;
    for (var i = 0; i < storedNames.length; i++) {
        if (req.params.name === storedNames[i]) {
            counter++;
        }
    }
    res.render('html_forms_counter', {
        name: req.params.name,
        count: counter
    });*/

    GreetedName.findOne({name: req.params.name},function(err, allNames) {
        if (err) {
            console.log(err);
        } else {
            console.log(allNames);

            res.render('html_forms_counter', {
              name: req.params.name,
              count: counter
            });

        }
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
