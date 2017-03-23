var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var express = require("express");
var app = express();

var headers = require("./index");

chai.use(chaiHttp);

app.use(headers.validate("Content-Type", "application/json"));
app.use("/", function(req, res) {
  res.status(200).end();
})

app.listen(3010);

describe("Express headers middleware", function () {

  it("should fail with 415 if content-type does not match application/json", function(done) {

    chai.request(app)
      .get("/")
      .send()
      .end(function (err, response) {

        expect(err).not.to.be.null;
        expect(err.status).to.equal(415);

        done();

      });

  });

});