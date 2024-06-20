import countryService from "../services/countries"

const Country = ( {name, showSingleCountry} ) => {
    return (
        <div>{name} <button onClick={showSingleCountry}>show</button> </div>
    )
}

export const SingleCountry = ({ countryWeather }) => {
    if (!countryWeather) {
        return null
    }
    
    const countryObject = countryWeather.returnedCountry
    const weatherObject = countryWeather.returnedWeather

    const weatherCodes = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Rime Depositing Fog!",
        51: "Light Drizzle",
        53: "Drizzle",
        55: "Heavy Drizzle",
        56: "Light Freezing Drizzle",
        57: "Heavy Freezing Drizzle",
        61: "Lightly Raining",
        63: "Raining",
        65: "Heavilyy Raining",
        66: "Freezing Rain",
        67: "FREEZING Rain",
        71: "Lightly Snowing",
        73: "Snowing",
        75: "Proper Snowing",
        77: "Snow grains - not for bread",
        80: "Showering Rain",
        81: "Proper Raining",
        82: "Violent Raining",
        85: "Snow Showers",
        86: "Proper Snow Showers",
        95: "Thunderstorms",
        96: "Thunderstorms slight hail",
        99: "Thunderstorms heavy hail",
    }

    const windDirection = (degrees) => {
        if (degrees > 315 || degrees < 45) {
            return "coming from the North"
        } else if (degrees < 135) {
            return "coming from the East"
        } else if (degrees < 235) {
            return "coming from the South"
        } else {
            return "coming from the West"
        }
    }

    return (
        <>
        <div />
        <h1> {countryObject.name.common} </h1>
        <div> capital {countryObject.capital} </div>
        <div> area {countryObject.area} </div>
        <br /> 
        <div className="list_title">languages:</div>
        <ul>
            {Object.values(countryObject.languages).map((language) => <li key={language}>{language}</li>)}
        </ul>
        <img src = {countryObject.flags.png} />
        <br />
        <br /> 
        <div className="list_title">weather in {countryObject.capital}:</div>
        <div>temperature: {weatherObject.current.temperature_2m} {weatherObject.current_units.temperature_2m} </div>
        <div>conditions: {weatherCodes[weatherObject.current.weather_code]} </div>
        <div>wind: {weatherObject.current.wind_speed_10m} {weatherObject.current_units.wind_speed_10m} {windDirection(weatherObject.current.wind_direction_10m)} </div>
        </>
    )
}

export const Filter = (props) => {
    return (
        <div>Filter countries by: <input value={props.filter} onChange={props.handleFilterChange}/></div>
    )
}

export const FilterNotification = ({ message }) => {
    if (!message) {
        return null
    } else {
        return (
            <div>{message}</div>
        )
    }
}
 
export const FilteredList = ({ filteredCountries, showSingleCountry }) => {
    if (!filteredCountries) {
        return null
    } else {
        return (
            filteredCountries.map(
                (country) => 
                <Country 
                    name={country.name.common} 
                    key={country.name.common} 
                    showSingleCountry={() => showSingleCountry(country.name.common)}
                />
            )
        )
    }
}
