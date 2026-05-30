import { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [deleted, setDeleted] = useState(false)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
      personService
      .getAllPersons()
      .then(response => {
        setPersons(response.data)
        setDeleted(false)
        setUpdated(false)
        })
  }, [deleted, updated])

  const handleOnChangeName = (event) => {
    //console.log('input', event.target.value)
    setNewName(event.target.value)
  }

  const handleOnChangeNumber = (event) => {
    //console.log('input', event.target.value)
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    
    const nameExists = persons.find(x => x.name === newName)

    console.log('nameExists', nameExists)
    if (nameExists !== undefined) {
      if (nameExists.number === newNumber) {
        alert(`${newName} is already added to phonebook`)
        return
      } else {
        if (window.confirm(`${newName} is already added to phonebook. Replace new number with old one ?`)) {
          
          const newPerson = {
            name: newName,
            number: newNumber,
            id: nameExists.id
          }

          personService
          .updatePerson(newPerson)
          .then(response => {
            setUpdated(true)
            console.log('updated response', response.data)
          })
        }
      }
      

    } else { 
      const newPerson = {
        name: newName,
        number: newNumber
      }

        personService
        .createPerson(newPerson)
        .then(response => {
           setPersons(persons.concat(response.data))
           setNewName('')
           setNewNumber('')
        })
    }
  }

  const handleDelete = selectedPerson => {
    if (window.confirm(`Delete ${selectedPerson.name} ?`)){
      personService.deletePerson(selectedPerson)
      .then(response => setDeleted(true))
    } 
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
      <h1>Phonebook</h1>
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