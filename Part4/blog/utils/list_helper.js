var _ = require('lodash')

const dummy = (blogs) => {
      return 1
  }
  
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
      ? 0
      : blogs.reduce(reducer, 0)
  }

  const favoriteBlog = (blogs) => {
    const reducer = (acc, item) => {
        if (item.likes > acc.likes) {
          return item
        } else {
          return acc
        }
      }
      if (blogs.length === 0) {
          return 0
      } else if (blogs.length === 1) {
          return blogs[0]
      } else {
          return blogs.reduce(reducer, {likes: 0})
      }
  }

  const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return {author: blogs[0].author, blogs: 1}
    } else {
        var authorCounts = _.countBy(blogs, 'author')
        var authorMostBlogs = Object.keys(authorCounts).reduce(function(a, b){ return authorCounts[a] > authorCounts[b] ? a : b })
        return {author: authorMostBlogs, blogs: authorCounts[authorMostBlogs]}
    }
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return {author: blogs[0].author, likes: blogs[0].likes}
    } else {
        var output =
          _(blogs)
            .groupBy('author')
            .map((objs, key) => ({
              'author': key,
              'likes': _.sumBy(objs, 'likes') }))
            .value();

        return _.maxBy(output, 'likes')
    }
}


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }

