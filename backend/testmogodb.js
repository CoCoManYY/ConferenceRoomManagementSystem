var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongodb_test', function(err) {
    if(!err) {
        console.log('connected to MongoDB!');
    } else {
        throw err;
    }
});
