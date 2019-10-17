import React, { useState, useEffect } from "react";

import weatherService from "../services/weather";

const CityWeather = ({ city }) => {
  const [weatherData, setWeatherData] = useState({});
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    weatherService.getCityWeather(city).then(data => {
      setHasData(true);
      setWeatherData({
        temperature: data.current.temperature,
        icon: data.current.weather_icons[0],
        windSpeed: data.current.wind_speed,
        windDirection: data.current.wind_dir
      });
    });
  }, []);

  return hasData ? (
    <>
      <h3>Weather in {city}</h3>
      <p>
        <strong>temperature:</strong> {weatherData.temperature} celsius
      </p>
      <img src={weatherData.icon} alt="icon" />
      <p>
        <strong>wind:</strong> {weatherData.windSpeed} kph direction{" "}
        {weatherData.windDirection}
      </p>
    </>
  ) : null;
};

export default CityWeather;
