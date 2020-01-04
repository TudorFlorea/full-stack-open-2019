import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import BlogDetails from '../components/BlogDetails';
import BlogComments from '../components/BlogComments';
import {initBlogs, updateBlog, deleteBlog} from '../store/actions/blogActions';

const BlogPage = props => {

    const blogId = props.match.params.id;
    const currentBlog = props.blogs.find(blog => blog.id === blogId);

    const onLike = newBlog => {
        props.updateBlog(newBlog)
    }
    
    const onDelete = id => {
        props.deleteBlog(id);
    }

    useEffect(() => {
        props.initBlogs();
    }, []);

    if(!props.auth.user) return <Redirect to="/login" />
    if(!currentBlog) return <Redirect to="/" />

    return (
        <>
            {currentBlog && <BlogDetails 
                blog={currentBlog}
                user={props.auth.user}
                onLike={onLike}
                onDelete={onDelete}
            />}
            {currentBlog && currentBlog.comments && <BlogComments comments={currentBlog.comments} />}
        </>
    )
}

const mapStateToProps = state => {
    return {
        blogs: state.blogs,
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initBlogs: () => dispatch(initBlogs()),
        deleteBlog: id => dispatch(deleteBlog(id)),
        updateBlog: blog => dispatch(updateBlog(blog))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogPage);