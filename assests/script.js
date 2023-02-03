//API keys
var APIKey = "d649dbc7935a0994373059b2dbf6bed6";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=Bujumbura,Burundi&appid=" + APIKey;

// Event listener for all button elements
$("button").on("click", function() {})

 // In this case, the "this" keyword refers to the "search-button" that was clicked
var search = $(this).attr("search-button");

//pulling request
$.ajax({
    url: queryURL,
    method: "GET"
  })
  
.then(function(response) {

 // Log the queryURL
 console.log(queryURL);

 // Log the resulting object
 console.log(response);

});
