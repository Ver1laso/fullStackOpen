require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const morgan = require('morgan')

require('./mongo')



app.use(cors())
app.use(express.json())

morgan.token('body', request => {
    return JSON.stringify(request.body)
})

app.use(morgan(function(tokens, request, response){
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens['response-time'](request, response), 'ms',
        tokens.body(request, response)
    ].join(' ');
}));


app.get('/api/blogs', async (request, response) =>{

    const search = request.query.search || " " // sino hay busqueda muestra todo
    try{
        if (!search.trim()){
            const posts = await Blog.find()
            return response.json(posts)
        }


        const posts = await Blog.find({
            $or:[
                { title: { $regex: search, $options: "i"}},
                { author: { $regex: search, $options: "i"}}
            ]
            
        })
        response.json(posts)
    } catch (error) {
        response.status(500).json({ error: error.message})
    }
})

app.post('/api/blogs', async (request, response) => {
    const body = request.body

    if(!body.title || !body.author) {
        return response.status(400).json({error: "Title or Author missing"})
    }

    try{
        const existing = await Blog.findOne({title: body.title})
        if(existing){
            return response.status(400).json({error: "Title already exists"})
        }

        const post = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        })

        const savedPost = await post.save()
        response.json(savedPost)
    } catch (error) {
        console.error("Error saving post: ", error)
        response.status(500).json({error: "Something went wrong saving post"})
    }
})

app.delete('/api/blogs/:id', async (request, response) => {
    const id = request.params.id
    console.log("esta es la ID", id)

    if(!id) {
        return response.status(400).json({server: "Title does not exist"})
    }

    try {
        const result = await Blog.findByIdAndDelete(id)

        if(result){
            console.log("Blog post deleted: ", result.title)
            return response.status(200).end()
        } else {
            return response.status(400).json({error: "Post not found"})
        }
    } catch (error) {
        console.error("Error deleting blog post: ", error)
        return response.status(500).json({error: "Something went wrong"})
    }
})


app.use(express.static('dist'))
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})