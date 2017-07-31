'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database');


const mongoURL = process.env.MONGO_DB_URL || "'mongodb://localhost/test'";
mongoose.connect(mongoURL);
