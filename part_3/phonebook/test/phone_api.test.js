const { test, beforeEach, after } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Phone = require('../models/phone')

const api = supertest(app)


/*Para resetear la DB y que tenga la informacion correcta antes de lanzar los test
creamos los datos a meter en la DB
*/

const initialPersons = [
    { name: 'Manolito Gafotas', number: '32-45-123456'},
    { name: 'Bob Almeja', number: '12-32-678234'},
    { name: 'Coco Pinaple', number: '99-45-354798'}
]

beforeEach(async () => {
    await Phone.deleteMany({})
    console.log("Deleting data from DB...")
    await Phone.insertMany(initialPersons)
    console.log("New data added to the DB...")
})

test('Phones are returned as json', async () => {
    console.log("Running first test...")
    await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    console.log("First test done")
})

test('there are three phones', async () => {
    console.log("Running second test...")
    const response = await api.get('/api/persons')

    assert.strictEqual(response.body.length,3)
    console.log("Second test done")
})

test('the first phone is about HTTP methods', async () => {
    console.log("Running third test...")
    const response = await api.get('/api/persons')

    const contents = response.body.map(e => e.name)
    assert.strictEqual(contents.includes('Manolito Gafotas'), true)
    console.log("Third test done")
})

after(async () => {
    await mongoose.connection.close()
})