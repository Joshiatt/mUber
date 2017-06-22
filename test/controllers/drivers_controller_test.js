var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('../../app.js');


var Driver = mongoose.model('driver');


describe('Drivers Controller', function() {
    
    it('Post to /api/drivers creates a new driver', function(done) {
        
        Driver.count()
            .then(function(count) {
                request(app)
                    .post('/api/drivers')
                    .send({email: 'test@test.com'})
                    .end(function() {
                        Driver.count().then(function(newCount) {
                            assert(count + 1 === newCount);
                            
                            done();
                        });       
                    
                });
        });
        
    });
    
    
    it('Put to /api/drivers/id edits an existing driver', function(done) {
        var driver = new Driver({ email: 't@t.com', driving: false});
        driver.save()
            .then(function() {
                request(app)
                    .put('/api/drivers/'+ driver._id)
                    .send({ driving: true})
                    .end(function() {
                        
                        Driver.findOne({ email: 't@t.com'})
                            .then(function(driver) {
                                assert(driver.driving === true);
                                done();
                        })
                })
        })
    });
    
    
    
    it('Delete to /api/drivers/id can delete a driver', function(done) {
        var driver = new Driver({ email: 'test@test.com' });
        
        driver.save()
            .then(function() {
                request(app)
                    .delete('/api/drivers/'+ driver._id)
                    .end(function() {
                      Driver.findOne({ email: 'test@test.com'})  
                            .then(function(driver) {
                                assert(driver === null);
                      });
                });
            
            done();
        });
    });
    
    
    
    it('Get to /api/drivers finds drivers near you', function(done) {
        var seattleDriver = new Driver({ 
            email: 'seattle@test.com',
            geometry: {
                type: 'Point',
                coordinates: [-122.4759902, 47.6147628]
            }
        });
        
        
        
        var miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry: {
                type: 'Point',
                coordinates: [-80.253, 25.791]
            }
        });
        
        
        
        Promise.all([
            seattleDriver.save(), miamiDriver.save()])
                .then(function() {
                 request(app)
                    .get('/api/drivers?lng=-80&lat=25')
                    .end(function(err, response) {
                        assert(response.body.length === 1);
                        assert(response.body[0].obj.email === 'miami@test.com');
                        done();
                 });
        });
        
        
    });
    
});











