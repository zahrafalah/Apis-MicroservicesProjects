var express = require("express");
var bodyParser = require("body-parser");

var app = (module.exports = express());
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000!");
});
