

// GET ARTICLES AS JSON
$.getJSON("/articles", function(data) {

	for (var i = 0; i < data.length; i++) {

	$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  
  }// close loop
});// close get articles func


// WHEN USER CLICKS on ARTICLES
$(document).on("click", "p", function() {

	// Empty Current Notes Section
	$("#notes").empt();

	// Save article ID
	var thisID = $(this).attr("data-id");

	// AJAX CALL TO Article Model
	$.ajax({

		method: "GET",
		url: "/articles/" + thisID

	});// close AJAX call

	// Add note info to page after AJAX complete
	.done(function(data) {

		console.log("NEW DATA: ", data);

		// Article title
		$("#notes").append("<h2>" + data.title + "</h2>");

		// Input to Enter New Title
		$("#notes").append("<input id='titleinput' name='title' >");

		// Add new note to body
		$("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

		// Button to submit new note
		$("#notes").append("<button data-id='" + data._id + "' id='saveNote'>Save Note</button>");


		// If Note Exisits w/ Article
		if (data.note) {

			// Append title of note
			$("#titleinput").val(data.note.title);

			// Append body of note
			$("#bodyinput").val(data.note.body);

		}// close if state
	});// close .done funct
});// close display note click func



// CLICK "SAVE NOTE" Button
$(document).on("click", "#saveNote", function() {

	// Get Article ID
	var thisID = $(this).attr("data-id");

	// AJAX POST Method to change Article Note in MongoDB
	$.ajax({

		method: "POST"
		url: "/articles/" + thisID,
		data: {

			// User Input for Title
			title: $("#titleinput").val(),

			// User Input for Comment
			body: $("#bodyinput").val(),
		}

	})// close AJAX POST func

	// Console Log New Comment when AJAX done
	.done(function(data) {

		console.log("New Comment: ", data);

		$("#notes").empty();

	});// close .done funct


	// Remove User Inputs for Comment Title & body
	$("#titleinput").val("");
	$("#bodyinput").val("");


});// close save note click funct












