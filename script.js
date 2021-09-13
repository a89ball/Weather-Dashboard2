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
        // console.log(event.target.getAttribute('value'));
        cityName = event.target.getAttribute("value");
        console.log(cityName);
        apiCall(cityName);
        renderInputs();
        $cityName.val("");
    });