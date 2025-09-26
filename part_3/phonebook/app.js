require('dotenv').config()
require('express-async-errors')


const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Phone = require('./models/phone') // tu modelo Mongoose
const personsRoute = require('./routes/persons')

const app = express()
app.use('/api/persons', personsRoute)

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

//Morgan config for logging
morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan((tokens, request, response)=> [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens['response-time'](request, response), 'ms',
    tokens.body(request, response)
].join(' ')))




//MongoDB Conex
const url = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(()=> console.log("Connected to DB"))
    .catch(err => console.log("DB connection error: ", err.message))


// Funcion axilias para contar entradas
const numberOfEntries = async () => {
    const count = await Phone.countDocuments({})
    return count
}

//Routes

// app.get('/api/persons', async (request, response) => {
//     const search = request.query.search || ""

//     let persons
//     if(search === ""){
//         persons = await Phone.find({})
//         response.json(persons)
//     } else {
//         persons = await Phone.find({name:{ $regex: search, $options: "i"}})
//         response.json(Array.isArray(persons) ? persons : [])
//     }

// })

// app.get('/info', async (request, response) => {
//     const count = await numberOfEntries()
//     response.send(`<h1>Phonebook has info for  ${count} people</h1><p>${new Date()}<p>`)
// })

// app.get('/api/persons/:id', async (request, response) => {

//     const person = await Phone.findById(request.params.id)
//     if(person) response.json(person)
//     else response.status(404).json({ error: "Person not found"})

// })

// app.delete('/api/persons/:id', async (request, response) => {

//     const result = await Phone.findByIdAndDelete(request.params.id)
//     if(result) response.status(204).end()
//     else response.status(404).json({ error: "User not found"})
// })

// app.post('/api/persons', async (req, res) => {
//   const { name, number } = req.body
//   if (!name || !number) return res.status(400).json({ error: "Name or number missing" })


// const existing = await Phone.findOne({ name })
// if (existing) return res.status(400).json({ error: "User already exists" })

// const person = new Phone({ name, number })
// const saved = await person.save()
// res.json(saved)

// })


//Midddleware error handle
app.use((error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  res.status(500).json({ error: 'something went wrong' })
})




// app export

module.exports = app