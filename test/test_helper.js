var mongoose = require('mongoose');


before(function(done) {
    mongoose.connect('mongodb://localhost/muber_test');
    
    mongoose.connection
        .once('open', function() { 
            done(); 
        })
        .on('error', function(error) {
            console.warn('Warning', error);
    });
});




beforeEach(function(done) {
    var drivers = mongoose.connection.collections.drivers;
    
    drivers.drop()
        .then(function() {
            return drivers.ensureIndex({
                'geometry.coordinates': '2dsphere'
            });
    })
        .then(function() {
            done();
    })
        .catch(function() {
            done();
    });
});
