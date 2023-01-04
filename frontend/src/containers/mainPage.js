import React, { useState, useEffect } from 'react'
import '../css/mainPage.css'
import { posts } from '../db'
import { useOusider } from './hooks/useOusider'
import { useNavigate } from 'react-router-dom'
// import NavBar from '../components/navigationBar'
import MenuBar from '../components/menuBar'
import HeaderBar from '../components/headerBar'
import PrimaryLayout from '../components/primaryLayout'
import MainLayout from '../components/mainLayout'

import styled from 'styled-components'
import '../css/primaryLayout.css'
import { postExamples } from './db'
import PostDecorator from '../components/postDecorator'
import EditPostPage from './editPostPage'


/* graphql query in useOutsider */
const queryPost = async () => {
  return postExamples;
}

const MainPage = () => {
  const { authenticated } = useOusider();
  const [post, setPost] = useState([]);
  const [postDom, setPostDom] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editPostId, setEditPostId] = useState("");

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
    setPostDom(postDom.filter(({ id }) => (id !== deletedPostId)));
  }

  const fetchEditedPost = (editedPostInfo) => {
    
  }

  const handlePostOperation = (targetPostId, type) => {
    switch (type) {
      case 'delete':
        handleDeletePost(targetPostId);
        break;
      case 'edit':
        setEdit(true);
        setEditPostId(targetPostId);
        break;
      default:
        console.log("only support edit and delete post!");
    }
  }

  useEffect(() => {
    // create react DOM of post
    if (post.length) {
      setPostDom(PostDecorator(post, handlePostOperation));
    }
  }, [post])

  return (
    edit ? (
      <div className='editPostPageContainer'>
        <EditPostPage
          info={post.find(({ _id }) => editPostId === _id)}
          fetchEditedPost={fetchEditedPost}
        />
      </div>
    ) : (
      <div className='mainPageContainer'>
        {postDom.map(({ dom }) => dom)}
      </div>
    )
  )
}

export default MainPage