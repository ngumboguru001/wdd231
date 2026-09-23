// --- Navigation Menu Toggle ---
const menuButton = document.querySelector('#menu-button');
const menuList = document.querySelector('#menu-list');

if (menuButton && menuList) {
    menuButton.addEventListener('click', () => {
        menuList.classList.toggle('open');
        menuButton.textContent = menuList.classList.contains('open') ? 'X' : '☰';
    });
}

// --- Footer Dates ---
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modification: ${document.lastModified}`;

// --- Weather API Integration (OpenWeatherMap) ---
const apiKey = "dcc8ec1e1518e8eaf145955165bf144e";
const lat = -18.9281; // Kwekwe Latitude
const lon = 29.8148; // Kwekwe Longitude
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        // Current Weather
        const response = await fetch(weatherURL);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }

        // 3-Day Forecast
        const forecastResponse = await fetch(forecastURL);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2d.png`;

    document.getElementById('current-temp').textContent = temp;
    document.getElementById('weather-desc').textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    document.getElementById('weather-icon').setAttribute('src', iconSrc);
    document.getElementById('weather-icon').setAttribute('alt', desc);
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    if (!forecastContainer) return;
    
    forecastContainer.innerHTML = '';
    
    // Filter forecast data for roughly 24-hour intervals (e.g., index 7, 15, 23)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const options = { weekday: 'short' };
        const dayName = date.toLocaleDateString('en-US', options);
        const temp = Math.round(day.main.temp);

        const dayElem = document.createElement('div');
        dayElem.classList.add('forecast-day');
        dayElem.innerHTML = `<p><strong>${dayName}</strong>: ${temp}&deg;C</p>`;
        forecastContainer.appendChild(dayElem);
    });
}

if (document.getElementById('weather-container')) {
    apiFetch();
}

// --- Company Spotlight (JSON Data & Gold/Silver Filter) ---
const membersURL = 'data/members.json';

async function getMembersData() {
    try {
        const response = await fetch(membersURL);
        const data = await response.json();
        displaySpotlight(data);
    } catch (error) {
        console.error('Error loading members data:', error);
    }
}

function displaySpotlight(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    if (!spotlightContainer) return;

    // Filter members with Gold (level 2 or 3) or Silver membership levels
    const qualifiedMembers = members.filter(member => 
        member.membershipLevel === 2 || 
        member.membershipLevel === 3 || 
        member.membershipLevel === 'Silver' || 
        member.membershipLevel === 'Gold'
    );

    // Randomly select 2 members
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    spotlightContainer.innerHTML = '';
    selected.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-item');
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" width="100">
            <h3>${member.name}</h3>
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="membership-badge">Level: ${member.membershipLevel}</p>
        `;
        spotlightContainer.appendChild(card);
    });
}

if (document.getElementById('spotlight-container')) {
    getMembersData();
}

// --- Hidden Timestamp for Join Form ---
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    const now = new Date();
    timestampField.value = now.toLocaleString();
}