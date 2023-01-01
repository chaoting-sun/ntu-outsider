import { gql } from "@apollo/client";


/**query post by 'type':
 * 1. serialNo
 * 2. postTitle
 * 3. className
 * 4. teacherName
 * 5. tag
 */

export const POST_QUERY = gql`
  query queryPost($type: String!) {
    querySavedPost(type:$type) {
      classNumber
      className
      title
      content
      condition
      deadline
      tags
    }
  }
`

/**query mypost by 'type':
 * 1. savedPost
 * 2. followedPost
 * 3. myPost
 */

export const MYPOST_QUERY = gql`
  query queryPost($userId: String!, $type: String!) {
    querySavedPost(userId:$userId, type:$type) {
      classNumber
      className
      title
      content
      condition
      deadline
      tags
    }
  }
`

// export const POST_QUERY = gql`
//   query queryPost($userId: String!, $type: String!) {
//     querySavedPost(userId:$userId, type:$type) {
//       classNumber
//       className
//       title
//       content
//       condition
//       deadline
//       tags
//     }
//   }
// `
