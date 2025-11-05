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

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${myAPI}&units=metric`

    try {
        const response = await fetch(URL);
        const finalData = await response.json();

        cityName.textContent = finalData.name;
        cityCondition.textContent = finalData.weather[0].main;
        cityTemp.textContent = `${parseFloat(finalData.main.temp.toFixed(1))}°C`;
        cityHumidity.textContent = finalData.main.humidity + "%";
        cityWind.textContent = finalData.wind.speed + "  m/s";
        cityConditionSVG.innerHTML = getSVG(finalData.weather[0].main);
        getFiveDayForecast(inputValue);

    }
    catch (err) {
        console.error("Error fetching Weather", err);
        alert("Something went wrong while fetching data.");
        return 0;
    }

    searchBar.value = "";
}

async function getFiveDayForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=60be50dd75f4feb87fa97509ee740d69&units=metric`;
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
    }
}

function getDayName(date) {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "short"
    });
}

function getSVG(condition) {
    return weatherSVG[condition] || weatherSVG["Mist"];
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