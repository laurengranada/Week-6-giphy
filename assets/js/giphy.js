//js loads when page loads
$(document).ready(function(){
	populateButtons(topics, 'celeb-button', '#celeb-buttons');
	console.log("test");
});

// listing my array of topics - celebrities
	var topics = ["Emma Stone", "Chris Pratt", "Amy Poehler", "Will Ferrell", "Kristen Wiig", "Steve Carell", "Kim Kardashian", "John Krasinski", "Kanye", "Britney Spears", "James Cordon", "Tyra Banks", 
			"Jennifer Lawrence", "Miley Cyrus", "Ben Stiller", "Tom Hiddleston", "Justin Timberlake", "Jonah Hill"];

// function that populates and appends buttons
function populateButtons(topics, classToAdd, areaToAddTo){
	$(areaToAddTo).empty();
	for(var i=0; i<topics.length; i++){
		var a = $('<button>');
		a.addClass(classToAdd);
		a.attr('data-type', topics[i]);
		a.text(topics[i]);
		$(areaToAddTo).append(a);
	}
};


$(document).on('click','.celeb-button', function(){
	$('#gif-here').empty();
	var type = $(this).data('type');
	var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=dc6zaTOxFJmzC&limit=10'; 
    // // ajax request
	$.ajax({url:queryURL, method:'GET'})
		.done(function(response){
			console.log(response);
			for(var i = 0; i<response.data.length; i++){
				var celebDiv = $('<div class=\"celeb-item\">');
				var rating = response.data[i].rating;
				var p = $('<p class="neon-1">').text('Rating: ' +rating);
				var animated = response.data[i].images.fixed_height.url;
				var still = response.data[i].images.fixed_height_still.url;
				var image = $('<img>');
				image.attr('src', still);
				image.attr('data-still', still);
				image.attr('data-animated', animated);
				image.attr('data-state', 'still');
				image.addClass('celebImage');
				celebDiv.append(p);
				celebDiv.append(image);
				$('#gif-here').append(celebDiv);
			}
		})

;

$(document).on('click', '.celebImage', function(){
	var state = $(this).attr('data-state');
	if(state == 'still'){
		$(this).attr('src', $(this).data('animated'));
		$(this).attr('data-state', 'animated');
	} else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}
})

$('#add-celeb').on('click', function(){
	var newCeleb = $('input').eq(0).val();
	topics.push(newCeleb);
	populateButtons(topics,'celeb-button', '#celeb-buttons');
	return false;
})

})
