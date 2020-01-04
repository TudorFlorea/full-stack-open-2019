import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import Heading from '../components/Heading';
import UserDetails from '../components/UserDetails';
import BlogDetails from '../components/BlogDetails';
import {logout} from "../store/actions/authActions";
import {initBlogs, updateBlog, deleteBlog} from '../store/actions/blogActions';

const BlogPage = props => {

    const blogId = props.match.params.id;
    const currentBlog = props.blogs.find(blog => blog.id === blogId);

    const onLike = newBlog => {
        props.updateBlog(newBlog)
    }
    
    const onDelete = id => {
        props.deleteBlog(id);
        // props.history.push('/');
    }

    useEffect(() => {
        props.initBlogs();
    }, []);

    if(!props.auth.user) return <Redirect to="/login" />
    if(!currentBlog) return <Redirect to="/" />

    return (
        <>
            <Heading text="blogs" />
            <UserDetails user={props.auth.user} onLogOut={() => {props.logout()}} />
            {currentBlog && <BlogDetails 
                blog={currentBlog}
                user={props.auth.user}
                onLike={onLike}
                onDelete={onDelete}
            />}
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
        logout: () => dispatch(logout()),
        initBlogs: () => dispatch(initBlogs()),
        deleteBlog: id => dispatch(deleteBlog(id)),
        updateBlog: blog => dispatch(updateBlog(blog))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogPage);