import { useState } from 'react'

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

const Person = ({ person }) => {
  return (
    <li>{person.name}  {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newName, setNewName] = useState('Who\'s New?')
  const [newNumber, setNewNumber] = useState('+0-000-000-0000')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.filter((person) => person.name === personObject.name).length !=0 ) {
      alert(`\'${newName}\' is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setFilter('')
      setPersonsToShow(persons.concat(personObject))
      setNewName('Who\'s Next?')
      setNewNumber('+0-000-000-0000')
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
        {personsToShow.map(person => <Person key={person.name} person={person} /> )}
      </ul>
    </div>
  )
}

export default App