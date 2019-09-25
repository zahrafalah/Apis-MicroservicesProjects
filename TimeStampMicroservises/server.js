//unix format is the way we do date in javaScript
//utc is natural date

var express = require("express");
var bodyParser = require("body-parser");

var app = (module.exports = express());
app.use(bodyParser.json());

//Get call to return a json object that formats natural and unix
app.get("/dateValues/:dateVal", function(req, res, next) {
  //   console.log("URL is working!");
  //request data for date
  var dateVal = req.params.dateVal;
  //Options for formating date in natural date
  var dateFormatingOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  //In case the parametre is not a number but string
  if (isNaN(dateVal)) {
    var naturalDate = new Date(dateVal);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormatingOptions);
    unixDate = new Date(dateVal).getTime() / 1000;
  } else {
    var unixDate = dateVal;
    var naturalDate = new Date(dateVal * 1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormatingOptions);
  }

  return res.json({
    unix: unixDate,
    utc: naturalDate
  });
});

//In order to test it with postman: localhost:3000/dateValues/December%2014,%202015 (String)
//Or localhost:3000/dateValues/2015-12-25 (String)
//Or localhost:3000/dateValues/1450137600   (Number)

app.listen(3000, function() {
  console.log("Server is running on port 3000!");
});
