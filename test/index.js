var expect = require("chai").expect;
var request = require("request");

// this test makes sure the get request is working
it("Main page status", function (done) {
  request("http://localhost:8080/api", function (error, response, body) {
    expect(response.statusCode).to.equal(200);
    done();
  });
});
