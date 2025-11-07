const leftButton = document.querySelector(".leftButton button");
const rightButton = document.querySelector(".rightButton button");
const hourlyForecast = document.querySelector(".hourlyForecast ul");
const searchBar = document.querySelector(".contentBox .left-main .searchBar .searchElements input");
const searchBtn = document.querySelector(".contentBox .left-main .searchBar .searchElements button");
const myAPI = "60be50dd75f4feb87fa97509ee740d69";
const cityName = document.querySelector(".contentBox .left-main .weatherContainer header");
const cityConditionSVG = document.querySelector(".contentBox .left-main .weatherContainer .icon");
const cityCondition = document.querySelector(".contentBox .left-main .weatherContainer .condition");
const cityTemp = document.querySelector(".contentBox .left-main .weatherContainer .temp");
const cityHumidity = document.querySelector(".contentBox .left-main .weatherContainer .otherInfo .humidity .name span");
const cityWind = document.querySelector(".contentBox .left-main .weatherContainer .otherInfo .wind .name span");
const nextFiveDays = document.querySelectorAll(".contentBox .right-main ul li .day");
const nextFiveDayMinTemp = document.querySelectorAll(".contentBox .right-main ul li .minTemp span");
const nextFiveDayMaxTemp = document.querySelectorAll(".contentBox .right-main ul li .maxTemp span");
const nextFiveDaysSVG = document.querySelectorAll(".contentBox .right-main ul li .icon");
const hourlySectionList = document.querySelectorAll(".hourlyForecast ul li");
const hourlyWeather = document.querySelectorAll(".hourlyForecast ul li .icon");
const hourlyTemp = document.querySelectorAll(".hourlyForecast ul li .temp");
const hourlyTime = document.querySelectorAll(".hourlyForecast ul li .time");
const unitChangerBtn = document.querySelector(".unitChanger button");
const aqiSection = document.querySelector(".aqiSection");
const aqiValue = document.querySelector(".aqiSection header span");
const aqiCondition = document.querySelector(".aqiSection.good header condition");
const PM2 = document.querySelector(".aqiSection .pm .aqiLeft .readings");
const PM10 = document.querySelector(".aqiSection .pm .aqiRight .readings");
const myToken = "44e3855787e631852fabe8c8022fb88d4ae92933";


const weatherSVG = {
    Clear: `
   <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="4"/>
  <path d="M12 2v2"/>
  <path d="M12 20v2"/>
  <path d="m4.93 4.93 1.41 1.41"/>
  <path d="m17.66 17.66 1.41 1.41"/>
  <path d="M2 12h2"/>
  <path d="M20 12h2"/>
  <path d="m6.34 17.66-1.41 1.41"/>
  <path d="m19.07 4.93-1.41 1.41"/>
</svg>
    `,

    Clouds: `
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
</svg>
    `,

    Rain: `
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
  <path d="M16 14v6"/>
  <path d="M8 14v6"/>
  <path d="M12 16v6"/>
</svg>
    `,

    Drizzle: `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
  <path d="M8 19v1"/>
  <path d="M8 14v1"/>
  <path d="M16 19v1"/>
  <path d="M16 14v1"/>
  <path d="M12 21v1"/>
  <path d="M12 16v1"/>
</svg>
    `,

    Thunderstorm: `
 <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/>
  <path d="m13 12-3 5h4l-3 5"/>
</svg>
    `,

    Snow: `
   <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
  <path d="M8 15h.01"/>
  <path d="M8 19h.01"/>
  <path d="M12 17h.01"/>
  <path d="M12 21h.01"/>
  <path d="M16 15h.01"/>
  <path d="M16 19h.01"/>
</svg>


    `,

    Mist: `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
  <path d="M16 17H7"/>
  <path d="M17 21H9"/>
</svg>

    `
};

async function getTodaysWeather() {
    const inputValue = searchBar.value.trim().toLowerCase();

    if (!inputValue) {
        alert("Please enter a City!");
        return 0;
    }

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(inputValue)}&appid=${myAPI}&units=metric`

    try {
        const response = await fetch(URL);
        const finalData = await response.json();

        cityName.textContent = finalData.name;
        cityCondition.textContent = finalData.weather[0].main;
        cityTemp.textContent = `${parseFloat(finalData.main.temp.toFixed(1))}°C`;
        cityTemp.dataset.celsius = parseFloat(finalData.main.temp.toFixed(1));
        cityHumidity.textContent = finalData.main.humidity + "%";
        cityWind.textContent = finalData.wind.speed + "  m/s";
        cityConditionSVG.innerHTML = getSVG(finalData.weather[0].main);
        getFiveDayForecast(inputValue);
        getAQI(inputValue);

    }
    catch (err) {
        console.error("Error fetching Weather", err);
        alert("Something went wrong while fetching data.");
        return 0;
    }

    searchBar.value = "";
}

async function getFiveDayForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=60be50dd75f4feb87fa97509ee740d69&units=metric`;
    const response = await fetch(url);
    const FinalData = await response.json();

    // extract 5-day forecast
    const fiveDays = FinalData.list.filter(i => i.dt_txt.includes("12:00:00"));
    // console.log(fiveDays);

    for (let i = 0; i < 5; i++) {
        nextFiveDays[i].textContent = getDayName(fiveDays[i].dt_txt);
        nextFiveDaysSVG[i].innerHTML = getSVG(fiveDays[i].weather[0].main);
        nextFiveDayMinTemp[i].textContent = parseFloat(fiveDays[i].main.temp_min.toFixed(1)) + "°C";
        nextFiveDayMaxTemp[i].textContent = parseFloat(fiveDays[i].main.temp_max.toFixed(1)) + "°C";
        nextFiveDayMinTemp[i].dataset.celsius = parseFloat(fiveDays[i].main.temp_min.toFixed(1));
        nextFiveDayMaxTemp[i].dataset.celsius = parseFloat(fiveDays[i].main.temp_max.toFixed(1));
    }

    getHourlyWeather(FinalData);
}

function getDayName(date) {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "short"
    });
}

function getSVG(condition) {
    return weatherSVG[condition] || weatherSVG["Mist"];
}

async function getHourlyWeather(finalData) {
    const hourlyData = finalData.list.slice(0, 13);
    for (let i = 0; i < hourlyData.length; i++) {
        hourlyWeather[i].innerHTML = getSVG(finalData.list[i].weather[0].main);
        hourlyTime[i].textContent = new Date(hourlyData[i].dt_txt)
            .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
        hourlyTemp[i].textContent = parseFloat(finalData.list[i].main.temp.toFixed(1)) + "°C";
        hourlyTemp[i].dataset.celsius = parseFloat(finalData.list[i].main.temp.toFixed(1));
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const inputValue = "New Delhi";

    if (!inputValue) {
        alert("Please enter a City!");
        return 0;
    }

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(inputValue)}&appid=${myAPI}&units=metric`

    try {
        const response = await fetch(URL);
        const finalData = await response.json();

        cityName.textContent = finalData.name;
        cityCondition.textContent = finalData.weather[0].main;
        cityTemp.textContent = `${parseFloat(finalData.main.temp.toFixed(1))}°C`;
        cityTemp.dataset.celsius = parseFloat(finalData.main.temp.toFixed(1));
        cityHumidity.textContent = finalData.main.humidity + "%";
        cityWind.textContent = finalData.wind.speed + "  m/s";
        cityConditionSVG.innerHTML = getSVG(finalData.weather[0].main);
        getFiveDayForecast(inputValue);
        getAQI(inputValue);

    }
    catch (err) {
        console.error("Error fetching Weather", err);
        alert("Something went wrong while fetching data.");
        return 0;
    }

    searchBar.value = "";
    window.scrollTo(0, 0);
});

unitChangerBtn.addEventListener("click", () => {
    if (unitChangerBtn.textContent === "°C") {
        unitChangerBtn.textContent = "°F";
        convertTemp(cityTemp, "C");
        for (let i = 0; i < nextFiveDayMaxTemp.length; i++) {
            convertTemp(nextFiveDayMaxTemp[i], "C");
        }
        for (let i = 0; i < nextFiveDayMinTemp.length; i++) {
            convertTemp(nextFiveDayMinTemp[i], "C");
        }
        for (let i = 0; i < 13; i++) {
            convertTemp(hourlyTemp[i], "C");
        }

    } else {
        unitChangerBtn.textContent = "°C";
        convertTemp(cityTemp, "F");
        for (let i = 0; i < nextFiveDayMaxTemp.length; i++) {
            convertTemp(nextFiveDayMaxTemp[i], "F");
        }
        for (let i = 0; i < nextFiveDayMinTemp.length; i++) {
            convertTemp(nextFiveDayMinTemp[i], "F");
        }
        for (let i = 0; i < 13; i++) {
            convertTemp(hourlyTemp[i], "F");
        }
    }
});

function convertTemp(element, toUnit) {
    const celsiusValue = parseFloat(element.dataset.celsius);

    if (toUnit === "F") {
        const fahrenheit = (celsiusValue * 9 / 5) + 32;
        element.textContent = `${parseFloat(fahrenheit.toFixed(1))}°F`;
    }
    else {
        element.textContent = `${parseFloat(celsiusValue.toFixed(1))}°C`;
    }
}

searchBtn.addEventListener("click", () => {
    getTodaysWeather();
});

hourlyForecast.addEventListener("mouseenter", () => {
    leftButton.style.visibility = "visible";
    rightButton.style.visibility = "visible";
    leftButton.style.opacity = "1";
    rightButton.style.opacity = "1";
});

hourlyForecast.addEventListener("mouseleave", () => {
    leftButton.style.visibility = "hidden";
    rightButton.style.visibility = "hidden";
    leftButton.style.opacity = "0";
    rightButton.style.opacity = "0";
});

leftButton.addEventListener("mouseenter", () => {
    leftButton.style.visibility = "visible";
    rightButton.style.visibility = "visible";
    leftButton.style.opacity = "1";
    rightButton.style.opacity = "1";
});

leftButton.addEventListener("mouseleave", () => {
    leftButton.style.visibility = "hidden";
    rightButton.style.visibility = "hidden";
    leftButton.style.opacity = "0";
    rightButton.style.opacity = "0";
});

rightButton.addEventListener("mouseenter", () => {
    leftButton.style.visibility = "visible";
    rightButton.style.visibility = "visible";
    leftButton.style.opacity = "1";
    rightButton.style.opacity = "1";
});

rightButton.addEventListener("mouseleave", () => {
    leftButton.style.visibility = "hidden";
    rightButton.style.visibility = "hidden";
    leftButton.style.opacity = "0";
    rightButton.style.opacity = "0";
});

leftButton.addEventListener("click", () => {
    hourlyForecast.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

rightButton.addEventListener("click", () => {
    hourlyForecast.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

if (window.matchMedia("(max-width: 576px)").matches) {

    let isDown = false;
    let startX;
    let scrollLeft;

    hourlyForecast.addEventListener("touchstart", (e) => {
        isDown = true;
        startX = e.touches[0].pageX - hourlyForecast.offsetLeft;
        scrollLeft = hourlyForecast.scrollLeft;
    });

    hourlyForecast.addEventListener("touchend", () => {
        isDown = false;
    });

    hourlyForecast.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - hourlyForecast.offsetLeft;
        const walk = (x - startX) * 1.3;
        hourlyForecast.scrollLeft = scrollLeft - walk;
    });

}

async function getAQI(city) {
    const URL = `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${myToken}`;

    const response = await fetch(URL);
    const finalData = await response.json();

    if (finalData.status !== "ok") return;

    const aqiVal = finalData.data.aqi;
    updateAQIClass(aqiVal);

    aqiValue.textContent = `AQI ${aqiVal}`;

    let pm25 = "-";
    let pm10 = "-";
    if (finalData.data.iaqi.pm25 && finalData.data.iaqi.pm25.v !== undefined) {
        pm25 = finalData.data.iaqi.pm25.v;
    }
    PM2.textContent = `${pm25} μg/m³`;

    if (finalData.data.iaqi.pm10 && finalData.data.iaqi.pm10.v !== undefined) {
        pm10 = finalData.data.iaqi.pm10.v;
    }
    PM10.textContent = `${pm10} μg/m³`;

}

const aqiClasses = ["good", "fair", "moderate", "poor", "veryPoor", "hazardous"];

async function updateAQIClass(aqiVal) {

    aqiSection.classList.remove(...aqiClasses);

    let aqiClass = "";

    if (aqiVal <= 50) aqiClass = "good";
    else if (aqiVal <= 100) aqiClass = "fair";
    else if (aqiVal <= 150) aqiClass = "moderate";
    else if (aqiVal <= 200) aqiClass = "poor";
    else if (aqiVal <= 300) aqiClass = "verypoor";
    else aqiClass = "hazardous";

    aqiSection.classList.add(aqiClass);

    if (aqiClass === "verypoor") {
        aqiCondition.textContent = "Very Poor";
    } 
    else {
        aqiCondition.textContent = aqiClass.charAt(0).toUpperCase() + aqiClass.slice(1);
    }
}