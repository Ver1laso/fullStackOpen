require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Blog = require('./models/blog')
const blogRoute = require('./routes/blogs')
const { response } = require('../../part_3/phonebook/app')

const app = express()


//MIddleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.use('/api/blogs', blogRoute)

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
    }

    if(error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    response.status(500).json({error: 'something went wrong'})
})

// app export
module.exports = app