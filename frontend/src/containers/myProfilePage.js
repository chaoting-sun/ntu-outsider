import { useState, useEffect } from "react";
import { useOusider } from "./hooks/useOusider";
import { postExamples } from './db'
import styled from 'styled-components'
import PostLayout from '../components/postLayout'
import '../css/mainPage.css'


const PostContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

/* graphql query */
const queryPostCollection = async (userId, type='myPost') => {
  // db <- queryPostCollection(userId, 'followedPost')
  // db -> postExamples
  return postExamples.slice(0,1);
}

const MyProfilePage = () => {
  const {} = useOusider();
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
    const fetchedPost = await queryPostCollection();
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

export default MyProfilePage;