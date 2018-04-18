
// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();

// important for the HW because public servers give you a random port number
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var reservations = [
{name: "clayton"}, 
{name:"chris"}
];

var waitinglist = [];
waitinglist.push({name:"Hammed"});

// for (i = 0; i < 5; i++) {


// }

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// Displays all reservations
app.get("/api/reservation", function(req, res) {
  return res.json(characters);
});

// Displays all reservations
app.get("/api/waitlist", function(req, res) {
    return res.json(waitinglist);
});

// Displays all reservations
app.get("/api/showTables", function(req, res) {
    return res.json(reservations);
});


// Displays a single character, or returns false
//app.get("/api/reservation/:reservation", function(req, res) {
//  var chosen = req.params.reservation;
//
//  console.log(chosen)0;
//
//  for (var i = 0; i < characters.length; i++) {
//    if (chosen === characters[i].routeName) {
//      return res.json(characters[i]);
//    }
//  }
//
//  return res.json(false);
//});

// Create New Characters - takes in JSON input
app.post("/api/makeres", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newres = req.body;

  console.log(newres);

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newres.name = newres.name.replace(/\s+/g, "").toLowerCase();

  console.log(newres);
  console.log(reservations.length);

if(reservations.length>4)   {
    waitinglist.push(newres);

    res.send(false);
}else{
    reservations.push(newres);
    res.send(true);
}
//   res.json(newres);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
