let express = require('express');
var bodyParser = require("body-parser");
let path = require("path");

let app = express();
let PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data
// ===========================================================
// consider call from SQL and storing in object before rest of program begins when incorporating SQL db
let characters = [{
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  }, {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }, {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }];
// ===========================================================

// ROUTES
// default route
app.get("/", function(request, response) {
    // response.send("May the 4th be with you")
    response.sendFile(path.join(__dirname, "index.html"));

});

// API route - displays all characters
app.get("/api/characters", function(request, response) {
    return response.json(characters);
});

// route for one character or "no character"
app.get("/api/characters/:forceuser", function(request, response) {
    // when incorporating SQL, will need to connect to DB and make a sequelize call to get character data
    let charName = request.params.forceuser;

    for (var i = 0; i < characters.length; i++) {
        if (charName === characters[i].routeName) {
            return response.json(characters[i]);
        }
    }
    return response.send("Character not found");
});

// CREATE NEW CHARACTERS
app.post("/api/characters", function(request, response) {
    let newCharacter = request.body;
    // console.log(newCharacter);

    // add to array
    characters.push(newCharacter);

    // return new character back to user
    response.json(newCharacter);
});

// LISTENER
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT);
});

