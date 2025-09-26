const app = require('./app')
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})




// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')
// const app = express()
// const http = require("http")
// const { nextTick } = require('process')
// const { json } = require('stream/consumers')
// app.use(cors())

// const uri = process.env.MONGO_URI
// mongoose.set('strictQuery', false)
// mongoose.connect(uri)
//     .then(() =>{
//         console.log("Connected to the db...")
//     })
//     .catch((error) => {
//         console.log("Error connecting to the db: ", error.message)
//     })


// const Phone = require('./models/phone')
// app.use(express.json())
// const morgan = require('morgan')
// app.use(express.static('dist'))


// morgan.token('body', request => {
//     return JSON.stringify(request.body)
// })

// app.use(morgan(function(tokens, request, response){
//     return [
//         tokens.method(request, response),
//         tokens.url(request, response),
//         tokens.status(request, response),
//         tokens['response-time'](request, response), 'ms',
//         tokens.body(request, response)
//     ].join(' ');
// }));

// app.use(cors())



// const generateId = () => {

//     let newId
//     do{
//         newId = Math.floor(Math.random() * 1000)
//     } while (persons.find(p => p.id === newId))
//     return newId
// }

// const numberOfEntries = () => {
//     return persons.length
// }



// app.get('/api/persons', async (request, response) => {
//     const search = request.query.search || "" // si no hay busqueda, lo devuelve todo

//     try {
//         const persons = await Phone.find({
//             name: {$regex: search, $options: "i"} //No afectan las mayusculas
//         })
//         // response.json(persons)//devuelve un array 
//         response.json(Array.isArray(persons) ? persons : [])
//     } catch (error) {
//         response.status(500).json({error: "Failed to find: ", search})
//     }
// })



// app.get('/info', (request, response) => {
//     response.send(
//         `<h1>Phonebook has info for ${numberOfEntries()} people</h1>
//          <p>${new Date()}</p>`
//     )
// })

// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const people = persons.find(person => {
//         return person.id === id
//     })
//     if (people) {
//         response.json(people)
//     } else {
//         response.status(404).send("The person you are looking for does not exist")
//     }
// })



// app.delete('/api/persons/:id', async (request, response) => {
//     const id = request.params.id

//     if(!id) {
//         return response.status(400).json({error: "User does not exists"})
//     }

//     try{
//         const result = await Phone.findByIdAndDelete(id)

//         if(result) {
//             console.log("User deleted: ", result.name)
//             return response.status(204).end()
//         } else {
//             return response.status(404).json({error: "User not found"})
//         }
//     } catch (error) {
//         console.error("Error deleting user: ", error)
//         return response.status(500).json({error: "Someting went wrong"})
//     }
// })

// app.post('/api/persons', async (request, response) => {
//     const body = request.body

//     if(!body.name || !body.number) {
//         return response.status(400).json({error: "Name or number missing"})
//     }

//     try {
//         const existing = await Phone.findOne({name: body.name})
//         if(existing) {
//             return response.status(400).json({error: "User already exists"})
//         }

//         const person = new Phone({
//             name: body.name,
//             number: body.number,
//         })

//         const savedPhone = await person.save()
//         response.json(savedPhone)
//     } catch (error) {
//         console.error("Error saving person: ", error)
//         response.status(500).json({error: "Something went wrong"})
//     }
// })



// // For online deploiment render
// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })