var assert = require('assert');
var request = require('supertest');
var app = require('../app');

describe('Testing express app', function() {
    
    it('Handles a GET request to /api', function(done) {
        request(app)
            .get('/api')
            .end(function(err, response) {
                assert(response.body.hi === 'There');
                done();
        });
    });
});