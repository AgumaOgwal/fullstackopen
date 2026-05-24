import { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
      personService
      .getAllPersons()
      .then(response => setPersons(response.data))
  }, [])

  const handleOnChangeName = (event) => {
    console.log('input', event.target.value)
    setNewName(event.target.value)
  }

  const handleOnChangeNumber = (event) => {
    console.log('input', event.target.value)
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    
    const nameExists = persons.find(x => {
      console.log('x.name',x.name)
      console.log('newName', newName)
      return x.name === newName
  })

    console.log('nameExists', nameExists)
    if (nameExists !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else { 
      const newPerson = {
        name: newName,
        number: newNumber
      }

      useEffect, (
        personService
        .createPerson(newPerson)
        .then(response => {
           setPersons(persons.concat(response.data))
           setNewName('')
           setNewNumber('')
        }),[])

    }
  }

  const handleDelete = selectedPerson => {
    console.log('selectedPerson', selectedPerson)
    personService.deletePerson(selectedPerson)
    .then(response)
  }



  const filterNames = (event) => {
    setFilterBy(event.target.value)
    const filterValue = event.target.value
    console.log('filter by', filterValue)
    const boss = "BoSs"
    console.log(filterValue.toLowerCase())
    const filteredList = persons.filter((person) => {
      console.log('Person', person.name)
      return person.name.toLowerCase().includes(filterValue.toLowerCase())
    })
    console.log('Filtered List', filteredList)
    setPersons(filteredList)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filterBy={filterBy} filterNames={filterNames} />
      <h2>add new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleOnChangeName={handleOnChangeName}
        newNumber={newNumber}
        handleOnChangeNumber={handleOnChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App