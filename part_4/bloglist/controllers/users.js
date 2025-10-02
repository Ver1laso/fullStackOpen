const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('posts', { title: 1, url: 1, likes: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {

    console.log("BODY RECIBIDO:", request.body)
    const { username, name, password } = request.body

    if (!username || !password) {
        return response.status(400).json({ error: 'username and password required' })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({ error: 'username must be unique' })
    }

    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})


module.exports = usersRouter
