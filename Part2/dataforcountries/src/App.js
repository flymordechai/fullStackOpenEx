import { useState, useEffect } from 'react'
import Countries from './Countries'
import Filter from './Filter'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleNewFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleShowButton = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.includes(newFilter))


  return (
    <div>
      <Filter value={newFilter} onChange={handleNewFilter}/>
      <Countries mapValue={countriesToShow} buttonBehaviour={handleShowButton}/>
    </div>
  )
}


export default App