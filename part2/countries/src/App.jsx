import { useEffect, useState } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather_service'
import { Filter, FilteredList, FilterNotification, SingleCountry } from './components/filter'
import './App.css'

function App() {
  const [countryList, setCountryList] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)
  const [singleCountry, setSingleCountry] = useState(null)
  const [filter, setFilter] = useState("")
  const [filterNotification, setFilterNoticiation] = useState(null)
  
  useEffect(() => {
    countryService
      .getAll()
      .then(fullList => {
        setCountryList(fullList)
      })
  }, [])

  if (!countryList) {
    return null
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if (event.target.value==="") {
      setFilteredCountries(null)
      setFilterNoticiation(null)
      setSingleCountry(null)
    } else { 
      let filteredCountryList = countryList.filter((country) => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      if (filteredCountryList.length === 1) {
        showCountry(filteredCountryList[0].name.common)
      } else if (filteredCountryList.length > 10) {
        setFilterNoticiation("Too many matches, please specify another filter")
        setFilteredCountries(null)
        setSingleCountry(null)
      } else {
        setFilteredCountries(filteredCountryList)
        setFilterNoticiation(null)
        setSingleCountry(null)
      }   
    }
  }

  const showCountry = (name) => {
    countryService
    .getOne(name)
    .then(returnedCountry => {
        weatherService
        .getWeather(returnedCountry.capitalInfo.latlng)
        .then(returnedWeather => {
          setSingleCountry({ returnedCountry, returnedWeather })
        })
    })
    setFilterNoticiation(null)
    setFilteredCountries(null)
  }

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <FilterNotification message={filterNotification} />
      <FilteredList filteredCountries={filteredCountries} showSingleCountry={showCountry} />
      <SingleCountry countryWeather={singleCountry} />
    </>
  )
}

export default App
