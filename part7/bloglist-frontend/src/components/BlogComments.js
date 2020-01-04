import React from 'react'

import AddBlogCommentForm from './AddBlogCommentForm';

const BlogComments = ({comments, onAddComment}) => {

    
    return (
        <>
            <h2>Comments</h2>
            <AddBlogCommentForm onAddComment={onAddComment} />
            {comments && comments.length ? (
                <ul>
                    {comments.map((comment, i) => {
                        return <li key={`${comment}-${i}`}>{comment}</li>
                    })}
                </ul>
            ) : (
                <p>No comments yet!</p>
            )}
        </>
    )
}

export default BlogComments;