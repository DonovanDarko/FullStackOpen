const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()
  
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const url = process.env.MONGODB_URL_part1 + password + process.env.MONGODB_URL_part2

mongoose.connect(url)
.then(result => {
console.log('connected to MongoDB')
})
.catch(error => {
console.log('error connecting to MongoDB:', error.message)
})

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

module.exports = mongoose.model('Blog', blogSchema)