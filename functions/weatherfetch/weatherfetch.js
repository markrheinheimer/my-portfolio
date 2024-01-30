// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
import fetch from 'node-fetch';

const handler = async (event) => {
  try {
    // Access the environment variable
    const apiKey = process.env.apiKey;

    // Extract the city from the request body
    const { city } = JSON.parse(event.body);

    // Make a request to the weather API
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
      throw new Error(
        `Weather API request failed with status ${apiResponse.status}`
      );
    }

    const weatherData = await apiResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(weatherData),
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
