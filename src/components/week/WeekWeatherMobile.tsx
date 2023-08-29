import moment from "moment"
import { getIcon } from "../../utilityFunctions";

const WeekWeatherMobile = ({week, weather}: {week: any, weather: any}) => {
    
    return(<ul className="week-info week-info-mobile">
        {week.map((item: any) => {           
            const momentDay = moment.utc(item.dt,'X').add(weather.timezone,'seconds');
            return <li key={item.dt}>
                    <h3>{momentDay.format("ddd")}</h3>
                <div>
                   <img src={getIcon(item.weather[0].icon)} alt="Weather icon for week" />
                </div>
                <h3>{Math.floor(item.main.temp_min) + "-" + Math.floor(item.main.temp_max)  + "°"}</h3>
                    
            </li>
        })}
    </ul>)
}

export default WeekWeatherMobile