// Written by John R. Thurlby May 2018

const express = require("express"), 
      bodyParser = require("body-parser")

var PORT = process.env.PORT || 8080

var app = express()

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Set Handlebars.
var exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

var db = require("./models");
require("./routes/api-routes.js")(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
