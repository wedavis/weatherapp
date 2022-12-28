import React from 'react';
import coldbg from "./assets/coldbackground.jpg";
import hotbg from "./assets/sunnybackground.jpg";
import './App.css';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';


function App() {
  const [city, setCity] = useState("Raleigh");
   const [weather, setWeather] = useState(null);
   const [units, setUnits] = useState("imperial");
   const [bg, setBg] = useState(hotbg);

   useEffect (()=>{
   const fetchWeatherData = async () =>{
      const data =  await getFormattedWeatherData(city, units);
      setWeather(data);
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldbg);
      else setBg(hotbg);
   };
       fetchWeatherData();
   },[units, city]);

   const handleUnitsClick = (e) => {
      const button = e.currentTarget;
      const currentUnit = button.innerText.slice(1);
  
      const isCelsius = currentUnit === "F";
      button.innerText = isCelsius ? "°C" : "°F";
      setUnits(isCelsius ? "imperial" : 'metric');
    };
    const enterKeyPressed = (e) => {
      if (e.keyCode === 13) {
        setCity(e.currentTarget.value);
        e.currentTarget.blur();
      }
    };

   return(
	   
   <div className = "App" style ={{backgroundImage:`url(${bg})`, height : "100%"}}>
      <div className = 'overlay'>
         {weather && (
         <div className = 'container'>
             <h3 className = "WeatherTitle" > Daily Forecast</h3>
            <div className = 'section section_inputs'>
                  <input onKeyDown={enterKeyPressed} type="text" name = "city" placeholder = "Enter City..." />
                  <button onClick={(e) => handleUnitsClick(e)}> 
                     °F
                  </button>
            </div>
            <div className="section section_temperature">
              <div className="icon">
                  <h3>
                    {`${weather.name}, ${weather.country}`}
                  </h3>
                  <img src={weather.iconURL} alt="weatherIcon" />
                  <h3>
                    {weather.description}
                  </h3>
               </div>
               <div className="temperature">
                  <h1>
                     {`${weather.temp.toFixed()} ° ${units === "metric" ? "C" : "F" }`}
                  </h1>
               </div>
            </div>
	      </div>
         )}
      </div>
   </div>;
   )

}

export default App;
