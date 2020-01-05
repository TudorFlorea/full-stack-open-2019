import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { initBlogs, createBlog, updateBlog, deleteBlog } from '../store/actions/blogActions'

import BlogsList from '../components/BlogsList'
import Heading from '../components/Heading'
import AddBlogForm from '../components/AddBlogForm'

const Dashboard = (props) => {

  const handleBlogAdded = async newBlog => {
    props.createBlog(newBlog)
  }

  const handleLikeClick = newBlog => {
    props.updateBlog(newBlog)
  }

  const handleBlogDelete = id => {
    props.deleteBlog(id)
  }

  const sortBlogs = unsortedBlogs => {
    return unsortedBlogs.sort((a, b) => {
      if (a.likes < b.likes) {
        return 1
      } else {
        return -1
      }
    })
  }

  useEffect(() => {
    props.initBlogs()
  }, [])

  return (
    <div className="App">
      <Heading text="Blog app" />
      {props.auth.user && <AddBlogForm onBlogAdded={handleBlogAdded} />}
      <BlogsList
        blogs={sortBlogs(props.blogs)}
        onLikeClick={handleLikeClick}
        onBlogDelete={handleBlogDelete}
        user={props.auth.user}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initBlogs: () => dispatch(initBlogs()),
    createBlog: blog => dispatch(createBlog(blog)),
    deleteBlog: id => dispatch(deleteBlog(id)),
    updateBlog: blog => dispatch(updateBlog(blog))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
