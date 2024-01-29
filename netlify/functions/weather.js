// netlify/functions/weather.js

exports.handler = async function (event, context) {
  try {
    // Access the environment variable
    const apiKey = process.env.API_KEY;

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
