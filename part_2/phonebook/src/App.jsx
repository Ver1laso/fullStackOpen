import { useState, useEffect } from "react";
import axios from 'axios'
import { handleNameChange, handlePhoneChange, searchPerson} from './components/phonebook';
import phonebookServices from "./services/phonebookServices";
import './index.css'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState("some error happened...")
  const [message, setMessage] = useState(null)


  const hook = () => {
    // axios
      // .get("http://localhost:3001/persons")
      // .then(response => {
      //   console.log("Respuesta obtenida")
      //   setPersons(response.data)
      console.log("Fetching persons from backend...");
      phonebookServices
      .getAll()
      .then(initialNames => {
        console.log("Backend returned:", initialNames); 
        setPersons(initialNames)
      })
  }

  useEffect(hook,[])

  const addUser = (event) => {
    event.preventDefault()
    if(newName.trim() === ""){
      return
    }
    if(persons.find(person => person.name === newName)){
      window.confirm(`${person.name} is already added to phonebook, replace the old number with the new one?`)
      phonebookServices
        .update(person.number)
        .then(newNumber => {
          setPersons(persons.concat(number))
        })
    }

    const nameObject = {
      name: newName,
      number: newPhoneNumber,
      // id: String(persons.length + 1)
    }

    if(nameObject.name.length <= 3) {
      window.alert("Name needs to have 3 characters or more")
      return
    }

    phonebookServices
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewPhoneNumber("")
        setMessage(`Added ${newName}`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const Button = (props) => {
    return (
      <button 
        className="delete-button"
        onClick={props.onClick}>
        Delete
      </button>
    )
  }

  const handleDelete =({id, name}) => {
    console.log(`La id es: `, id)
    console.log(`El nombre es: `, name)

    if(window.confirm(`Do you really want to delete ${name}"?`)){
      phonebookServices
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const personsToShow = searchTerm === "" ? persons 
  : persons.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))





const AddNotificacion = ({message}) => {
  if(message === null){
    return null
  }
  return (
    <div className="userAdded">
      {message}
    </div>
  )
}


const Footer = () => {
  const footerStyle = {
    color: "darkblue",
    fontStyle: "italic",
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br/>
      <em>Phonebook app, Department of Computer Science, University of Helsinki 2025</em>
    </div>
  )
}


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
      <AddNotificacion message={message} />
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
              {person.name}: {person.number} &nbsp; <Button onClick={() => handleDelete(person)}/>
              <br/>
            </li>
          ))}
        </ul>
        <Footer />
    </div>
  )
}

export default App