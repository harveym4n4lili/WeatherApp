import React from 'react'
import './WeatherPanel.css'

function WeatherPanel() {

    return(
        <div className='weather-panel'>
            <div className='time'>
                <h1>--:--</h1>
            </div>
            <div className='search-bar'>
                <input type='text' placeholder='Search' />
            </div>
            <div className='stat-section'>
                <div className='temperature-section'>
                    <div className='location-title'>
                        <p>Location</p>
                    </div>
                    <div className='temp'>
                        <p>21.8'C</p>
                    </div>
                </div>

                <div className='temperature-logo'>
                    
                </div>
            </div>

            <div className='other-stats'>
                <div className='stat'>
                    <div className='stat-logo'>

                    </div>
                    <div >
                        <h1>HUMIDITY</h1>
                        <p>00</p>
                    </div>
                </div>
                <div className='stat'>
                    <div className='stat-logo'>

                    </div>
                    <div >
                        <h1>PRESSURE</h1>
                        <p>00</p>
                    </div>
                </div>
                <div className='stat'>
                    <div className='stat-logo'>

                    </div>
                    <div >
                        <h1>RAIN</h1>
                        <p>00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherPanel;