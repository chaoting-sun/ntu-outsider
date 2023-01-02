import { useState, useEffect } from "react";
import { useOusider } from "./hooks/useOusider";
import { postExamples } from './db'
import styled from 'styled-components'
import PostLayout from '../components/postLayout'
import '../css/mainPage.css'
import { useLocation } from "react-router-dom";


const PostContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

/* graphql query */
const queryPost = async (type, queryString) => {
  // db <- queryPostCollection(userId, type)
  // db -> postExamples
  // type = classNo, postTitle, className, teacherName, tag
  switch (type) {
    case 'classNo':
      return postExamples.slice(0,1);
    case 'postTitle':
      return postExamples.slice(1,2);
    case 'className':
      return postExamples.slice(2,4);
    case 'teacherName':
      return postExamples.slice(3,4);
    case 'tag': 
    return postExamples.slice(3,5);
    default:
      console.log(`Sorry, we are out of ${type}.`);
  }
}

const SearchPostPage = () => {
  const {} = useOusider();
  const [existingPost, setExistingPost] = useState([]);
  const [postDom, setPostDom] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location) {
      const { type, queryString } = location.state;
      handleQueryExistingPost(type, queryString)
        .catch(console.error);
    }
  }, [location])

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

  const handleQueryExistingPost = async (type, queryString) => {
    const fetchedPost = await queryPost(type, queryString);
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

export default SearchPostPage;