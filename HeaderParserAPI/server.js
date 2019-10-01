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
app.get("/api/whoami", function(req, res, next) {
  console.log("I am here");
  var ipaddress = req.ip;
  var lang = req.acceptsLanguages();
  var software = req.get("User-Agent");
  // Or  var software = req.headers["user-agent"];

  return res.json({
    ipaddress: ipaddress,
    language: lang,
    software: software
  });
});

//Inorder to test it:
//Run this on browser or postman http://localhost:3000/api/whoami
//You will get this:
// {"ipaddress": "::1",
// "language": [
// "en-US",
// "en",
// "fa",
// "pl"
// ],
// "software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
// }

app.listen(3000, function() {
  console.log("Server is running on port 3000!");
});
