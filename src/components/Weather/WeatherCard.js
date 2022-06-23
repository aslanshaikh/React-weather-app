import React, {useEffect} from 'react'

const WeatherCard = ( {tempInfo }) => {
    const [weatherState, setWeatherState] = React.useState("");
    const  {
        temp,
        humidity,
        pressure,
        weathemood,
        name,
        speed,
        country,
        sunset,

    } = tempInfo;

    useEffect(() => {
      if (weathemood) {
          switch (weathemood) {
              case "Clouds": 
              setWeatherState('wi-day-cloudy');
              break;

              case "Haze": 
              setWeatherState('wi-fog');
              break;

              case "Clear": 
              setWeatherState('wi-day-sunny');
              break;

              case "Mist": 
              setWeatherState('wi-dust');
              break;

              case "Smoke": 
              setWeatherState('wi-smoke');
              break;
          
              default:
                setWeatherState('wi-day-sunny');
                  break;
          }
      }
    }, [weathemood])
    
    // converting 
    let sec = sunset;
    let date = new Date(sec * 1000);
    let timestr = `${date.getHours()}: ${date.getMinutes()} `
  return (
    <>
    <article className='widget'>
    <div className='weatherIcon'>
        <i className={`wi ${weatherState}`}></i>
    </div>

    <div className="weatherInfo">
        <div className="temperature">
            <span>{temp}</span>
        </div>
        <div className="description">
            <div className="weatherCondition">{weathemood}</div>
            <div className="place">{name}, {country}</div>
        </div>
    </div>

    <div className="date"> {new Date().toLocaleString()}</div>

    <div className="extra-temp">
        <div className="temp-info-minmax">
            <div className="two-sided-section">
                <p>
                    <i className={'wi wi-sunset'}></i>
                </p>
                <p className='extra-info-leftside'>
                    {timestr} PM<br />
                    sunset
                </p>
            </div>

            <div className="two-sided-section">
                <p>
                    <i className={'wi wi-humidity'}></i>
                </p>
                <p className='extra-info-leftside'>
                    {humidity} <br />
                    humidity
                </p>
            </div>


        </div>

        <div className="weather-extra-info">
            <div className="two-sided-section">
                <p>
                    <i className={'wi wi-rain'}></i>
                </p>
                <p className='extra-info-leftside'>
                    {pressure} <br />
                    Pressure
                </p>
            </div>
            <div className="two-sided-section">
                <p>
                    <i className={'wi wi-strong-wind'}></i>
                </p>
                <p className='extra-info-leftside'>
                   {speed} <br />
                    speed
                </p>
            </div>
        </div>
    </div>

</article>
    
    </>
  )
}

export default WeatherCard