const API_KEY = "82b4276d0bf82dd356f5f41dc4fe9ce1"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5";


const getWeatherByCity = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Errore nella chiamata API: " + response.statusText);
  }
  return await response.json();
};


const getForecastByCity = async (city) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Errore nella chiamata API: " + response.statusText);
  }
  return await response.json();
};

export default { getWeatherByCity, getForecastByCity }; 
