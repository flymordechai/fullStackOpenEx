const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const decodedToken = jwt.verify(response.token, process.env.SECRET)
  console.log(decodedToken.id)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    console.log(blog)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
})
  
blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(response.token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
    } else {
      return response.status(401).json({ error: 'user does not have access to modify this content' })
    }
    response.status(204).end()
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(response.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()


      response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const updatedBlog =  await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  )
  response.status(204).json(updatedBlog)
})

module.exports = blogsRouter