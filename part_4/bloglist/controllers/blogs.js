const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// Auth
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}




//GET all blogs

blogsRouter.get('/', async (request, response) => {
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

blogsRouter.get('/:id', async(request, response) => {
    const post = await Blog.findById(request.params.id)
    if(post) response.json(post)
    else response.status(404).json({error: 'User not found'})
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({error: "token invalid"})
    }

    if(!body.title || !body.author) {
        return response.status(400).json({error: "Title or Author missing"})
    }

    const user = await User.findById(decodedToken.id)

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

blogsRouter.put('/:id', async(request, response) => {
    
    const post = await Blog.findById(request.params.id)


    post.title = request.body.title
    post.author = request.body.author
    post.url = request.body.url
    post.likes = request.body.likes

    const savePost = await post.save()
    response.status(200).json(savePost)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    console.log("Id of the deleted post: ", id)

    if(!id){
        return response.status(400).json({server: "Title does not exist"})
    }

    const result = await Blog.findByIdAndDelete(id)
    console.log("Entry post deleted...", result.title)
    return response.status(204).end()
})

module.exports = blogsRouter