//API keys
const WeatherURL = "https://api.openweathermap.org";
const WeatherKey = "d649dbc7935a0994373059b2dbf6bed6"




//inputs from HTML

let inputSearch = $("#search-input")
let inputForm = $("#search-form")


function fetchLocation(){
  let 

}

function submitInputForm(event){

  event.preventDefault();
  let search = inputSearch.val().trim();

  fetchLocation(search);


}

inputForm.on("submit", submitInputForm);







