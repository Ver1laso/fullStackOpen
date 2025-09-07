const express = require('express')

const app = express()

const http = require("http")
const { nextTick } = require('process')
const { json } = require('stream/consumers')
app.use(express.json())
const morgan = require('morgan')



morgan.token('body', request => {
    return JSON.stringify(request.body)
})

app.use(morgan(function(tokens, request, response){
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens['response-time'](request, response), 'ms',
        tokens.body(request, response)
    ].join(' ');
}));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {

    let newId
    do{
        newId = Math.floor(Math.random() * 1000)
    } while (persons.find(p => p.id === newId))
    return newId
}

const numberOfEntries = () => {
    return persons.length
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(
        `<h1>Phonebook has info for ${numberOfEntries()} people</h1>
         <p>${new Date()}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const people = persons.find(person => {
        return person.id === id
    })
    if (people) {
        response.json(people)
    } else {
        response.status(404).send("The person you are looking for does not exist")
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter( person => person.id !== id)

    response.status(204).send("usuario borrado")
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name) {
        return response.status(400).json({
            error: "missing name"
        })
    }
    if (persons.find(n => n.name === body.name)){
        return response.status(400).json({
            error: "User already exists"
        })
    }

    console.log(body)



    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)