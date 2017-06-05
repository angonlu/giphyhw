var topics = ["acura", "bmw", "chevrolet", "datsun", "dodge", "fiat", "honda", "mazda", "lexus", "renault", "mitsubishi", "subaru", "nissan", "volkswagen", "volvo", "suzuki", "jeep", "ford", "toyota", "saab"];


function renderBtns() {
	$("#topics").empty();
for (var i = 0;i < topics.length; i++) {
	var btns = $("<button>");

	btns.addClass("brands btn btn-lg");

	btns.attr("data-name", topics[i]);

	btns.text(topics[i]);

	$("#topics").append(btns);

}
};

function displayGifs() {

var btnValue = $(this).attr("data-name");
// The GIPHY API
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnValue +
"&api_key=dc6zaTOxFJmzC&limit=10"

	$.ajax({
		url: queryURL,
		method: "GET" })

	.done(function(response){
		// console.log(queryURL);
		console.log(response);

		var results = response.data;

		for (var i = 0; i < results.length; i++) {

			var brandDiv = $("<div>");

			brandDiv.addClass("results");

			var p = $("<p>").text("Rating: " + results[i].rating);

			var brandImage = $("<img>");
			brandImage.attr("src", results[i].images.fixed_height.url);
			brandImage.attr("data-still", results[i].images.fixed_height_still.url);
			brandImage.attr("data-animate", results[i].images.fixed_height.url);
			brandImage.attr("data-state", "animate");
			brandImage.addClass("gif");

			brandDiv.append(p);
			brandDiv.append(brandImage);
			brandDiv.addClass("imgdiv")

			$("#images").prepend(brandDiv);
			$(".gif").click(function() {
				var state = $(this).attr("data-state");
				if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate")
			}	else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still")
			}
			});

		}
	})
};
			
$("#newbrand").click(function(event){
			event.preventDefault();
			var newBrand = $("#newinput").val().trim();
			topics.push(newBrand);
			console.log(topics);
			renderBtns();
		})

renderBtns();
$("#jumbo").hide().fadeIn(1500);
$("#topics").hide().fadeIn(1500);

$(document).on("click", ".brands", displayGifs);


