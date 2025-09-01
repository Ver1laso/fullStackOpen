import { useEffect, useState } from 'react'
import { searchCountry } from './components/countries'
import countryServices from './services/countryServices'
import weather from './components/weather'
import './App.css'

function App() {
  const [searchValue, setSearchValue] = useState("")
  const [countriesToShow, setCountriesToShow] = useState([])
  const [showCountry, setShowCountry] = useState(null)
  const [weatherCity, setWeatherCity] = useState(null)


  
  const hook = () => {
    countryServices
    .getAll()
    .then(initialCountries => {
      // console.log('Datos de países:', initialCountries)
      setCountriesToShow(initialCountries)
    })
    .catch(error => {
      console.error('Error al obtener paises: ', error)
    })
  }
  useEffect(hook,[])

  const getWeatherData = (cityName) => {
    weather
      .getCity(cityName)
      .then(weatherData => {
        setWeatherCity(weatherData)
      })
  }
  useEffect(() =>{
    if(showCountry) {
      console.log("Obteniendo clima para:", showCountry.capital[0])
      getWeatherData(showCountry.capital[0])
    }
  },[showCountry])


  const filteredCountries = countriesToShow.filter(country => {
    return country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  })

  // console.log("Paises filtrados :", filteredCountries)

  function show(id) {
    const selectedCountry = countriesToShow.find(country => country.cca3 === id)
    setShowCountry(selectedCountry)
  }

  const listaPaises = () => {
    if(searchValue === ""){
      return null
    }
    if(filteredCountries.length >= 10){
      return <p>Too many countries, narrow more the search</p>
    }

    if(filteredCountries.length > 1 && filteredCountries.length < 11) {
      return (
        <>
          <ul>
            {filteredCountries.map((country) => {
              // console.log("Common name: ", country.name.common)
              return (
                <li key={country.cca3}>
                  {country.name.common}&nbsp;&nbsp;
                  <button onClick={() => show(country.cca3)}>Show</button>
                </li>
              )
            })}
          </ul>
          {showCountry && (
            <>
            <h1>{showCountry.name.common}</h1>
            <li>
              Capital: {showCountry.capital}
              <br/>
              Area: {showCountry.area}
            </li>
            <h1>Languages</h1>
              <ul>
                {Object.values(showCountry.languages).map((idioma, index) => {
                  return (
                    <li key={index}>
                      {idioma}
                    </li>
                  )
                })}
              </ul>
            <img src={showCountry.flags.png} />
            <h1>Weather in {showCountry.name.common}</h1>
            </>
          )}
          {weatherCity && (
           
              <div>
                <img src={`https://openweathermap.org/img/wn/${weatherCity.weather[0].icon}.png`} />
                <p>Temperature: {weatherCity.main.temp}º</p>
                <p>Wind: {weatherCity.wind.speed} m/s</p>
                <p>Description: {weatherCity.weather[0].description}</p>
            </div>
          )}
        </>
      )
    }

    if(filteredCountries.length === 1) {
      const country = filteredCountries[0]
        if (showCountry?.cca3 !== country.cca3) {
          setShowCountry(country)
        }
      return (
        <>
          <h1>{country.name.common}</h1>
            <li>
              Capital: {country.capital}
              <br/>
              Area: {country.area}m2
            </li>
          <h1>Languages</h1>
            <ul>
              {Object.values(country.languages).map((idioma, index) => {
                return (
                  <li key={index}>
                    {idioma}
                  </li>
                )
              })}
            </ul>
          <img src={country.flags.png} />
          <h1>Weather in {country.name.common}</h1>
           {weatherCity && (
              <div>
                <img src={`https://openweathermap.org/img/wn/${weatherCity.weather[0].icon}.png`} />
                <p>Temperature: {weatherCity.main.temp}º</p>
                <p>Wind: {weatherCity.wind.speed} m/s</p>
                <p>Description: {weatherCity.weather[0].description}</p>
            </div>
          )}
        </>
      )
    }
  }


  return (
    <>
      <h1>Country Data</h1>
      Find countries: <input value={searchValue} onChange={(e) => searchCountry(e, setSearchValue)} />
      {listaPaises()}
      {/* <ul>
        {filteredCountries.map((country) => {
          <li key={country.cca3}>
            {country.name.common}
          </li>
        })}
      </ul> */}
    </>
  )
}

export default App
