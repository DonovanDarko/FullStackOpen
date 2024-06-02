import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('Who\'s New?')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }

    setPersons(persons.concat(personObject))
    setNewName('Who\'s Next?')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
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