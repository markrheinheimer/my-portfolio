// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
import fetch from 'node-fetch';

const handler = async (event) => {
  try {
    // Access the environment variable
    const apiKey = process.env.API_KEY;
    console.log(apiKey);

    // // Dynamically import node-fetch
    // const fetch = require('node-fetch');

    // Extract the city from the request body
    const { city } = JSON.parse(event.body);
    console.log(city);

    // Make a request to the weather API
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
      throw new Error(
        `Weather API request failed with status ${apiResponse.status}`
      );
    }

    const weatherData = await apiResponse.json();

    // Extract relevant information from the API response
    const weatherInfo = {
      city: weatherData.location.name,
      temperature: Math.round(weatherData.current.temp_f),
      condition: weatherData.current.condition.text,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(weatherInfo),
    };
  } catch (error) {
    console.error('Error in weather function:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

module.exports = { handler };
