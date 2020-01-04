import React from 'react'

const UserBlogs = ({user}) => {
    
    if(!user) return null;
    
    return (
        <>
            <h2>{user.name}</h2>
            <p>added blogs</p>
            <ul>
                {user.blogs && user.blogs.map(blog => {
                    return <li key={blog.id}>{blog.title}</li>
                })}
            </ul>
        </>
    )
}

export default UserBlogs;