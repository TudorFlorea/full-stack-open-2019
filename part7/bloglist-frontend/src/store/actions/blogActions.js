import BlogsService from '../../services/blogs'
import { CREATE_NOTIFICATION, CLEAR_NOTIFICATION } from './notificationActions'

export const INIT_BLOGS = 'INIT_BLOGS'
export const CREATE_BLOG = 'CREATE_BLOG'
export const DELETE_BLOG = 'DELETE_BLOG'
export const UPDATE_BLOG = 'UPDATE_BLOG'
export const ADD_BLOG_COMMENT = 'ADD_BLOG_COMMENT'

export const initBlogs = () => {
  return async dispatch => {
    const initalBlogs = await BlogsService.getAll()
    dispatch({
      type: INIT_BLOGS,
      data: initalBlogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await BlogsService.addBlog(blog)
      dispatch({
        type: CREATE_BLOG,
        data: newBlog
      })
      dispatch({
        type: CREATE_NOTIFICATION,
        data: {
          success: true,
          content: `You created "${newBlog.title}"!`
        }
      })
    } catch (err) {
      dispatch({
        type: CREATE_NOTIFICATION,
        data: {
          success: false,
          content: 'Something went wrong! Please try again!'
        }
      })
    } finally {
      setTimeout(() => {
        dispatch({
          type: CLEAR_NOTIFICATION
        })
      }, 5000)
    }
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    try {
      const deletedBlog = await BlogsService.deleteBlog(id)
      dispatch({
        type: DELETE_BLOG,
        data: deletedBlog
      })
      dispatch({
        type: CREATE_NOTIFICATION,
        data: {
          success: false,
          content: `You deleted "${deletedBlog.title}"!`
        }
      })
    } catch (err) {
      dispatch({
        type: CREATE_NOTIFICATION,
        data: {
          success: false,
          content: 'Something went wrong! Please try again!'
        }
      })
    } finally {
      setTimeout(() => {
        dispatch({
          type: CLEAR_NOTIFICATION
        })
      }, 5000)
    }
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await BlogsService.updateBlog(blog)
      dispatch({
        type: UPDATE_BLOG,
        data: updatedBlog
      })
      dispatch({
        type: CREATE_NOTIFICATION,
        data: {
          success: true,
          content: `You updated "${updatedBlog.title}"!`
        }
      })
    } catch (err) {
      dispatch({
        type: CREATE_NOTIFICATION,
        data: {
          success: false,
          content: 'Something went wrong! Please try again!'
        }
      })
    } finally {
      setTimeout(() => {
        dispatch({
          type: CLEAR_NOTIFICATION
        })
      }, 5000)
    }

  }
}

export const addBlogComment = (id, data) => {
  return async dispatch => {
    try {
      const updatedBlog = await BlogsService.addBlogComment(id, data)
      dispatch({
        type: ADD_BLOG_COMMENT,
        data: updatedBlog
      })
    } catch (err) {
      // TODO
    }
  }
}