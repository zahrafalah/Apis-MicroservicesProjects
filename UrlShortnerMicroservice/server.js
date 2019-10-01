var express = require("express");
var bodyParser = require("body-parser");

var app = (module.exports = express());
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));

/** this project needs to parse POST bodies **/
// mount the body-parser here

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl/new", function(req, res) {
  console.log("I ammmm here!");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000!");
});
