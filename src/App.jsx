import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ÜCRETSİZ OpenWeatherMap API Key (2.5 sürümü)
  const API_KEY = 'bf66745f5de99f61fd79616870946e25'; // https://home.openweathermap.org/api_keys
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`;

  const getWeather = async (e) => {
    e.preventDefault(); // Form submit'i engelle
    if (!city.trim()) {
      setError('Lütfen bir şehir adı girin');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Şehir bulunamadı. Lütfen İngilizce karakterlerle yazın (Ör: Istanbul)');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      Clear: <WiDaySunny size={60} />,
      Rain: <WiRain size={60} />,
      Clouds: <WiCloudy size={60} />,
      Snow: <WiSnow size={60} />,
      Thunderstorm: <WiThunderstorm size={60} />,
    };
    return iconMap[condition] || <WiDaySunny size={60} />;
  };

  return (
    <div className="app">
      <h1>React Hava Durumu</h1>
      
      <form onSubmit={getWeather} className="search-box">
        <input
          type="text"
          placeholder="Şehir adı (Ör: Istanbul, Ankara)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">{loading ? '...' : 'Ara'}</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="weather-icon">
            {getWeatherIcon(weather.weather[0].main)}
            <p>{weather.weather[0].description}</p>
          </div>
          <div className="weather-details">
            <p>🌡️ Sıcaklık: {Math.round(weather.main.temp)}°C</p>
            <p>💧 Nem: {weather.main.humidity}%</p>
            <p>🌬️ Rüzgar: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}

      <p className="api-note">
        Ücretsiz OpenWeatherMap API (2.5) kullanılmıştır. Günlük limitlere dikkat edin.
      </p>
    </div>
  );
}

export default App;