
// REQUIRED PACKAGES
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


// REQUIRED MODELS
var Note = require("./models/Comment.js");
var Article = require("./models/Article.js");

// REQUIRED SCRAPING TOOLS
var request = require("request");
var cheerio = require("cheerio");

// MONGOOSE SCRAPING TOOL
mongoose.Promise = Promise;

// START EXPRESS
var app = express();

// ACTIVATE MORGAN & BODY PARSER
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// STATIC PUBLIC DIRECTORY for HTML
app.use(express.static("public"));

// MONGOOSE DATABASE CONNECTION
mongoose.connect("mongodb://localhost/news-scrapingDB");
var db = mongoose.connection;

	// SHOW DB CONNECTION ERRORS
	db.on("error", function(error) {
  		console.log("Mongoose Error: ", error);
	});

	// DB CONNECTION SUCCESS
	db.once("open", function() {
  		console.log("Mongoose connection successful.");
	});


// ROUTES
require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);




// ACTIVATE SERVER
var port = 3000
app.listen(port, function() {
	console.log("SERVER LISTENING on: " + port);
});



















