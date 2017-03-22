# What is this?
Simple express middleware to validate headers

## Usage
`validateHeader(name [, value])`

# Example
```
var express = require("express");
var app = express();
var validateHeader = require("express-headers");

app.use(validateHeader("authorization")); //make sure there's an authorization header in the request
app.use(validateHeader("content-type", "application/json")); //make sure there's a content-type header matching application/json
...
```