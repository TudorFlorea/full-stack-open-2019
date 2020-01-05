import React from 'react'
import { ListGroup } from 'react-bootstrap'
import AddBlogCommentForm from './AddBlogCommentForm'
import Heading from './Heading'

const BlogComments = ({ comments, onAddComment }) => {


  return (
    <>
      <Heading text="Comments" />
      <AddBlogCommentForm onAddComment={onAddComment} />
      {comments && comments.length ? (
        <ListGroup data-cy="blog-comments">
          {comments.map((comment, i) => {
            return <ListGroup.Item key={`${comment}-${i}`}>{comment}</ListGroup.Item>
          })}
        </ListGroup>
      ) : (
        <p>No comments yet!</p>
      )}
    </>
  )
}

export default BlogComments