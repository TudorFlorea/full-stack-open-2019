import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'

const AddBlogCommentForm = ({ onAddComment }) => {

  const comment = useField('text')

  const handleCommentSubmit = e => {
    e.preventDefault()
    onAddComment({
      comment: comment.value
    })
    comment.reset()
  }

  return (
    <Form onSubmit={handleCommentSubmit}>
      <Form.Group controlId="title">
        <Form.Control {...comment} reset="" placeholder="Wite a comment" />
      </Form.Group>
      <Button type="submit" variant="info">Add comment</Button>
    </Form>
  )

}

export default AddBlogCommentForm