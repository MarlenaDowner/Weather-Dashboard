 // In this case, the "this" keyword refers to the "search-button" that was clicked
//  var search = $(this).attr("search-button");

//inputs from HTML

let inputSearch = $("#search-input")
let inputForm = $("#search-form")

function submitInputForm(event){

  event.preventDefault();


  alert(inputSearch.val().trim());
}

inputForm.on("submit", submitInputForm);




//API keys
const WeatherURL = "https://api.openweathermap.org";
const WeatherKey = "d649dbc7935a0994373059b2dbf6bed6"


