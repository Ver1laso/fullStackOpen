const express = require('express')
const Phone = require('../models/phone')


const router = express.Router()

//GET all persons

router.get('/', async (request, response) => {

    const search = request.query.search || ""
    
    let persons;
    if(search === "") {
        persons = await Phone.find({})
        response.json(persons)
    } else {
        persons = await Phone.find({name:{$regex: search, $options: "i"}})
        response.json(Array.isArray(persons) ? persons : [])
    }
})

//GET byt ID

router.get('/:id', async(request, response) => {
    const person = await Phone.findById(request.params.id)
    if(person) response.json(person)
    else response.status(404).json({error: "User not found"})
})

//DELETE by ID

router.delete('/:id', async(request, response) => {
    const person = await Phone.findByIdAndDelete(request.params.id)
    if(person) response.status(204).end()
    else response.status(404).json({error: "User not found"})
})

//POST

router.post('/', async(request, response) => {
    const {name, number} = request.body

    if(!name || !number) return response.status(400).json({error: "Name or number missing"})

    const existing = await Phone.findOne({name})
    if(existing) return response.status(400).json({error: "User already existis"})

    const person = new Phone({name, number})
    const saved = await person.save()
    response.json(saved)
})

module.exports = router