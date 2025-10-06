
// const usersRouter = require('express').Router()
// const { response } = require('../app')
// const User = require('../models/user')


// usersRouter.get('/', async (request, response) => {
//     const users = await User.find({}).populate('posts', {title: 1, url: 1, likes: 1})
//     response.json(users)
// })

// usersRouter.post('/', async (request, response) => {
//     const {username, name, password} = request.body

//     const user = new User({username, name, passwordHash: 'hashedpassword'})
//     const savedUser = await user.save()
//     response.status(201).json(savedUser)
// })

// module.exports = usersRouter