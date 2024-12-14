import React, { useState } from "react";
import axios from "axios";
import Sun from "./sun.png";
import Moon from "./half-moon.png";
import "./weather.css";

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [sky, setSky] = useState(Sun); // Default to Sun image
  const [fetchedTime, setFetchedTime] = useState(""); // To store the fetched time
  const [Sb,setSb] = useState(true);


  const WEATHER_API_KEY = "e2094f078e27c3abf08665b90bf952d5";  // OpenWeather API key
  const TIMEZONE_API_KEY = "5HS6Z80CNTML";  // TimeZoneDB API key
     const Dback=!city;
  const fetchWeather = async () => {
    if (Dback) return;

    // Fetch weather data from OpenWeather
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    try {
      const response = await axios.get(API_URL);
      const data = response.data;
      setWeather(data);
      setError("");

      // Fetch time zone data from TimeZoneDB
      const { lat, lon } = data.coord;
      const TIMEZONE_API_URL = `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`;
      const timezoneResponse = await axios.get(TIMEZONE_API_URL);
      const timezoneData = timezoneResponse.data;

      // Extract and format the local time
      const formattedTime = new Date(timezoneData.formatted).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setFetchedTime(formattedTime);

      // Determine if it's day or night
      const hours = new Date(timezoneData.formatted).getHours();
      if (hours >= 18 || hours < 6) {
        setSky(Moon); // Nighttime
        setSb(false);
       
      } else {
        setSky(Sun); // Daytime
        setSb(true);
       
      }
    } catch (err) {
      setError("Could not fetch weather data. Please check the city name or try again later.");
      console.error(err);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const Sunback='https://wallpaperbat.com/img/179654-sunrise-wallpaper-top-free-sunrise-background.jpg';
  const Moonback='https://img.freepik.com/free-photo/3d-render-silhouette-tree-against-space-sky-with-moon_1048-14318.jpg';
  const Defback='https://as1.ftcdn.net/v2/jpg/08/89/32/52/1000_F_889325232_9FbUoyMGUpauqYKMuUiNVRRvjOiSfJOV.jpg';
  return (
    <div style={{backgroundImage: Dback ? `url(${Defback})` : Sb ? `url(${Sunback})`:`url(${Moonback}` , 
    width:'100%', height:'100vh',backgroundRepeat:'no-repeat', backgroundSize:"cover",
    marginTop:'-22px'}}>
    <div className="jii">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
        style={{ padding: "10px", fontSize: "16px",margin:'10px' }}
      />
      <button onClick={fetchWeather} style={{ padding: "10px", marginLeft: "10px" }}>
        Get Weather
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (

        <div style={{ marginTop: "-50px" }}>
          <div className="weather">
            <div id="td">
              <p id="loc">Location: {weather.name}</p>
              <img id="sky" src={sky} alt="Sky" />
              <p id="temp">{weather.main.temp} °C</p>
              <p id="we">Weather: {weather.weather[0].description}</p>
            </div>
            <div id="htw">
              <p id="hum">
                <span style={{ fontSize: "10px", backgroundColor: "black", display: "block" }}>Humidity:</span>
                {weather.main.humidity}%
              </p>
              <p id="t">
                <span style={{ fontSize: "10px", backgroundColor: "black", display: "block" }}>Fetched Time:</span>
                {fetchedTime}
              </p>
              <p id="ws">
                <span style={{ fontSize: "10px", backgroundColor: "black", display: "block" }}>Wind Speed:</span>
                {weather.wind.speed} m/s
              </p>
              <p id="hum">
                <span style={{ fontSize: "10px", backgroundColor: "black", display: "block" }}>Humidity:</span>
                {weather.main.humidity}%
              </p>
              <p id="t">
                <span style={{ fontSize: "10px", backgroundColor: "black", display: "block" }}>Fetched Time:</span>
                {fetchedTime}
              </p>
              <p id="ws">
                <span style={{ fontSize: "10px", backgroundColor: "black", display: "block" }}>Wind Speed:</span>
                {weather.wind.speed} m/s
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default WeatherApp;
