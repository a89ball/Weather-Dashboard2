$(document).ready(function () {
    let userInputs = [];
    const $cityName = $("#search-box");
    const APIKey = "e72b1512a96a15828d146af29009e625";

    moment();

    init();


    function storeInput() {
        userInputs = JSON.parse(localStorage.getItem("userInput")) || [];
        let set = new Set(userInputs);
        set.add(cityName);
        const toArr = Array.from(set);
        localStorage.setItem("userInput", JSON.stringify(toArr));
    }


    function renderInputs() {
        if (localStorage.getItem("userInput")) {
            $(".history").empty();
            userInputs = [];
            const savedInputs = JSON.parse(localStorage.getItem("userInput"));
            userInputs.push(...savedInputs);
            userInputs.forEach(function (cityName) {
                const userInput = $("<li>");
                userInput.text(cityName);
                userInput.addClass("list-group-item");
                userInput.attr("value", cityName);
                $(".history").append(userInput);
            });
        } else {
            console.log("No stored cities");
        }
    }


    function init() {
        if (localStorage.getItem("userInput")) {
            const savedInputs = JSON.parse(localStorage.getItem("userInput"));
            userInputs.push(...savedInputs);
            console.log(userInputs);
            cityName = userInputs[userInputs.length - 1];
        } else {
            cityName = "London";
        }
        apiCall(cityName);
        renderInputs();
    }

    $(".list-group").click(function (event) {
        cityName = event.target.getAttribute("value");
        console.log(cityName);
        apiCall(cityName);
        renderInputs();
        $cityName.val("");
    });

    $("#search-button").click(function () {
        event.preventDefault();
        cityName = $cityName.val();
        apiCall(cityName);
        storeInput();
        renderInputs();
        $cityName.val("");
    });

    function apiCall(cityName) {
        const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;
        const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`;

        $.ajax({
            url: cityURL,
            method: "GET",
        }).then(function (cityData) {
            console.log(cityData);
            const iconCode = cityData.weather[0].icon;
            const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;
            const lat = cityData.coord.lat;
            const lon = cityData.coord.lon;
            const uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`;
