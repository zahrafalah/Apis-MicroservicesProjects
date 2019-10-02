//Get requirment and set instance of them
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var shortUrl = require("./models/shortUrl.js");

//connect to our database
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/shortUrls");

var app = (module.exports = express());
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));

/** this project needs to parse POST bodies **/
// mount the body-parser here

//Allows node to find static content
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//Create the database entry
app.get("/new/:urlToShorten", (req, res) => {
  var { urlToShorten } = req.params;
  //test regular expressions
  var regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  if (regex.test(urlToShorten)) {
    const data = new shortUrl({
      originalUrl: urlToShorten,
      shorterUrl: shortUrl.id
    });

    data.save(err => {
      if (err) {
        return res.send("Error occured while saving data to database");
      }
    });
    return res.json(data);
  }
  var data = new shortUrl({
    originalUrl: "Invalid URL",
    shorterUrl: shortUrl.id
  });
  return res.json(data);
});

//Query database and return the originalUrl

app.post("/new", (req, res) => {
  console.log("I ammmm here!");
});

//process here means if it is on heroku
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000!");
});
