

// REQUIRED PACKAGES

	// Mongoose NPM
	var mongoose = require("mongoose");

	// Create Schema
	var Schema = mongoose.Schema;

	// Create Comment Schema
	var CommentSchema = new Schema({

		title: {
			type: String
		},

		body: {
			type: String
		},

		createdAt: {
			type: Date,
			default: Date.now
		}
	});// close CommentSchema var


// CREATE Comment MODEL in MongoDB w/ CommentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// EXPORT Comment MODEL
module.exports = Comment;
