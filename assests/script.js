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


function renderCurrent(city, weatherInput) {
  let date = moment().format("D/M/YYYY");
  let tempurtureC = weatherInput["main"]["temp"];
  let windSpeed = weatherInput["wind"]["speed"];
  let humidity = weatherInput["main"]["humidity"];
  let today = $("#today");

  let icon = `https://api.openweathermap.org/img/w/${weatherInput.weather[0].icon}.png`;

  let iconDis = weatherInput.weather[0].description || weatherInput[0].main

  let temp = $("<p>")
  let wind = $("<p>")
  let weatherIcon = $("<img>")
  let humidityEl = $("<p>") 
  let card = $("<div>")
  let cardMain = $("<div>")
  let header = $("<h2>")

card.attr("class", "card");

cardMain.attr("class", "card-body");

card.append(cardMain);

header.attr("class", "h3 card-title")
temp.attr("class", "card-text")
wind.attr("class", "card-text")
humidityEl.attr("class", "card-text");

header.text(`${city} (${date})`)
weatherIcon.attr("src", icon);
weatherIcon.attr("alt", iconDis);

header.append(weatherIcon);
temp.text(`Temp ${tempurtureC} C`);
wind.text(`Wind ${windSpeed} KPH`);
humidityEl.text(`Humidity ${humidity} %`);
cardMain.append(header, temp, wind, humidityEl);

today.html("");
today.append(card);
}


function pullWeather(location){
  let latitude  = location.lat;
  let longitude = location.lon;

  let city = location.name;

  let qureyWeatherURL = `${WeatherURL}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${WeatherKey}`;

  console.log(qureyWeatherURL)

  $.ajax({
    url: qureyWeatherURL,
    method: "GET"
  }).then(function(response){
    renderCurrent(city, response.list[0]);
    //renderForecast(data.list);
  })

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
