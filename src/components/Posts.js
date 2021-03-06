import React, { Component } from 'react'
import PropTypes from 'prop-types'  // INSTALL PROP TYPES
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/postActions'


class Posts extends Component {

    componentWillMount(){
        this.props.fetchPosts()
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.newPost){
            //pushes created post next inline
            this.props.posts.unshift(nextProps.newPost)
        }
    }

    render() {
        const postItems = this.props.posts.map(post => (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        ));

        return (
            <div>
                <h1>Posts</h1>
                {postItems}
            </div>
        );
    }
}


//POSTS PROPTYPES
Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
}

const mapStateToProps = state => ({
    posts: state.posts.items, //LOOK AT REDUCERS INDEX FOR POSTS STATE
    newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Posts);