import React, { useState, useEffect } from 'react'
import "./Style.css"
import WeatherCard from './WeatherCard';

const Temp = () => {

    const [searchValue, setSearchValue] = useState("pune");
    const [tempInfo, setTempInfo] = useState("");

    const getWeatherInfo = async() => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a0af21d4775878804d4ae6136f2499e2`;

            const res = await fetch(url);
            const data = await res.json();

            // console.log(data);
            const {temp, humidity, pressure} = data.main;
            
            const {main: weathemood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const mNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathemood,
                name,
                speed,
                country,
                sunset,

            };
            setTempInfo(mNewWeatherInfo);

        } catch (error) {
            console.log(error);
            
        }
    };

    useEffect(() => {
    getWeatherInfo();
    }, [])
    
    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder='search....' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

                    <button className='searchButton' type='button' onClick={getWeatherInfo}>Search </button>

                </div>
            </div>


           <WeatherCard tempInfo = {tempInfo}/>


        </>

    )
}

export default Temp