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

 var displayWeather = function (data, city) {
    var currentWeatherEl = document.querySelector("#current-weather");
    currentWeatherEl.innerHTML = data.daily
        .map((day, idx) => {
            if (idx <= 0) {
                var dt = new Date(day.dt * 1000);
                return `<div class="col">
            <div class="card border-0" style="width: 
            30vw">
                <h5 class="card-title p-2">${dt.toDateString()}</h5>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon
                    }@2x.png" class="card-img-top"
                    alt="${day.weather[0].description}" />
                <div class="card-body">
                    <h3 class="card-title">${day.weather[0].main}</h3>
                    <p class="card-text">Temp: ${day.temp.day} \u00B0F</p>
                    <p class="card-text">Wind: ${day.wind_speed} m/s</p>
                    <p class="card-text">Humidity: ${day.humidity} %</p>
                    <p class="card-text">UV index: ${day.uvi}</p>
                </div>
            </div>
        </div>`
            }
        });

 }

 var getFiveDay = function (data) {
    var fiveDayContainerEl = document.querySelector("#five-day-container");
    fiveDayContainerEl.innerHTML = data.daily
        .map((day, idx) => {
            if (idx <= 4) {
                var dt = new Date(day.dt * 1000);
                return `<div class="col">
    <div class="card text-white five-day-card h-100" style="width: 10vw">
        <h5 class="card-title p-2">${dt.toDateString()}</h5>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon
                    }@4x.png" class="card-img-top"
            alt=""${day.weather[0].description}" />
        <div class="card-body">
            <h3 class="card-title"> ${day.weather[0].main}</h3>
            <p class="card-text">Temp: ${day.temp.day} \u00B0F</p>
            <p class="card-text">Wind: ${day.wind_speed} m/s</p>
            <p class="card-text">Humidity: ${day.humidity} %</p>
        </div>
    </div>
</div>`;
            }
        })
        .join("");
    console.log(fiveDayContainerEl);
 }

 var saveSearch = function (city) {
    var searchItem = city;

    searchHistory.push(searchItem);
      
    localStorage.setItem("search", JSON.stringify(searchHistory));
    console.log(searchItem);
    pastSearch();

 }

 var pastSearch = function () {
    historyEl.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
        var historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control d-block bg-gray w-75 mt-1 md-1");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function (event) {
            console.log(event.target.value);
            fiveDayContainerEl.innerHTML = "";
            currentWeatherEl.innerHTML = "";
            city = event.target.value;
            getCity(city);
        })
        historyEl.appendChild(historyItem);
    }
 }

 // add event listeners