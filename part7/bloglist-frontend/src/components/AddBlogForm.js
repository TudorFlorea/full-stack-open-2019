import React, { useState } from 'react'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const AddBlogForm = ({ onBlogAdded }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
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
    title.reset()
    author.reset()
    url.reset()
  }

  const handleCalncelNewNote = e => {
    e.preventDefault()
    e.stopPropagation()
    setShowForm(false)
  }

  return (
    <>
      <Button data-cy="add-blog-show" variant="info" style={hideWhenFormIsVisible} onClick={() => setShowForm(true)}>
        New blog
      </Button>

      <Form onSubmit={handleNewBlogSubmit} style={showWhenFormIsVisible}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control data-cy="add-blog-title" {...title} reset="" placeholder="Blog title" />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control data-cy="add-blog-author" {...author} reset="" placeholder="Blog author" />
        </Form.Group>
        <Form.Group controlId="url">
          <Form.Label>Url</Form.Label>
          <Form.Control data-cy="add-blog-url" {...url} reset="" placeholder="Blog url" />
        </Form.Group>
        <Button data-cy="add-blog-submit" className="create-blog" type="submit" variant="success">Create blog</Button>
        <Button data-cy="add-blog-cancel" onClick={handleCalncelNewNote} variant="warning">Cancel</Button>
      </Form>
    </>
  )
}

export default AddBlogForm
