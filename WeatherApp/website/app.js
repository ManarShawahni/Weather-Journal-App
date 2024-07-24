// Global variables
const apiKey = 'b8ef32ccec4738a0bed2c8b1e0a96211';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Function to get weather data
async function getWeatherData(zipCode, countryCode) {
    const url = `${baseUrl}?zip=${zipCode},${countryCode}&appid=${apiKey}&units=metric`;
    console.log(`Attempting to fetch data from API: ${url}`);
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('API call successful, data received:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function postData(url = '', data = {}) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error(`HTTP error, status = ${res.status}`);
        }
        const newData = await res.json();
        console.log('Data posted successfully:', newData);
        return newData;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error; 
    }
}


// Function to update the UI
async function updateUI() {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerText = `Date: ${allData.date}`;
        document.getElementById('temp').innerText = `Temperature: ${allData.temperature}°C`;
        document.getElementById('content').innerText = `Your feelings: ${allData.userResponse}`;
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}

document.getElementById('generate').addEventListener('click', async () => {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const countryCode = 'us';

    document.getElementById('no').style.display = 'none';
    try {
        const weatherData = await getWeatherData(zipCode, countryCode);
        if (weatherData) {
            const temp = weatherData.main.temp;
            updateBackground(temp);
            
            const date = new Date().toLocaleDateString();
            document.getElementById('temp').innerText = `Temperature: ${weatherData.main.temp}°C`;
            document.getElementById('tempIcon').src = getWeatherIcon(temp);
            document.getElementById('date').innerText = `Date: ${date}`;
            document.getElementById('content').innerText = `Your feelings: ${feelings}`;

            await postData('/addData', {
                temperature: weatherData.main.temp,
                date: date,
                userResponse: feelings
            });

            updateUI();
        }
    } catch (error) {
        console.error('Failed to fetch or post weather data:', error);
        document.getElementById('weatherResult').innerHTML = 'Failed to retrieve weather data.';
    }
});

function updateBackground(temp) {
    const body = document.body;
    let button = document.querySelector('button');
    let container = document.querySelector('.container');

    if (temp < 15) {
        body.style.backgroundImage = "url('./assets/raining.jpg')";
        body.className = 'rain-animation';
        button.style.backgroundColor = 'rgba(87, 114, 175, 0.695)'; 
        container.style.background = 'rgba(170, 188, 234, 0.752)';
        container.style.backdropFilter = "blur(1px)";
        container.style.webkitBackdropFilter = "blur(1px)";
    } else if (temp > 30) {
        body.style.backgroundImage = "url('./assets/hotback.png')";
        button.style.backgroundColor = '#eaad5c'; 
        body.className = ''; // No animation for hot weather
        container.style.background = 'rgba(255, 222, 160, 0.793)';
        container.style.backdropFilter = "blur(1px)";
        container.style.webkitBackdropFilter = "blur(1px)";
    } else {
        body.style.backgroundImage = "url('./assets/background.png')";
        body.className = ''; // No animation for normal weather
        container.style.background = 'rgba(239, 204, 209, 0.868)'; 
        container.style.backdropFilter = "blur(1px)";
        container.style.webkitBackdropFilter = "blur(1px)";
    }
}


function getWeatherIcon(temp) {
    if (temp > 30) { 
        return './assets/hot.gif';
    } else if (temp < 15) {
        return './assets/cold.gif';  
    } else {
        return './assets/normal.gif';  
    }
}

async function updateUI() {
    try {
        document.getElementById('weatherResult').style.display = 'block';
        document.querySelector('.container').style.marginTop = '60px'; 
        const request = await fetch('/all');
        const allData = await request.json();
        document.getElementById('date').innerText = `Date: ${allData.date}`;
        document.getElementById('temp').innerText = `Temperature: ${allData.temperature}°C`;
        document.getElementById('content').innerText = `Your feelings: ${allData.userResponse}`;
    } catch (error) {
        console.error('Error updating UI:', error);
        throw error;
    }
}