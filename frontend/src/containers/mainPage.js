import React, { useState, useEffect } from 'react'
import '../css/mainPage.css'
import { posts } from '../db'
import { useOusider } from './hooks/useOusider'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import PostLayout from '../components/postLayout'
// import NavBar from '../components/navigationBar'

import '../css/primaryLayout.css'
import { postExamples } from './db'


const PostContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

/* graphql query in useOutsider */
const queryPost = async () => {
  return postExamples;
}

const MainPage = () => {
  const { authenticated } = useOusider();
  const [post, setPost] = useState([]);
  const [postDom, setPostDom] = useState([]);
  const [editPostId, setEditPostId] = useState("");
  const navigate = Navigate();

  const handleQueryPost = async () => {
    const fetchedPost = await queryPost();
    setPost(fetchedPost);
  }

  useEffect(() => {
    // fetch all post from backend
    handleQueryPost()
      .catch(console.error);
  }, [])

  const handleDeletePost = (deletedPostId) => {
    setPost(post.filter(({ id }) => (id !== deletedPostId)))
    setPostDom(postDom.filter(({ id }) => (id !== deletedPostId)));
  }

  const handlePostOperation = (targetPostId, type) => {
    switch (type) {
      case 'delete':
        handleDeletePost(targetPostId);
        break;
      case 'edit':
        navigate('./editPostPage', {state: {
          action: 'editPost',
          info: post
        }});
        break;
      default:
        console.log("only support edit and delete post!");
    }
  }

  const createPostDOM = (posts) => {
    return posts.map((post) => ({
      id: post._id,
      dom:
        <PostContainer key={post._id}>
          <PostLayout
            post={post}
            handlePostOperation={handlePostOperation}
          />
        </PostContainer>
    }))
  }

  useEffect(() => {
    // create react DOM of post
    if (post.length) {
      setPostDom(createPostDOM(post));
    }
  }, [post])

  return (
    <div className='mainPageContainer'>
      {postDom.map(({ dom }) => dom)}
    </div>
  )
}

export default MainPage