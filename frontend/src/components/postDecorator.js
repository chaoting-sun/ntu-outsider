import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PostLayout from './postLayout'


const PostContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`


const PostDecorator = (posts, handlePostOperation) => {
  return posts.map((post) => ({
    id: post._id,
    dom:
      <PostContainer key={post._id}>
        <PostLayout
          // postId={post._id}
          // posterName={post.author.name}
          // posterAccount={post.author.account}
          // title={post.title}
          // classNo={post.classNo}
          // className={post.className}
          // teacherName={post.teacherName}
          // content={post.content}
          // condition={post.condition}
          // deadline={post.deadline}
          // tags={post.tags}
          post={post}
          handlePostOperation={handlePostOperation}
        />
      </PostContainer>
  }))
}

// const PostDecorator = (posts, handleEditPost) => {
//   console.log(posts[0]);
//   return posts.map((post) => ({
//     id: post._id,
//     dom:
//       <PostContainer key={post._id}>
//         <PostLayout
//           postId={post._id}
//           posterName={post.author.name}
//           posterAccount={post.author.account}
//           title={post.title}
//           classNo={post.classNo}
//           className={post.className}
//           teacherName={post.teacherName}
//           content={post.content}
//           condition={post.condition}
//           deadline={post.deadline}
//           tags={post.tags}
//           handleEditPost={handleEditPost}
//         />
//       </PostContainer>
//   }))
// }

export default PostDecorator;
