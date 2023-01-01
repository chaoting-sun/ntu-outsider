import React from 'react'
import '../css/PostLayout.css'


const PostLayout = ({ postAuthor, postTitle, teacherName, tags }) => {

  return (
    <div className="postContainer">
      
      <div className="postAuthorBlock">postTitle</div>
      <div className="postTitleBlock">postTitle</div>
      <div className="teacherNameBlock">teacherName</div>
      {
        tags.map((tag) => (
          <div className="tagsBlock">


          </div>
        ))

      }
    </div>
  )
}

export default PostLayout;