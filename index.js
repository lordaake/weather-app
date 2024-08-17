const weeklyWeatherDiv = document.getElementById("weekly-weather")
const changeWeatherBtn = document.getElementById("change-weather-btn")
const weatherDescriptionDiv = document.getElementById("weather-description")
const weatherIconImg = document.getElementById("weather-icon")
const weatherDegreesDiv = document.getElementById("degrees-today")

const apiKey = "c2b7548e6607eb5d6474917207d3ea58"
const cityId = 3160881

const apiBase = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`
const hourlyForecastApi = `api.openweathermap.org/data/2.5/forecast?lat={67.279999}&lon={14.40501}&appid=${apiKey}`

const todaysWeather = () => {
    fetch(apiBase, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            const weatherArray = data.weather
            const weatherDescription = weatherArray[0].description
            const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherArray[0].icon}@2x.png`

            const convertedTemp = Math.round(data.main.feels_like - 273.15)

            weatherDescriptionDiv.innerText = `${weatherDescription}`
            weatherDegreesDiv.innerHTML = `${convertedTemp}<span class="text-xs align-super">o</span>`
            weatherIconImg.src = `${weatherIconUrl}`
        })
        .catch(error => {
            console.error("Error", error)
        });
}

function randomDegrees() {
    let degreesOutput = 0
    for (let i = 0; 7 > i; i++) {
        const randomDegrees = Math.floor(Math.random() * 25);
        degreesOutput = randomDegrees
    }

    return `${degreesOutput}<span class="text-xs align-super">o</span>`
}

function fillWeeklyWeather() {
    const weeklyWeatherArray = [
        { day: "Monday", degrees: randomDegrees() },
        { day: "Tuesday", degrees: randomDegrees() },
        { day: "Wednesday", degrees: randomDegrees() },
        { day: "Thursday", degrees: randomDegrees() },
        { day: "Friday", degrees: randomDegrees() },
        { day: "Saturday", degrees: randomDegrees() },
        { day: "Sunday", degrees: randomDegrees() },
    ]
    const weatherIconArray = ["fa-sun", "fa-cloud", "fa-cloud-sun", "fa-cloud-showers-heavy", "fa-bolt", "fa-snowflake", "fa-wind", "fa-smog"]
    let html = ""

    const addWeeklyWeather = () => {
        weeklyWeatherArray.forEach((day) => {
            const randomIndex = Math.floor(Math.random() * weatherIconArray.length);
            const randomWeatherIcon = weatherIconArray[randomIndex]

            html += `
                        <div class="grid grid-cols-2 w-50 m-auto">
                        <div class="w-20">
                            <p class="text-start text-gray-500">${day.day}</p>
                        </div>
                            <div class="flex flex-row justiy-end items-center pl-8">
                                <p class="flex justify-end text-end text-gray-600 font-semibold w-8">${day.degrees}</p>
                                <i class="fas ${randomWeatherIcon} text-black w-6 justify-end flex" id="weather-icon-weekly"></i>
                            </div>
                        </div>
                `
        })
        weeklyWeatherDiv.innerHTML = html
    }

    addWeeklyWeather()
    todaysWeather();
}

changeWeatherBtn.addEventListener("click", function () {
    fillWeeklyWeather()
})

fillWeeklyWeather();