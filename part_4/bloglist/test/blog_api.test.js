const { test, beforeEach, after, describe} = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


/*Para resetear la DB y que tenga la informacion correcta antes de lanzar los test
creamos los datos a meter en la DB
*/

const initialPosts = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: "7"
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: "12"
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: "5"
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: "10"
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: "0"
    },
        {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: "2"
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log("Deleteing data from DB...")
    await Blog.insertMany(initialPosts)
    console.log("Inserting new data into the db for testing...")
})

describe('When there is initially some notes saved', ()=> {
    test('Post are returned as json', async () => {
        console.log("Running first test...")
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        console.log("First test done")
    })

    test('All 6 post are returned', async() => {
        console.log("Running second test...")
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, 6)
        console.log('Second test done')
    })

    test('a specific title is within the returned titles', async() => {
        console.log('Running third test...')
        const response = await api.get('/api/blogs')

        const contents = response.body.map(e => e.title)
        assert.strictEqual(contents.includes('First class tests'), true)
        console.log('Third test done')
    })
})


describe('viewing a specific post', ()=>{

    test('returns a single blod by id', async () => {
        const response = await api.get('/api/blogs')

        const blogToView = response.body[0]

        console.log("ID en cuestion", blogToView.id)

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })


    test('fails with statuscode 400 id is invalid', async() => {
        const invalidId = '12345invalid'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})


describe('addition of a new note', ()=> {
    test('Succeed with valid data', async ()=>{
        
        const newPost ={
            title: "Java First Steps",
            author: "Manoligo Gafotas",
            url: "http:www.firstJavaSteps.com",
            likes: "50"
        }

        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const postAtEnd = await helper.blogsInDb()
        assert.strictEqual(postAtEnd.length, helper.initialPosts.length +1)

        const titles = postAtEnd.map(p => p.title)
        assert(titles.includes('Canonical string reduction'))
    })


    test('fails with status code 400 if data invalid', async ()=> {
        const newPost = {
            title: "testeando la vida loca"
        }

        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(400)

        const postAtEnd = await helper.blogsInDb()

        assert.strictEqual(postAtEnd.length, helper.initialPosts.length)
    })
})

describe('deletion of a note', ()=> {

    test('succeed with status code 204 if id is valid', async ()=> {
        const postAtStart = await helper.blogsInDb()
        const postToDelete = postAtStart[0]

        await api
            .delete(`/api/blogs/${postToDelete.id}`)
            .expect(204)

        const postAtEnd = await helper.blogsInDb()

        assert.strictEqual(postAtEnd.length, helper.initialPosts.length -1)

        const title =postAtEnd.map(p => p.title)
        assert(!title.includes(postToDelete.title))
    })
})


after(async () => {
    await mongoose.connection.close(true)
})