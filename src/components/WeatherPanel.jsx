import React, { useEffect, useState, useRef } from 'react'
import './WeatherPanel.css'
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/raindrops.svg'
import wind_icon from '../assets/wind.svg'
import pressure_icon from '../assets/barometer.svg'

import clear_day_icon from '../assets/clear-day.svg'
import partly_clear_day_icon from '../assets/partly-cloudy-day.svg'
import cloudy_day_icon from '../assets/cloudy.svg'
import overcast_day_icon from '../assets/overcast-day.svg'
import drizzle_day_icon from '../assets/drizzle.svg'
import rain_day_icon from '../assets/rain.svg'
import thunderstorm_day_icon from '../assets/thunderstorms-rain.svg'
import misty_day_icon from '../assets/mist.svg'
import snow_icon from '../assets/snow.svg'

import clear_night_icon from '../assets/clear-night.svg'
import partly_clear_night_icon from '../assets/partly-cloudy-night.svg'
import cloudy_night_icon from '../assets/partly-cloudy-night.svg'
import overcast_night_icon from '../assets/overcast-night.svg'
import drizzle_night_icon from '../assets/partly-cloudy-night-drizzle.svg'
import rain_night_icon from '../assets/partly-cloudy-night-rain.svg'
import thunderstorm_night_icon from '../assets/thunderstorms-rain.svg'

function WeatherPanel() {

    const userRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    // dictionary mapping weather icon codes from API to specfic icon variables
    const allIcons = {
        "01d": clear_day_icon, "01n": clear_night_icon,
        "02d": partly_clear_day_icon, "02n": partly_clear_night_icon,
        "03d": cloudy_day_icon, "03n": cloudy_night_icon,
        "04d": overcast_day_icon, "04n": overcast_night_icon,
        "09d": drizzle_day_icon, "05n": drizzle_night_icon,
        "10d": rain_day_icon, "10n": rain_night_icon,
        "11d": thunderstorm_day_icon, "11n": thunderstorm_night_icon,
        "13d": snow_icon, "13n": snow_icon,
        "50d": misty_day_icon, "50n": misty_day_icon
    }

    // function to fetch data for given city
    const search = async (city)=>{
        try {
            // constructing api url with city name and API key
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            
            // make request to weather API
            const response = await fetch(url); // search database with our own query through api
            const data = await response.json(); // store data retrieved from api (parse the jason response)
            console.log(data);
            // retrieve the icon associated with current weather
            const icon = allIcons[data.weather[0].icon];

            // update the state based on fetched weather data
            setWeatherData({
                time: convertTimezoneToTime(data.timezone),
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                temperature: Number(data.main.temp.toFixed(1)),
                wind: data.wind.speed,
                location: data.name,
                weatherIcon: icon
            })

        } catch (error) {

        }
    }
    
    const handleSearchPress = (event) => {
        if (event.key === 'Enter') {
            search(userRef.current.value);
        }
    }
    // function to conver timezone offset in seconds to a 24 hour display
    function convertTimezoneToTime(timezoneOffset) {
        // current time in UTC
        const currentUTC = Math.floor(Date.now() / 1000);
        // calculate local time in seconds
        const localTimeInSeconds = (currentUTC + timezoneOffset) % 86400;
        // calculate hours and minutes
        const hours = Math.floor(localTimeInSeconds / 3600);
        const minutes = Math.floor((localTimeInSeconds % 3600) / 60);
        // format hours and minutes to always show 2 digits
        const formattedHours = String((hours + 24) % 24).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}`
    }

    // useEffect hook to perform search function when component mounts
    useEffect(()=>{
        search("bournemouth");
    },[])

    return(
        <div className='weather-panel'>
            <div className='search-bar'>
                <input ref={userRef} type='text' placeholder='Search' onKeyDown={handleSearchPress}/>
                <div className='searchimg' onClick={() => search(userRef.current.value)}>
                    <img src={search_icon} alt="" />
                </div>
                
            </div>

            <div className='location-title'>
                <p>{weatherData.location}, {weatherData.time}</p>
            </div>
            <div className='stat-section'>
                <div className='temperature-logo'>
                    <img src={weatherData.weatherIcon} />
                </div>
                <div className='temperature-section'>
                    <div className='temp'>
                        <p>{weatherData.temperature}°</p>
                    </div>
                </div>
            </div>

            <div className='other-stats'>
                <div className='stat'>
                    <div className='stat-logo'>
                        <img src={humidity_icon}/>
                    </div>
                    <div >
                        <h1>HUMIDITY</h1>
                        <p>{weatherData.humidity}%</p>
                    </div>
                </div>
                <div className='stat'>
                    <div className='stat-logo'>
                    <img src={pressure_icon}/>
                    </div>
                    <div >
                        <h1>PRESSURE</h1>
                        <p>{weatherData.pressure} hPa</p>
                    </div>
                </div>
                <div className='stat'>
                    <div className='stat-logo'>
                        <img src={wind_icon}/>
                    </div>
                    <div >
                        <h1>WIND</h1>
                        <p>{weatherData.wind} Km/h</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherPanel;