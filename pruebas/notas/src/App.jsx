import React, { useState, useEffect } from 'react'
import axios from "axios"
import Note from './components/Note'




function App(props) {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)


  const hook = () => {
    console.log("effect ==>")
    axios
      .get("http://localhost:3001/notes")
      .then(response => {
        console.log("promise fulfilled")
        setNotes(response.data)
      })
  }

  useEffect(hook, [])
 

  const addNote = (event) => {
    event.preventDefault()

    if(newNote.trim() === ''){
      return
    }

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }


  /* tambien se puede escribir notes.filter(note => note.important) ya que el valor
  de note.important es true o false.  
  */

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true) 

  return (
    <>
      <div>
        <h1>Notes</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? "important" : "all"}
          </button>
        </div>
        <ul>
          {notesToShow.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}/>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  )

  // return (
  //   <>
  //     <form action="/my=handling-form-page" method="post">
  //       <ul>
  //         <li>
  //           <label for="name">Name: </label>
  //           <input type="text" id="name" name="user_name" placeholder='blabla'/>
  //         </li>
  //         <li>
  //           <label for="mail">Email: </label>
  //           <input type="email" id="email" name="user_email" placeholder='blabla@gmail.com'/>
  //         </li>
  //         <li>
  //           <label for="phone">Phone Numer: </label>
  //           <input type="tel" id="phone" name="user_phoneNumber" pattern='[0-9]{9}' placeholder="123456789"/>
  //         </li>
  //         <li>
  //           <label for="msg">Message: </label>
  //           <textarea id="msg" name="user_message" rows="5" cols="40"></textarea>
  //         </li>
  //         <li>
  //           <label for="url">Url</label>
  //           <input type="url" id="url" name="url" />
  //           <label for="search">Search</label>
  //           <input type="search" id="search" name="search" />
  //           <label for="date">Enteder date: </label>
  //           <input type="date" name="date" id="date" />

  //         </li>
  //         <li class="button">
  //           <button type="submit">Send the message!</button>
  //         </li>
  //       </ul>
  //     </form>
  //   </>
  // )



}

export default App
