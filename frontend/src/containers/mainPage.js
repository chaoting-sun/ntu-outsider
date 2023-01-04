import React, { useState, useEffect } from 'react'
import '../css/mainPage.css'
import { posts } from '../db'
import { useOusider } from './hooks/useOusider'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery } from "@apollo/client";
import styled from 'styled-components'
import PostLayout from '../components/postLayout'
// import NavBar from '../components/navigationBar'
import { POST_QUERY } from './graphql'
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
  const navigate = useNavigate();
  const [queryPost, { data }] = useLazyQuery(POST_QUERY);

  const handleQueryPost = async () => {
    const fetchedPost = await queryPost({
      variables: {
        type: "all",
        queryString: ""
      }
    });
    setPost(fetchedPost);
    return fetchedPost;
  }

  useEffect(() => {
    handleQueryPost()
      .then((data) => {
        const fetchedPost = data.data.queryPost;
        console.log("fetchedPost:", fetchedPost);
        // const fetchedPostDOM = createPostDOM(fetchedPost);
        // setPostDom(fetchedPostDOM);
      })
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
        navigate('/editPostPage', {state: {
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

  // useEffect(() => {
  //   // create react DOM of post
  //   if (post.length) {
  //     setPostDom(createPostDOM(post));
  //   }
  // }, [post])

  return (
    <div className='mainPageContainer'>
      {/* {postDom.map(({ dom }) => dom)} */}
    </div>
  )
}

export default MainPage