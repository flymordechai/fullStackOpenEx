const Blog = require('../models/blogs')
const User = require('../models/users')

const initialBlogs = [
    {
        title: "Bens Blog",
        author: "Benson",
        url: "www.bensblog.com",
        likes: 23
    },
    {
        title: "Benitos Blog",
        author: "Benny",
        url: "www.bensblog.com",
        likes: 25
    },
  ]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "to be removed",
    author: "alias",
    url: "donotvist.com",
    likes: 0
})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}