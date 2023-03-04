var cities = [];
 var cityFormEl = document.querySelector("#city-form")
 var cityInputEl = document.querySelector("#city");
 var searchButtonEl = document.querySelector("#search-btn");
 var weatherContainerEl = document.querySelector("#weather-container");
 var fiveDayContainerEl = document.querySelector("#five-day-container");

 var apiKey = [];

 var formSubmit = function (event) {
    var city = cityInputEl.ariaValueMax.trim();

    if (city) {
        getCity(city);
        getFiveDaye(city);

        //clears old content
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
    saveSearch();
    pastSearch(city);
 }

 var getCity = function (city) {
    //fetch api
 }

 var displayWeather = function () {
    fiveDayContainerEl.textContent = "";
    weatherContainerEl.textContent = "";
 }

 var saveSearch = function () {
    // save search
 }

 var pastSearch = function () {
    //local storage for past searches
 }

 // add event listeners