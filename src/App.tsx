import { useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import TodayWeather from './components/TodayWeather'

type cityType = {
  country: string,
  name: string,
  state: string,
  lat: number,
  lon: number,
  status?: number,
  msg?: string
}
function App() {
  const [count, setCount] = useState(0)
  const apiKey = import.meta.env.VITE_API_KEY
  const [errorStatus, setErrorStatus] = useState(false);
  const [weather, setWeather] = useState({})
  const [forecast, setForecast] = useState({})
  const [currentCity, setCurrentCity] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  

  const getCity = async (searchKey: string): Promise<cityType | {status: number, msg: String, lon?: number, lat?: number}> => {
    //console.log(searchKey)
    const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchKey}&limit=5&appid=${apiKey}`) 
    //console.log(res)   
    if(res.data.length > 0 && res.status == 200) {
      //console.log(res.data)
      const city = res.data[0];         
      return city
    } else  {
      return {status: 404, msg: "No results"}
    }

  }

  const getWeather = async (searchKey: string) : Promise<void> => {   
    const city = await getCity(searchKey);
    if(city.status == 404) {
      setErrorStatus(true)
    } else {
      setCurrentCity(city)
      setErrorStatus(false)
      const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`)    
      const forecast = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`);
      setForecast(forecast.data)
      setWeather(weather.data)     
    }
  }
  
  return (
    <>
      <Header getWeather={getWeather}/>
      {
      errorStatus ?
      <div className='err-message'>
        <h1>No results</h1>
      </div>
      :
      isLoading ?
      <div className='spinner'></div>
      :
      (Object.keys(weather).length > 0 && Object.keys(forecast).length > 0)?  <TodayWeather weather={weather} city={currentCity} forecast={forecast}/> : null
      }
      
    </>
  )
}

export default App
