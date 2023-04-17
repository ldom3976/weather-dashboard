var cities = [];
 var cityFormEl = document.querySelector("#city-form")
 var cityInputEl = document.querySelector("#city");
 var searchButtonEl = document.querySelector("#search-btn");
 var weatherContainerEl = document.querySelector("#weather-container");
 var currentWeatherEl = document.querySelector("#current-weather");
 var fiveDayContainerEl = document.querySelector("#five-day-container");
 var headerContainerEl = document.querySelector("header-container");
 var city = [];

 var apiKey = "c9495534c42d51955c234e09ba782764";

 var formSubmit = function (event) {
    //prevents page from refreshing
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCity(city);
        //getFiveDay(city);

        //clears old content
        cityInputEl.value = "";
    } else {
        alert("Please enter a city.");
    }
    saveSearch(city);
    pastSearch(city);
 }

 var getCity = function (city) {
    //fetch api

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);


                });

            } else {
                alert("Error: " + response.statusText);
                getCity();
            }
        })
        .catch(function (error) {
            alert("Cannot connect to OpenWeather");
        });
 }

 var getDaily = function (data) {
    var lat = data.coord.lat
    var lon = data.coord.lon

    console.log(lat);
    console.log(lon);

    var apiUrlCoord = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    fetch(apiUrlCoord)

    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                getFiveDay(data);
                console.log(data.daily)
                displayWeather(data);
            });
        } else {
            alert("Error: " + response.statusText);
        
        }
    })

    .catch(function (error) {
        alert("Cannot connect to OpenWeather.");
    });
 }

 var displayWeather = function () {
    fiveDayContainerEl.textContent = "";
    weatherContainerEl.textContent = "";
 }

 var getFiveDay = function () {
    //five day function goes here
 }

 var saveSearch = function () {
    // save search
 }

 var pastSearch = function () {
    //local storage for past searches
 }

 // add event listeners