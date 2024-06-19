import { useState, useEffect } from 'react'
import personService from './services/person'

const AddPersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value = {props.newNumber} onChange={props.handleNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Filter = (props) => {
  return (
    <div>filter shown with: <input value={props.filter} onChange={props.handleFilterChange}/></div>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <li>{person.name}  {person.number} <button onClick = {deletePerson}> delete? </button> </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
        setPersonsToShow(persons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.filter((person) => person.name === personObject.name).length !=0 ) {
      alert(`\'${newName}\' is already added to phonebook`)
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setFilter('')
        setPersonsToShow(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

    }
  }

  const deletePersonRecord = (id) => {
    if (window.confirm(`Do you really want to delete \`${persons.find(person => person.id === id).name}\`?`)) {
      personService
      .destroy(id)
      .then(removedPerson => {
        let remainingPersons = persons.filter(n => n.id != id)
        setPersons(remainingPersons)
        setPersonsToShow(
          remainingPersons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
        )
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setPersonsToShow(
      persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ul>
        {personsToShow.map(person => <Person key={person.name} person={person} deletePerson={() => deletePersonRecord(person.id)} /> )}
      </ul>
    </div>
  )
}

export default App