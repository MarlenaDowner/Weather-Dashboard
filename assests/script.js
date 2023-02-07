//API keys
const WeatherURL = "https://api.openweathermap.org";
const WeatherKey = "d649dbc7935a0994373059b2dbf6bed6";

//inputs from HTML

let inputSearch = $("#search-input")
let inputForm = $("#search-form")


function fetchLocation(search){ //this is grabbing the value fetchLocation(search); at bottom
  let queryURL = `${WeatherURL}/geo/1.0/direct?q=${search}&limit=5&appid=${WeatherKey}`;
  console.log(queryURL);

  //pulling request
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

 // Log the queryURL
 console.log(queryURL);

 // Log the resulting object
 console.log(response);

})}

function submitInputForm(event){

  event.preventDefault();
  let search = inputSearch.val().trim();

  fetchLocation(search);

}

inputForm.on("submit", submitInputForm);



