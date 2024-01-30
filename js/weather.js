// // For local development
// import config from './config.js';
// const apiKey = config.API_KEY;

// For deployment

const weather = document.querySelector('.weather');
const goButton = document.querySelector('.submit-btn');
const displayWeather = document.querySelector('.display-weather');

goButton.addEventListener('click', () => {
  goButton.classList.add('clicked');
  setTimeout(() => {
    goButton.classList.remove('clicked');
  }, 200);
});

weather.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityField.value;

  try {
    // Make a request to the Netlify function
    const response = await fetch('../netlify/functions/weatherfetch', {
      method: 'POST',
      body: JSON.stringify({ city }),
    });

    if (response.ok) {
      // Parse the response from the serverless function
      const dataFromServer = await response.json();

      const weatherInfo = {
        city: dataFromServer.location.name,
        state: dataFromServer.location.region,
        description: dataFromServer.current.condition.text,
        temperature: Math.round(dataFromServer.current.temp_f),
        humidity: dataFromServer.current.humidity,
        icon: dataFromServer.current.condition.icon,
      };

      // Continue with handling the response as needed
      displayWeatherInfo(weatherInfo);
    } else {
      console.log(
        'Server response not okay:',
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }

  function displayWeatherInfo(weatherInfo) {
    const weatherDiv = document.querySelector('.display-weather');
    const cityState = document.querySelector('.city-state');
    const app = document.querySelector('.app');

    app.style.height = '180px';

    cityState.innerText = `${weatherInfo.city}, ${weatherInfo.state}`;

    weatherDiv.innerHTML = `
        <div class="description-icon">

          <div class="description">
            <p></p>
            <p>${weatherInfo.description}</p>
            <p>Temp: ${weatherInfo.temperature}F</p>
            <p>Humidity: ${weatherInfo.humidity}%</p>
          </div>

          <div class="icon">
            <img src="${weatherInfo.icon}" alt="sadf" />
          </div>

          <i src="./img/x-solid.svg" class="fa-solid fa-x" id="close"></i>  

        </div>`;

    const close = document.getElementById('close');

    close.addEventListener('click', () => {
      weatherDiv.innerHTML = '';
      app.style.height = '60px';
      cityState.innerText = '';
    });
  }
});
