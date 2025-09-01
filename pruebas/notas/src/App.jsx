import React, { useState, useEffect } from 'react'
import axios from "axios"
import noteService from './services/noteService'




function App(props) {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)



  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(nota => nota.id === id)
    const changeNote = {...note, important: !note.important}
    // axios
    //   .put(url, changeNote)
    noteService
      .update(id, changeNote)
      // .then(response => {
      //   setNotes(notes.map(note => note.id !== id ? note: response.data))
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !==id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
      console.log(changeNote)
  }

  const hook = () => {
    // axios
    //   .get("http://localhost:3001/notes")
    noteService
      .getAll()
      // .then(response => {
      //   setNotes(response.data)
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])

  // useEffect(() => {
  //   noteService
  //     .getAll()
  //     .then(response => {
  //       setNotes(response.data)
  //     })
  // },[])
 

  const addNote = (event) => {
    event.preventDefault()

    if(newNote.trim() === ''){
      return
    }

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    // axios
    //   .post("http://localhost:3001/notes", noteObject)
    noteService
      .create(noteObject)
      // .then(response => {
      //   setNotes(notes.concat(response.data))
      //   setNewNote("")
      ,then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote("")
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }


  /* tambien se puede escribir notes.filter(note => note.important) ya que el valor
  de note.important es true o false.  
  */

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true) 

  const Note = ({note, toggleImportance}) => {
    const label = note.important ? "make not important" : "make important"

    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }

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
            <Note 
              key={note.id} 
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}/>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  )

}

export default App
