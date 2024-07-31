const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog)=>{return sum + blog.likes}, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
  ? undefined
  : blogs.reduce((fav, blog) => fav.likes > blog.likes ? fav : blog)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    const author_dictionary = lodash.countBy(blogs, (blog) => blog.author)
}

module.exports = {
dummy, totalLikes, favoriteBlog, mostBlogs
}