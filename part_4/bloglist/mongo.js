require('dotenv').config();
const mongoose = require('mongoose')

const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(() => {
        console.log('Connection to the DB stablish...')
    })
    .catch((error) => {
        console.log('Error connectiong to the DB: ', error.message)
    })


