import { useState, useEffect } from 'react'

import personService from './services/persons'
import Notification from './Notification'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const namesToShow = persons.filter(person => person.name.includes(newFilter))

  const updatePerson = (existingName) => {
    const existingDetails = persons.find(p => p.name === existingName)
    const id = existingDetails.id
    const changedPerson = {...existingDetails, number : newNumber}
    
    personService
        .update(id, changedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response.data))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotificationMessage(`The person ${changedPerson.name} was already deleted from the server`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(persons => persons.id !== id))
          setNewName('')
          setNewNumber('')
        })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const namesList = persons.map(person => person.name)
    
    if (namesList.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(newName)
      }
    } else {
      const newObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
      setNotificationMessage(`Added ${newObject.name}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      console.log('button clicked', persons, event.target)
      console.log('persons set', persons, event.target)
    }
  }

  const removePerson = (event) => {
    if (window.confirm(`delete ${event.target.name} ?`)) {
    const id = parseInt(event.target.id)
    personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
          setNewName('')
          setNewNumber('')
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Filter value={newFilter} onChange={handleNewFilter}/>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} 
            nameValue={newName} 
            nameOnChange={handleNewName}
            numberValue={newNumber} 
            numberOnChange={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons mapValue={namesToShow} buttonFunction={removePerson}/>
    </div>
  )
}

export default App