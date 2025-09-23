const blog = require("../models/blog");

const dummy = (blog) => {
    return 1
}

const totalLikes = (blog) => {
    // return 5
    return blog.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blog) => {
    
    return blog.reduce((max, current) => 
        current.likes > max.likes ? current : max
    )
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}