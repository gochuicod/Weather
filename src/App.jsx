import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './Custom.css'
import { useEffect, useState, useRef } from 'react'
import ProjectTitle from './ProjectTitle'
import CurrentWeather from './CurrentWeather'
import HandleFetchData from './HandleFetchData'
import CurrentAirPollution from './CurrentAirPollution'
import HourlyForecast from './HourlyForecast'

const App = () => {
    const apiKey = "925f99c7a911db368626814750c8bc61"
    
    const [query, setQuery] = useState('')
    const [data, setData] = useState(null)

    const [weatherData, setWeatherData] = useState([])
    const [airPollutionData, setAirPollutionData] = useState([])
    const [hourlyForecastData, setHourlyForecastData] = useState([])

    const isMounted = useRef(false)
    const [isPressedEnter, setIsPressedEnter] = useState(false)

    const handleOnChange = event => setQuery(event.target.value)
    const handleKeyDown = event => {
        if(event.key == "Enter") {
            setData(query)
            setIsPressedEnter(true)
        }
    }

    useEffect(() => {
        const fetchData = async (query) => {
            const weatherData = await HandleFetchData(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`)
            setWeatherData(weatherData)
            
            if(!weatherData.message){
                const {lat,lon} = weatherData.coord
                const airPollutionData = await HandleFetchData(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                setAirPollutionData(airPollutionData)

                const HourlyForecastData = await HandleFetchData(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
                setHourlyForecastData(HourlyForecastData)
            }
        }

        if(!isMounted.current && isPressedEnter == true){
            isMounted.current = true;
            fetchData(data)
        }

        isMounted.current = false
    },[data,apiKey])

    return (
        <main className='container'>
            <ProjectTitle name="Weather" source="openweathermap" />

            <section className='d-flex justify-content-center mb-4 expand'>
                <div className="input-group w-75 align-items-center">
                    <i className="bi bi-geo-alt fs-4 text-secondary me-1" />
                    <input className='form-control border-0' type="search" value={query} onChange={handleOnChange} onKeyDown={handleKeyDown} placeholder='Search weather' />
                    <button className='btn'>
                        <i className="bi bi-search text-secondary" />
                    </button>
                </div>
            </section>

            <section>
                {
                    isPressedEnter == true && !weatherData.message ?
                    <div>
                        <CurrentWeather data={weatherData} />
                        <CurrentAirPollution data={airPollutionData} />
                        <HourlyForecast data={hourlyForecastData} />
                    </div>
                    : <div className="d-flex justify-content-center text-danger text-transform-capitalize">{weatherData.message}</div>
                }
            </section>
        </main>
    )
}

export default App