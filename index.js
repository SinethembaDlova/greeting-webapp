// Gain access to express, express-handlebars and body-parser
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('express-flash');
//require mangoose and create a database that takes strings
var mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/greeted_names";

var app = express();

mongoose.connect(mongoURL);

var NameSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        sparse: true
    },
    eachUserCounter: Number
});

NameSchema.index({
    name: 1
}, {
    unique: true
});

var GreetedName = mongoose.model('GreetedName', NameSchema);


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
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 6000 * 30
    }
}));
app.use(flash());

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

    if (!inputName) {
        req.flash('error', 'Please enter a name!');
        res.redirect('/');
    } else {
        //sending the name that we get from the input box to Mongo
        var names = new GreetedName({
            name: inputName,
            eachUserCounter: 1
        });

        names.save(function(err, allNames) {
            if (err) {
                if (err.code === 11000) {
                    GreetedName.findOne({
                        name: inputName
                    }, function(err, results) {
                        results.eachUserCounter++;
                        results.save(function(error) {
                        req.flash('error', 'The person you are greeting is already greeted!');
                        res.redirect('/');

                        })

                    })
                    //allNames.eachUserCounter++;
                } else {
                    return next(err);
                }
            } else {
                console.log(allNames);
                //redicting into another route
                res.redirect('greeting/' + inputName);
            }
        });
    }
});

app.get('/greeting/:name', function(req, res) {

    var languageFunc = getLanguage(language);

    storedNames.push(req.params.name);
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
});

//deling everything in the database
app.get('/clear', function(req, res){
  GreetedName.remove(function(err, allNames) {
    if (err) {
      console.log(err);
    }

    else {
      res.redirect('/');
    }
  });
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

//displaying how many times someone has been greeted
app.get('/counter/:name', function(req, res) {
    /*
    for (var i = 0; i < storedNames.length; i++) {
        if (req.params.name === storedNames[i]) {
        }
    }*/

    GreetedName.findOne({
        name: req.params.name
    }, function(err, allNames) {
        if (err) {
            console.log(err);
        } else {
            console.log(allNames);

            res.render('html_forms_counter', {
                name: req.params.name,
                count: allNames.eachUserCounter
            });

        }
    });
});


const port = process.env.PORT || 3000;

app.listen(port, function(err) {
    if (err) {
        return err;
    } else {
        console.log('server running on port 3000');
    }
});
