var halson = require("halson");

module.exports = {

  validate: function(header, value) {

    return function(req, res, next) {

      var headerValue = req.header(header);

      if (headerValue !== undefined) {

        if (value === undefined) {
          return next();
        }
        
        if (headerValue.toLowerCase() === value.toLowerCase()) {
          return next();
        }
        
      }

      var resource = halson({
        "message": header + " header missing or invalid"
      });

      resource.addLink("help", "https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1");

      return res
              .header("Content-Type", "application/vnd.error+json")
              .header("Content-Language", "en-US")
              .status(400)
              .send(resource);

    }

  },

  fromQuery: function(paramName) {

    return function(req, res, next) {

      var paramValue = req.query[paramName];

      if (paramValue) {
        req.headers[paramName] = paramValue;
      }

      next();

    }

  },

  rename: function(from, to) {

    if (!from) {
      throw new Error("Error in express-headers middleware, rename middleware is expecting 'from' to be a valid string");
    }

    if (!to) {
      throw new Error("Error in express-headers middleware, rename middleware is expecting 'to' to be a valid string");
    }

    return function(req, res, next) {

      var toValue = req.header(from);

      if (toValue !== undefined) {
        req.headers[to.toLowerCase()] = toValue;
      }

      next();

    }

  }

}