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
import PostLayout from '../components/postLayout'


const PostContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

/* graphql query */
const queryExistingPost = async () => {
  // db <- queryExistingPost
  // db -> postExamples 
  return postExamples;
}

const MainPage = () => {
  const { authenticated } = useOusider();
  const [existingPost, setExistingPost] = useState([]);
  const [postDom, setPostDom] = useState([]);

  useEffect(() => {
    handleQueryExistingPost()
      .catch(console.error);
  }, [])

  useEffect(() => {
    if (existingPost.length) {
      setPostDom(existingPost.map((post) => (
        <PostContainer key={post.postId}>
          <PostLayout
            title={post.title}
            posterName={post.posterName}
            className={post.className}
            teacherName={post.teacherName}
            classNo={post.classNo}
            deadline={post.deadline}
            condition={post.condition}
            content={post.content}
            leftMembersRequired={post.leftMembersRequired}
            tags={post.tags}
          />
        </PostContainer>
      )))
    } 
  }, [existingPost])

  const handleQueryExistingPost = async () => {
    const fetchedPost = await queryExistingPost();
    setExistingPost(fetchedPost);
  }

  return (
    <>
      <div className="mainPageContainer">
        { postDom }
      </div>
    </>
  )
}





export default MainPage