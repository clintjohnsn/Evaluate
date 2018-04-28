"use strict";

var expect = require('chai').expect;

var foo = 'bar'
var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };


describe('Math', function() {  
    describe('#abs()', function() {
        it('should return positive value of given negative number', function() {
            expect(Math.abs(-5)).to.be.equal(5);
            expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);
var qs = require("querystring");
var http = require("http");

var options = {
  "method": "POST",
  "hostname": 
    "localhost"
  ,
  "port": "3000",
  "path": [
    "products",
    "bid"
  ],
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(qs.stringify({ bid: '10', auctionid: '12' }));
req.end();

        });
    });
});
