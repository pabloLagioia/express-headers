var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var express = require("express");
var app = express();

var headers = require("./index");

chai.use(chaiHttp);

app.use(headers.fromQuery("Authorization"));
app.use(headers.validate("Content-Type", "application/json"));

app.use("/test-from-query", (req, res) => res.status(200).send(req.header("Authorization")));
app.use("/", (req, res) => res.status(200).end());

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

  it("should not fail if authorization is undefined", function(done) {

    chai.request(app)
      .get("/test-from-query")
      .set("Content-Type", "application/json")
      .send()
      .end(function (err, response) {
        expect(response.status).to.equal(200);
        done();
      });

  });

  it("should use fromQuery", function(done) {

    chai.request(app)
      .post("/test-from-query?AuThOrIzAtIoN=12345")
      .set("Content-Type", "application/json")
      .send()
      .end(function (err, response) {

        expect(response.status).to.equal(200);
        expect(response.text).to.equal("12345");

        done();

      });

  });

});