import React, { useState, useEffect, useCallback } from 'react';
import './Weather.css';

const HomePageHeader = () => {
  const [weather, setWeather] = useState(null);
  const [cityImage, setCityImage] = useState(null);
  const [city, setCity] = useState('Jacmel');

  const fetchCityImage = async (city) => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=kRPBQGgbV90cl7wCVtsgpL267hmY3N0TlzoVb5Z60qY`);
      const data = await response.json();
      if (data.results.length > 0) {
        setCityImage(data.results[0].urls.small);
      }
    } catch (error) {
      console.log("Error fetching city image:", error);
    }
  };

  const fetchWeather = useCallback(async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=52d0ce61c06bbfc1f6587fad9189c9cc`);
      const data = await response.json();
      setWeather(data);
      fetchCityImage(city);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <div className='weather-container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather ? (
        <div>
          {cityImage && <img src={cityImage} alt={weather.name} className='city-image' />}
          <h1>Weather in {weather.name}</h1>
          {weather.main ? (
            <>
              <p>Temperature: {weather.main.temp}°K</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <p>Weather: {weather.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather icon" className="weather-icon" />
            </>
          ) : (
            <p>No weather data available</p>
          )}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default HomePageHeader;
