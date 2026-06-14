import { useState, useEffect } from "react"
import countriesService from './services/countries'
import { resume } from "react-dom/server"

const App = () => {

  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState(null)
  const [tooManyMatches, setTooManyMatches] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const [uniqueKey, setUniqueKey] = useState(0)
  const [displayCountry, setDisplayCountry] = useState(false)

  const limit = 10

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then(res => {
        //console.log(res.data)
        const filtered = res.data.map(c => ({
          "name": c.name,
          "ccn3": c.ccn3,
          "flag": c.flag
        }))
        setCountries(filtered)
      })
  }, [])

  if(!countries){
    return null
  }

  const handleOnChangeCountry = (event) => {
    event.preventDefault()
    console.log('searching a country', 'searching a country')
    setCountryName(event.target.value)
    searchCountries(event.target.value)
    
  }

  const searchCountries = (keyword) => {
    console.log('keyword ', keyword)
    if(countries){
        const queryResult = countries.filter(country => {
          
          /* if(country.name.common.toLowerCase().includes(keyword.toLowerCase())){
            console.log('country', country)
            console.log(country.name.common)
          } */
        
        return country.name.common.toLowerCase().includes(keyword.toLowerCase())
      })

      if(queryResult.length > 10) {
        setSearchResult([{name: {common: 'Too many matches, specify a filter'}, ccn3: 'ccn12'}])
        setTooManyMatches(true)
        const newKey = uniqueKey + 1
        setUniqueKey(newKey)
      } else if (queryResult.length > 1 && queryResult.length <= 10) {
        setSearchResult(queryResult)
        setTooManyMatches(false)
      } else if (queryResult.length === 1) {
            setDisplayCountry(true)
      } else {
        setSearchResult([{name: {common: 'No matches'}, ccn3: 'ccn34'}])
        setTooManyMatches(false)
        const newKey = uniqueKey + 1
        setUniqueKey(newKey)
      }
    }
      
  }

  return (
    <div>
      <h2>countries</h2>
      find countries<input value={countryName} onChange={handleOnChangeCountry}  />
      { !tooManyMatches ? 
        searchResult.map(res => {
          console.log(res.name.common)
          return (
          <p key={res.ccn3} >{res.name.common}</p>
        )})
      : (
          <p key={searchResult[0].ccn3}>{searchResult[0].name.common}</p>
        ) } 
    </div>
  )
}

export default App