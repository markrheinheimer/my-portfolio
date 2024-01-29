// // For local development
// import config from './config.js';
// const apiKey = config.API_KEY;

// For deployment
exports.handler = async function (event, context) {
  // Access the environment variable
  const apiKey = process.env.API_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Value of API_KEY is ${apiKey}.`,
    }),
  };
};
// const apiKey = process.env.apiKey;

const weather = document.querySelector('.weather');
const goButton = document.querySelector('.submit-btn');
const displayWeather = document.querySelector('.display-weather');

goButton.addEventListener('click', () => {
  goButton.classList.add('clicked');
  setTimeout(() => {
    goButton.classList.remove('clicked');
  }, 200);
});

weather.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityField.value;

  async function getWeatherData() {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      const data = await response.json();

      if (response.status === 200) {
        const weatherInfo = {
          city: data.location.name,
          state: data.location.region,
          description: data.current.condition.text,
          temperature: Math.round(data.current.temp_f),
          humidity: data.current.humidity,
          icon: data.current.condition.icon,
        };

        displayWeatherInfo(weatherInfo);
      } else {
        console.log('Weather API request failed:', data.message);
      }
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
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

  getWeatherData();
});
