import React from 'react'

const BlogComments = ({comments}) => {
    return (
        <>
            <h2>Comments</h2>
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