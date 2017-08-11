// REQUIRED PACKAGES
var path = require("path");

// EXPORT HTML MODULE FOR USE IN MAIN SERVER.JS
module.exports = function(app) {

	// ROUTE TO HOME HTML PAGE - using "GET"
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/index.html"));
	});
	
}// close module export