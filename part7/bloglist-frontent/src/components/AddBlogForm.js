import React, { useState } from 'react'
import Heading from './Heading'
import {useField} from '../hooks';

const AddBlogForm = ({ onBlogAdded }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const [showForm, setShowForm] = useState(false)

  const hideWhenFormIsVisible = { display: showForm ? 'none' : '' }
  const showWhenFormIsVisible = { display: showForm ? '' : 'none' }

  const handleNewBlogSubmit = e => {
    e.preventDefault()
    onBlogAdded({
      title: title.value,
      author: author.value,
      url: url.value
    })
    title.reset();
    author.reset();
    url.reset();
  }

  const handleCalncelNewNote = e => {
    e.preventDefault()
    e.stopPropagation()
    setShowForm(false)
  }

  return (
    <>
      <button style={hideWhenFormIsVisible} onClick={() => setShowForm(true)}>
        new blog
      </button>

      <form onSubmit={handleNewBlogSubmit} style={showWhenFormIsVisible}>
        <Heading text="create new" />
        <label htmlFor="title">title</label>
        <input
          {...title}
          id="title"
          reset=""
        />
        <br />
        <label htmlFor="author">author</label>
        <input
          {...author}
          id="author"
          reset=""
        />
        <br />
        <label htmlFor="url">url</label>
        <input
          {...url}
          id="url"
          reset=""
        />
        <br />
        <button type="submit">create</button>
        <br />
        <button onClick={handleCalncelNewNote}>cancel</button>
      </form>
    </>
  )
}

export default AddBlogForm
