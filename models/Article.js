
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

		summary: {
			type: String
		},

		link: {
			type: String,
			required: true,
			default: "/"
		},

		createdAt: {
			type: Date,
			default: Date.now
		},

		saved: {
			type: Boolean,
			default: false
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




