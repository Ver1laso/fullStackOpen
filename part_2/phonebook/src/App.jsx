import { useState, useEffect } from "react";
import axios from 'axios'
import { handleNameChange, handlePhoneChange, searchPerson} from './components/phonebook';




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")


  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("Respuesta obtenida")
        setPersons(response.data)
      })
  }

  useEffect(hook,[])


  const addUser = (event) => {
    event.preventDefault()
    if(newName.trim() === ""){
      return
    }
    if(persons.find(person => person.name === newName)){
      return alert(`The name: ${newName} is already in the phonebook`)
    }

  const nameObject = {
      name: newName,
      number: newPhoneNumber,
      id: String(persons.length + 1)
    }
    setPersons(persons.concat(nameObject))
    setNewName("")
    setNewPhoneNumber("")
  }


  const personsToShow = searchTerm === "" ? persons 
  : persons.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        {/* Si la funcion se queda dentro de APP se haria como aqui */}
        {/* <input type="search" onChange={searchPerson}/> */}
        {/* Al sacar la funcion de App hay que manejarlo de esta manera */}
        <input value={searchTerm} onChange={(e) => searchPerson(e, setSearchTerm)} />
      </div>
      <h2>Add new</h2>
      <form onSubmit={addUser}>
        <div>
          {/* Si la funcion se queda dentro de APP se haria como aqui */}
          {/* name: <input value={newName} onChange={handleNameChange} required/> */} 
          {/* Al sacar la funcion de App hay que manejarlo de esta manera */}
          name: <input value={newName} onChange={(e) => handleNameChange(e, setNewName)} />
        </div>
        <div>
          {/* Si la funcion se queda dentro de APP se haria como aqui */}
          {/* number: <input value={newPhoneNumber} onChange={handlePhoneChange} required/> */}
          {/* Al sacar la funcion de App hay que manejarlo de esta manera */}
          number: <input value={newPhoneNumber} onChange={(e) => handlePhoneChange(e, setNewPhoneNumber)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {personsToShow.map((person) => (
            <li key={person.id}>
              <div>{person.name}:  {person.number}</div>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default App