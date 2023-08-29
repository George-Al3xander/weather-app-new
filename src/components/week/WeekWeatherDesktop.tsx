import moment from "moment"
import { getIcon } from "../../utilityFunctions";

const WeekWeatherDesktop = ({week, weather}: {week: any, weather: any}) => {
    
    return(<ul className="week-info week-info-desktop">
        {week.map((item: any) => {
            
            const momentDay = moment.utc(item.dt,'X').add(weather.timezone,'seconds');
            return <li key={item.dt}>
                <div>
                    <h2>{momentDay.format("ddd")}</h2>
                    <h3>{momentDay.format("D/M")}</h3>
                </div>
                <div>
                   <img src={getIcon(item.weather[0].icon)} alt="Weather icon for week" />
                </div>
                <div>
                    <h2>{Math.floor(item.main.temp_min) + "°"}</h2>
                    <h3>Low</h3>
                </div>
                <div>
                    <h2>{Math.floor(item.main.temp_max) + "°"}</h2>
                    <h3>High</h3>
                </div>
                <div>
                    <h2>{Math.floor(item.wind.speed) + "mph"}</h2>
                    <h3>Wind</h3>
                </div>
                <div>
                    <h2>{item.rain ? 
                            item.rain["3h"] ? 
                            item.rain["3h"] * 100 + "%" 
                            :
                            item.rain["1h"] * 100 + "%" 
                            : "0%"}</h2>
                    <h3>Rain</h3>
                </div>
            </li>
        })}
    </ul>)
}

export default WeekWeatherDesktop