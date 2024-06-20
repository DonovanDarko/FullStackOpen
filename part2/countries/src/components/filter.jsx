import countryService from "../services/countries"

const Country = ( {name, showSingleCountry} ) => {
    return (
        <div>{name} <button onClick={showSingleCountry}>show</button> </div>
    )
}

export const SingleCountry = ( {countryObject} ) => {
    if (!countryObject) {
        return null
    }
    return (
        <>
        <div />
        <h1> {countryObject.name.common} </h1>
        <div> capital {countryObject.capital} </div>
        <div> area {countryObject.area} </div>
        <br /> 
        <div className="languages">languages:</div>
        <ul>
            {Object.values(countryObject.languages).map((language) => <li>{language}</li>)}
        </ul>
        <img src = {countryObject.flags.png} />
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
