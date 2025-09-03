const express = require('express')
const app = express()

const http = require("http")
const { json } = require('stream/consumers')

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2, 
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most importante methods of HTTP protocol",
        important: true
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {"Content-Type": `application/json`})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => {
        return note.id === id
    })
    if (note) {
        response.json(note)
    } else {
        response.status(404).send("probadno la vida loca")
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).send("nota borrada")
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    
    const body = request.body

    if(!body.content) {
        return response.status(400),json({
            error: "content missing"
        })
    }

    const note = {
        content: body.content,
        important: body.important ?? false, /* cualquier cosa que este delante de ?? que no sea null/undefined
         devolvera lo que hay en el primer elemento pero sino es el caso devolvera lo que hay en el seundo elemento*/
        id: generateId()
    }

    notes = notes.concat(note)

    response.json(note)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)