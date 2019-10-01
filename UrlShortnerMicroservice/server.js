var express = require("express");
var bodyParser = require("body-parser");

var app = (module.exports = express());
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));

app.post("", function() {});

app.listen(3000, function() {
  console.log("Server is running on port 3000!");
});
