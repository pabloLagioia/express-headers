# What is this?
Simple express middleware to validate headers

## Usage
```
headers.validate(name [, value]) //Validates the existance of a header and its value
headers.rename(from, to)` Renames header 'from' to 'to'
```

# Example
```
var express = require("express");
var app = express();
var headers = require("express-headers");

app.use(headers.rename("x-auth-token", "authorization")); //rename x-auth-token to authorization header
app.use(headers.validate("authorization")); //make sure there's an authorization header in the request
app.use(headers.validate("content-type", "application/json")); //make sure there's a content-type header matching application/json
...
```