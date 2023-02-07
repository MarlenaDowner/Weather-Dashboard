//API keys
const WeatherURL = "https://api.openweathermap.org";
const WeatherKey = "d649dbc7935a0994373059b2dbf6bed6";
let inputHistory = []

//inputs from HTML

let inputSearch = $("#search-input")
let inputForm = $("#search-form")
let inputSearchHistory  = $("#history")

function renderInputHistory(){
    inputSearchHistory.html("")

    for(let i = 0; i < inputHistory.length; i++){ //looping through the users input history
      let btn = $("<button>");
      btn.attr("type", "button")
      btn.addClass("history-btn btn-history")

      btn.attr("data-search", inputHistory [i])
      btn.text(inputHistory[i])//add the button of the appended to the page
      inputSearchHistory.append(btn)

  }
}

function appendInputHistory(search){ //thsi will do the valyes 
    if(inputHistory.indexOf(search) !== -1) { //if search bu user already appended OR if no search term return th index back
      return
    }
  inputHistory.push(search);  //adding to the search history

  localStorage.setItem("search-history", JSON.stringify(inputHistory)); //adding to local storage
  renderInputHistory() 
}

function pullWeather(location){
  let lat = location.lat;
  let long = location.lon;

  let city = location.name;

  let qureyWeatherURL = `${WeatherURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WeatherKey};`

  console.log(qureyWeatherURL)

}




function fetchLocation(search){ //this is grabbing the value fetchLocation(search); at bottom
  let queryURL = `${WeatherURL}/geo/1.0/direct?q=${search}&limit=5&appid=${WeatherKey}`;
  console.log(queryURL);

  //pulling request
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    if(!response[0]){ //if users input not correct
      alert("Location not found, try again")
    }else{
      appendInputHistory(search)
      pullWeather(response[0])

    }

//  // Log the queryURL
//  console.log(queryURL);

//  // Log the resulting object
//  console.log(response);

})}

function pullInputHistory(){
  let storedHistory = localStorage.getItem("search-history");

  if(storedHistory) {
    inputHistory = JSON.parse(storedHistory);
  }
  renderInputHistory()

}

function submitInputForm(event){

  event.preventDefault();
  let search = inputSearch.val().trim();

  fetchLocation(search);
  inputSearch.val("");


}

pullInputHistory()
inputForm.on("submit", submitInputForm);



