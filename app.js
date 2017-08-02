var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/greeted_names');

var greetedNames = mongoose.model('greeted_names', {
    name: String
});

var names = new greeted_names({
    name: 'Sinethemba'
});
names.save(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('hello');
    }
});
