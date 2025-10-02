require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const blogRouter = require('./routes/blogs')
const usersRouter = require('./controllers/users')


const mongoose = require('mongoose')
// const Blog = require('./models/blog')
// const { response } = require('../../part_3/phonebook/app')


const app = express()

//Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))







//Morgan config for logging
morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan((tokens, request, response) => [
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
    .then(()=> console.log("Connected to the DB"))
    .catch(err => console.log("DB connection error: ", err.message))

//Middleware error handle
app.use((error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).json({error: 'malformatted id'})
    } else if(error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if(error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique'})
    }

    response.status(500).json({error: 'something went wrong'})
})

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

// app export
module.exports = app