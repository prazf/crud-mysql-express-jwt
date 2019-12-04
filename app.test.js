var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:5000/api' , function(error, response, body) {
        expect(body).to.equal('hello world');
        done();
    });
});