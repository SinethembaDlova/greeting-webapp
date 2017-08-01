'use strict';
var mongoose = require('mongoose');

const mongoURL = process.env.MONGO_DB_URL || "
mongodb://sinethembadlova:t@snur@940521.mlab.com:37040/greeted_names";
mongoose.connect(mongoURL, function(err, db) {
if (err) {
    throw err;
} else {
    console.log("successfully connected to the database");
}
db.close();
});
