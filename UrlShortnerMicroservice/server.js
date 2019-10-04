//Get requirment and set instance of them
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var shortUrl = require("./models/shortUrl.js");

//connect to our database
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/shortUrls");

var app = (module.exports = express());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.post("/new", (req, res) => {
  console.log(req.body);
  var urlToShorten = req.body.url;
  var short = Math.floor(Math.random() * 100000).toString();
  var data = new shortUrl({
    originalUrl: urlToShorten,
    shorterUrl: short
  });
  data.save(err => {
    if (err) {
      return res.send("Error occured while saving data to database");
    }
  });

  return res.json(data);
});

//Create the database entry
app.get("/new/:urlToShorten", (req, res) => {
  var { urlToShorten } = req.params;
  var short = Math.floor(Math.random() * 100000).toString();
  //test regular expressions
  var regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  if (regex.test(urlToShorten)) {
    const data = new shortUrl({
      originalUrl: urlToShorten,
      shorterUrl: short
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
app.get("/api/:databaseId", (req, res, next) => {
  var shorterUrl = req.params.databaseId;

  shortUrl.findOne({ shorterUrl: shorterUrl }, (err, data) => {
    if (err) return res.send("Error reading database");

    var reg = new RegExp("^(http||https)://", "i");
    if (reg.test(shortUrl)) {
      console.log("Dataaaaa!:::" + data);
      res.redirect(301, data.originalUrl);
    } else {
      res.redirect(301, "http://" + data.originalUrl);
    }
  });
});

//For testing run both the project and mongo server then try this url:
//localhost:3000/new/www.freecodecamp.com
//localhost:3000/new/test99
//localhost:3000/api/71477

//process here means if it is on heroku
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000!");
});
