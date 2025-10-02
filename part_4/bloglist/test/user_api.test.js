const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const { test, beforeEach, after, describe} = require('node:test')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const assert = require('assert')

describe('when there is initially one user in db', () => {

    beforeEach(async ()=>{
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 12)
        const user = new User({ username: 'root', passwordHash})

        await user.save()
    })


    test('creating succeeds with a fresh username', async ()=> {

        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Manolito',
            name: 'Manolito Gafotas',
            password: 'cocoloco',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.usersInDb()
        assert.strictEqual(userAtEnd.length, userAtStart.length + 1)

        const usernames = userAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))

    })

})


after(async () => {
    await mongoose.connection.close(true)
})