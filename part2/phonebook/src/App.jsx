import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name}  {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+1-720-335-4598' }
  ]) 
  const [newName, setNewName] = useState('Who\'s New?')
  const [newNumber, setNewNumber] = useState('+0-000-000-0000')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value = {newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.name} person={person} /> )}
      </ul>
    </div>
  )
}

export default App