import { INIT_BLOGS, CREATE_BLOG, DELETE_BLOG, UPDATE_BLOG, ADD_BLOG_COMMENT } from '../actions/blogActions'

const initialState = []

const blogsReducer = (state = initialState, action) => {

  switch(action.type) {
  case INIT_BLOGS:
    return action.data

  case CREATE_BLOG:
    return [...state, action.data]

  case DELETE_BLOG: {
    const newBlogs = state.filter(blog => blog.id !== action.data.id)
    return newBlogs
  }

  case UPDATE_BLOG: {
    const newBlogs = state.map(blog => {
      return blog.id !== action.data.id ? blog : action.data
    })
    return newBlogs
  }

  case ADD_BLOG_COMMENT: {
    const newBlogs = state.map(blog => {
      return blog.id !== action.data.id ? blog : action.data
    })
    return newBlogs
  }

  default:
    return state
  }
}

export default blogsReducer