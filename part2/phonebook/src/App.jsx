import { useState } from 'react'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1232435234' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

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
    const nameExists = persons.find(x => x.name === newName)
    console.log('nameExists', nameExists)
    if (nameExists !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = [...persons, { name: newName, number: newNumber }]
      console.log('New Persons', newPersons)

      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
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
    /* if (filteredList.length > 0) {
      setPersons(filteredList)
    } else { setPersons([persons]) } */

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
      <Persons persons={persons} />
      {/* {persons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )} */}
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App