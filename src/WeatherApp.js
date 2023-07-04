import React, { useEffect, useState } from "react";
import axios from "axios";
import { Location } from "./Location";
import { useGeolocated } from "react-geolocated";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherByLocation, setWeatherByLocation] = useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (!isGeolocationAvailable) {
      console.log("coords: Your browser does not support Geolocation");
      console.log("isGeolocationAvailable: ", isGeolocationAvailable);
    } else if (!isGeolocationEnabled) {
      console.log("coords: Geolocation is not enabled");
      console.log("isGeolocationEnabled: ", isGeolocationEnabled);
    } else if (coords) {
      console.log("coords: ", coords.latitude);
      getData(coords.latitude, coords.longitude);
    } else {
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

  const getData = async (latitude, longitude) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=251db5a74f7d45769d5194538230307&q=${latitude},${longitude}`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setWeatherByLocation(true);
      console.log("data: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setWeatherByLocation(false);
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
          {weatherByLocation && <div>weather by your location</div>}
          <p> {weatherData.location.name}</p>

          <p> {weatherData.current.temp_c}°C</p>
          <p> {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};
export default WeatherApp;
