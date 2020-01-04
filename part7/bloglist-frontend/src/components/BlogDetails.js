import React from 'react'

const BlogDetails = props => {

    const {blog, user, onLike, onDelete} = props;

    const handleLikeClick = () => {
        onLike({
            ...blog,
            user: blog.user.id,
            likes: ++blog.likes
        });
    }

    const handleDeleteClick = () => {
        onDelete(blog.id);
    }

    if(!blog) return null;

    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <p>{blog.likes} likes <button onClick={handleLikeClick}>like</button></p>
            {blog.user && <p>added by {blog.user.name}</p>}
            {user.username === (blog.user && blog.user.username) ? (
             <button onClick={handleDeleteClick}>remove</button>
            ) : null}
           
        </div>
    )
}

export default BlogDetails;