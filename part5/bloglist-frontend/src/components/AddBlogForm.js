import React, { useState } from 'react'
import Heading from './Heading'

const AddBlogForm = ({ onBlogAdded }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false)

  const hideWhenFormIsVisible = { display: showForm ? 'none' : '' }
  const showWhenFormIsVisible = { display: showForm ? '' : 'none' }

  const handleNewBlogSubmit = e => {
    e.preventDefault()
    onBlogAdded({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleCalncelNewNote = e => {
    e.preventDefault()
    e.stopPropagation()
    setShowForm(false)
  }

  return (
    <>
      <button style={hideWhenFormIsVisible} onClick={() => setShowForm(true)}>
        new note
      </button>

      <form onSubmit={handleNewBlogSubmit} style={showWhenFormIsVisible}>
        <Heading text="create new" />
        <label htmlFor="title">title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="author">author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <br />
        <label htmlFor="url">url</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
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
