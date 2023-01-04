import React, { useState, useEffect } from 'react'
import '../css/mainPage.css'
import { useOusider } from './hooks/useOusider'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from "@apollo/client";
import styled from 'styled-components'
import PostLayout from '../components/postLayout'
// import NavBar from '../components/navigationBar'
import { DELETE_POST_MUTATION, 
  UPDATE_POST_COLLECTION_MUTATION,
 } from './graphql'


const PostContainer = styled.div`
  width: 100% !important;
  margin-top: 20px;
  margin-bottom: 20px;
`

const MainPage = () => {
  const { userId, currentPost, 
    authenticated, displayStatus,
    doingQueryPost, setDoingQueryPost,
    doingQueryPostCollection, 
    setDoingQueryPostCollection,
    handleQueryPost } = useOusider();
  const [post, setPost] = useState([]);
  const [postDom, setPostDom] = useState([]);
  const [editPostId, setEditPostId] = useState("");

  const [updatePostCollection] = useMutation(UPDATE_POST_COLLECTION_MUTATION);
  const [deletePost] = useMutation(DELETE_POST_MUTATION);

  const location = useLocation(); // edit / create a post
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (location.state !== null) {

  //   }
  // }, [location])
  
  useEffect(() => {
    handleQueryPost("all", "") // default queryPost
      .then((fetchedPost) => {
        setPost(fetchedPost);
        console.log('fetchedPost:', fetchedPost);
      })
  }, []);

  useEffect(() => {
    if (doingQueryPost) { // search on menu
      setPost(currentPost);
      setDoingQueryPost(false);
    }
    if (doingQueryPostCollection) { // search my post
      setPost(currentPost);
      setDoingQueryPostCollection(false);
    }
  }, [currentPost]);

  const handleChat = (author) => {
    if (author._id === userId) {
      displayStatus({
        'type': 'fail',
        'msg': 'This is your post!'
      })
    } else {
      navigate('/mailPage', { state: author });
    }
  }

  // const handleQueryPost = async () => {
  //   await queryPost({
  //     variables: {
  //       type: "all",
  //       queryString: ""
  //     }
  //   }).then((data) => {
  //     setPost(data.data.queryPost);
  //     console.log('save post:', data.data.queryPost);
  //   }).catch((e) => {
  //     console.log('error:', e);
  //   })
  // }

  useEffect(() => {
    // save postDom
    if (post) setPostDom(createPostDOM(post))
  }, [post]);

  const handleSavePost = async (savedPost) => {
    const { data } = await updatePostCollection({
      variables: {
        userId: userId,
        postId: savedPost._id
      }
    })
    const fetchedPost = data.updatePostCollection.postCollection;
    if (fetchedPost.find(id => id === savedPost._id) !== undefined) {
      // 之前沒 save 過，現在 save 了
      displayStatus({
        'type': 'success',
        'msg': 'follow the post!'
      });
    } else {
      // 之前 save 過，現在取消 save 了
      displayStatus({
        'type': 'success',
        'msg': 'unfollow the post!'
      });
    }
  }

  const handleDeletePost = async (deletedPost) => {
    setPost(post.filter(({ _id }) => (_id !== deletedPost._id))) // -> useEffect
    const fetchedPost = await deletePost({
      variables: { postId: deletedPost._id }
    });
    if (fetchedPost) {
      displayStatus({
        'type': 'success',
        'msg': 'delete the post!'
      });
    }
  }

  const handleEditPost = (post) => {
    navigate('/editPostPage', {
      state: {
        action: 'editPost',
        info: post
      }
    });
  }

  const createPostDOM = (posts) => {
    return posts.map((post) => ({
      id: post._id,
      dom:
        <PostContainer key={post._id}>
          <PostLayout
            post={post}
            handleChat={handleChat}
            handleSavePost={handleSavePost}
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
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
      <div className='postContainer'>
        {/* {console.log('postDOM:', postDom)} */}
        {postDom.map(({ dom }) => dom)}
      </div>
    </div>
  )
}

export default MainPage