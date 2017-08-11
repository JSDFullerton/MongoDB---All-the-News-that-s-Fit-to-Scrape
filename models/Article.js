
// REQUIRED PACKAGES
	
	// Mongoose NPM
	var mongoose = require("mongoose");

	// Create Schema
	var Schema = mongoose.Schema;

	// Create article Schema
	var ArticleSchema = new Schema({

		title: {
			type: String,
			required: true
		},

		link: {
			type: String,
			required: true
		},

		// Save note's ObjID, refer to Note Model
		note: {
			type: Schema.Types.ObjectId,
			ref: "Note"
		}
	});// close ArticleSchema var


// CREATE Article MODEL w/ ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);


// EXPORT MODEL
module.exports = Article;