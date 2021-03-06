// REQUIRED PACKAGES & SCRAPING TOOLS
var request = require("request");
var cheerio = require("cheerio");

// REQUIRED MODELS
var Note = require("../models/Comment.js");
var Article = require("../models/Article.js");

// EXPORT API MODLE FOR USE IN MAIN SERVER.JS
module.exports = function(app) {

// GET ROUTE - scrape CNN website
app.get("/scrape", function(req, res) {

	request("http://www.cnn.com/world", function (error, response, html) {

		// Load HTML into cheerio var
		var $ = cheerio.load(html);

		// Grab Article Title (h3)
		$("h3.cd__headline").each(function(i, element) {

			var result = {};

			// Push article title & link into result array
			result.title = $(this).children("a").text();
			result.link = $(this).children("a").attr("href");

			console.log("RESULT: ", result);

			// Create new item in Article Model/Table (i.e. push "result" var into Article Model)
			var entry = new Article(result);

			// Save new entry to mongodb
			entry.save(function(err, doc) {

				if (err) {
					console.log("ERROR SAVING TO DB: ", err);
				}
				else {
					console.log("NEW ENTRY SAVED: ", doc);
				}

			});// close DB save function
		})// close grab h3 func/
	})// close request function

	// Send scraped test to browser
	res.send("SCRAPE COMPLETE");

})// close GET route



// DISPLAY SAVED ARTICLES IN MongoDB
app.get("/articles", function(req, res) {

	Article.find({}, function(error, doc) {

		if (error) {
			console.log("ERROR FINDING ARTICLES: ", error);
		}
		else {
			console.log("ARTICLES PULLED FROM DB");
			res.json(doc);
		}
	});// close findAll funct
});// close GET saved articles func


// GET ARTICLE BY ObjectID
app.get("/articles/:id", function(req, res) {

	Article.findOne({"_id": req.params.id})

	// Include notes paired w/ Articles
	.populate("note")

	// Execute DB query
	.exec(function(error, doc) {
		if(error) {
			console.log("ERROR w/ DB QUERY: ", error);
		}
		else {
			console.log("DB QUERY SUCCESS");
			res.json(doc);
		}
	});// close DB query func
});// close GET 1 article func

// CREATE NEW USER NOTE PAIRED TO ARTICLE
app.post("/articles/:id", function(req, res) {

	// Create var for new note text entered
	var newNote = new Note(req.body);

	// Save Note to MongoDB
	newNote.save(function(error, doc) {

		if(error) {
			console.log("ERROR SAVING NOTE: ", error);
		}
		else {

			// Use article ID to find & update w/ new note
			Article.findOneAndUpdate({"_id": req.params.id}, {"note": doc._id})

			// Execute DB query
			.exec(function(error, doc) {
				if(error) {
					console.log("ERROR w/ DB QUERY: ", error);
				}
				else {
					console.log("DB QUERY SUCCESS");
					res.send(doc);
				}
			});// close execute save query
		}// close else state	
	});// close newNote save funct
});// close note POST funct
}// close export funct
