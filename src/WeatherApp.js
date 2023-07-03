import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=251db5a74f7d45769d5194538230307&q=${location}`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="enter location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        ></input>
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div>
          <h2>Current Weather</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};
export default WeatherApp;
