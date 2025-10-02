const express = require('express')
const Blog = require('../models/blog')
const { response } = require('../app')
const User = require('../models/user')

const router = express.Router()


//GET all blogs

router.get('/', async (request, response) => {
    const search = request.query.search || ""

    if(!search.trim()){
        const posts = await Blog.find()
        return response.json(posts)
    }

    const posts = await Blog.find({
        $or: [
            { title: {$regex: search, $options: "i"}},
            { author: {$regex: search, $options: "i"}}
        ]
    })
    response.json(posts)
})

//GET by ID

router.get('/:id', async(request, response) => {
    const post = await Blog.findById(request.params.id)
    if(post) response.json(post)
    else response.status(404).json({error: 'User not found'})
})

router.post('/', async (request, response) => {
    const body = request.body

    if(!body.title || !body.author) {
        return response.status(400).json({error: "Title or Author missing"})
    }

    const user = await User.findById(body.userId)

    if(!user) {
        return response.status(400).json({error: 'User not found'})
    }
    

    const existing = await Blog.findOne({title: body.title})
    if(existing) {
        return response.status(400).json({error: "Title already exists"})
    }
    const post = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedPost = await post.save()
    user.posts = user.posts.concat(savedPost._id)
    await user.save()
    
    response.status(201).json(savedPost)
})

router.put('/:id', async(request, response) => {
    
    const post = await Blog.findById(request.params.id)


    post.title = request.body.title
    post.author = request.body.author
    post.url = request.body.url
    post.likes = request.body.likes

    const savePost = await post.save()
    response.status(200).json(savePost)
})

router.delete('/:id', async (request, response) => {
    const id = request.params.id
    console.log("Id of the deleted post: ", id)

    if(!id){
        return response.status(400).json({server: "Title does not exist"})
    }

    const result = await Blog.findByIdAndDelete(id)
    console.log("Entry post deleted...", result.title)
    return response.status(204).end()
})

module.exports = router