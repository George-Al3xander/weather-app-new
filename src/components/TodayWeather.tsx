import moment from "moment"
import { getIcon } from "../utilityFunctions"
import WeekWeatherDesktop from "./week/WeekWeatherDesktop"
import WeekWeatherMobile from "./week/WeekWeatherMobile"
const TodayWeather = ({weather, forecast, city}: {weather:any, forecast:any, city: any}) => {       
    const today = forecast.list.filter((item:any) => {        
        return moment.utc(item.dt,'X').add(weather.timezone,'seconds').format('L') == moment().format("L");
   })
   const week =  forecast.list.reduce(function (p: any, c: any) {    
    if (!p.some(function (el: any) { return moment.utc(el.dt,'X').add(weather.timezone,'seconds').format('L') === moment.utc(c.dt,'X').add(weather.timezone,'seconds').format('L'); })) p.push(c);
    return p;
  }, []);
 
    return(<main>
        <div className="container">
            <div className="basic-info">
                <h1>{`${city.name}, ${city.country}`}</h1>
                <h3>{moment(new Date()).format("dddd D MMMM")}</h3>
            </div>
            <div className="current-info">  
                <div className="current-info-main">
                    <div>
                      <img src={getIcon(weather.weather[0].icon)} alt="Weather icon" />
                    </div>
                    <div>
                        <h1>{Math.floor(weather.main.temp) + "°"}</h1>
                        <h3>{weather.weather[0].main}</h3>
                    </div>            
                </div>  
                <div className="current-info-additional">
                    <ul>
                        <li>
                            <p>{Math.floor(weather.main.temp_max)+ "°"}</p>
                            <h3>high</h3>
                        </li>
                        <li>
                            <p>{Math.floor(weather.wind.speed) + "mph"}</p>
                            <h3>wind</h3>
                        </li>
                        <li>
                            <p>{moment.utc(weather.sys.sunrise,'X').add(weather.timezone,'seconds').format('HH:mm')}</p>
                            <h3>sunrise</h3>
                        </li>
                        <li>
                            <p>{Math.floor(weather.main.temp_min)+ "°"}</p>
                            <h3>low</h3>
                        </li>
                        <li>
                            <p>{weather.rain ? 
                            weather.rain["3h"] ? 
                            weather.rain["3h"] * 100 + "%" 
                            :
                            weather.rain["1h"] * 100 + "%" 
                            : "0%"}</p>
                            <h3>rain</h3>
                        </li>
                        <li>
                            <p>{moment.utc(weather.sys.sunset,'X').add(weather.timezone,'seconds').format('HH:mm')}</p>
                            <h3>sunset</h3>
                        </li>
                    </ul>
                </div>        
            </div>
            {today.length > 0 ?
            <ul className="today-info">
            {today.map((item: any) => {                
                return <li>
                    <h2>{moment.utc(item.dt,'X').add(weather.timezone,'seconds').format('LT')}</h2>
                 <img src={getIcon(item.weather[0].icon)} alt="Weather icon" />
                 <h3>{Math.floor(item.main.temp)+ "°"}</h3>
                </li>
            })}
            </ul>
            : 
            null
            }

            <div className="week-info">
             <h2>Next 6 days</h2>   
            <WeekWeatherDesktop weather={weather} week={week}/>
            <WeekWeatherMobile weather={weather} week={week}/>
            </div>
        </div>
    </main>)
}

export default TodayWeather