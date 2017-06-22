var Driver = require('../models/driver');


module.exports = {
    greeting: function(req, res) {
        res.send({ hi: 'There'});
    },
    
    create: function(req, res, next) {
        var driverProps = req.body;
        
        Driver.create(driverProps)
            .then(function(driver) {
                res.send(driver);
        })
        .catch(next);  
    },
    
    
    edit: function(req, res, next) {
        var driverId = req.params.id;
        var driverProps = req.body;
        
        Driver.findByIdAndUpdate({ _id:driverId }, driverProps)
            .then(function() {
                Driver.findById({ _id: driverId})
                .then(function(driver) {
                    res.send(driver);
                });
        })
        .catch(next);
    },
    
    
    
    delete: function(req, res, next) {
        var driverId = req.params.id;
        
        Driver.findByIdAndRemove({ _id: driversId })
            .then(function(driver) {
                res
                    .status(204)
                    .send(driver)
        })
        .catch(next);
    },
    
    
    
    index: function(req, res, next) {
        
        var lng = req.query.lng;
        var lat = req.query.lat;
        
        Driver.geoNear({
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
        }, {
            spherical: true,
            maxDistance: 200000
        })
            .then(function(drivers) {
                res.send(drivers);
        })
            .catch(next);
    }
    
    
};