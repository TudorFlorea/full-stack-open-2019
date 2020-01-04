import React from 'react'

import {useField} from '../hooks';

const AddBlogCommentForm = ({onAddComment}) => {

    const comment = useField('text');

    const handleCommentSubmit = e => {
        e.preventDefault();
        onAddComment({
            comment: comment.value
        });
        comment.reset()
    }

    return (
        <form onSubmit={handleCommentSubmit}>
            <input {...comment} reset="" />
            <button type="submit">add comment</button>
        </form>
    )

}

export default AddBlogCommentForm;