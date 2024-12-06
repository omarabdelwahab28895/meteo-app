import React, { useState } from "react";
import { getWeatherByCity, getForecastByCity } from "./api";

function App() {
  const [city, setCity] = useState(""); 
  const [weather, setWeather] = useState(null); 
  const [forecast, setForecast] = useState(null); 

  const handleSearch = async () => {
    if (city) {
      console.log("Sto cercando:", city);
      try {
        
        const data = await getWeatherByCity(city);
        console.log("Dati meteo ricevuti:", data);
        setWeather(data);

        
        const forecastData = await getForecastByCity(city);
        console.log("Previsioni ricevute:", forecastData);
        setForecast(forecastData);
      } catch (error) {
        console.error("Errore durante la ricerca:", error);
      }
    } else {
      console.error("Inserisci una città!");
    }
  };

  
  const needsUmbrella =
    weather &&
    weather.weather &&
    weather.weather[0] &&
    weather.weather[0].main.toLowerCase().includes("rain");

  
  const getBackgroundStyle = () => {
    if (!weather) return { backgroundColor: "#a8c8f0" }; 
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("rain")) return { backgroundColor: "#708090" }; 
    if (main.includes("snow")) return { backgroundColor: "#ffffff" }; 
    if (main.includes("cloud")) return { backgroundColor: "#A9A9A9" }; 
    return { backgroundColor: "#AFEEEE" }; 
  };

  return (
    <div className="App" style={getBackgroundStyle()}>
      <h1 style={{ fontSize: "2.5em", fontWeight: "bold", margin: "20px 0" }}>
        Meteo App
      </h1>
      <input
        type="text"
        placeholder="Inserisci una città"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Cerca</button>

      {/* Meteo attuale */}
      {weather && weather.weather && weather.weather.length > 0 && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Temperatura: {weather.main.temp}°C</p>
          <p>{needsUmbrella ? "Ti serve l'ombrello! ☔" : "Non ti serve l'ombrello! ☀️"}</p>
        </div>
      )}

      {/* Previsioni */}
      {forecast && (
        <div>
          <h3>Previsioni per i prossimi giorni:</h3>
          <div className="forecast-container">
            {forecast.list.slice(0, 5).map((item, index) => (
              <div className="forecast-card" key={index}>
                <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <p>{item.weather[0].description}</p>
                <p>Temp: {item.main.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


