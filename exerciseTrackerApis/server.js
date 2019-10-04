//Get requirment and set instance of them

const express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");

//connect to our database
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/shortUrls");

var app = (module.exports = express());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Allows node to find static content
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//process here means if it is on heroku
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000!");
});
