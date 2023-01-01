import { gql } from "@apollo/client";


/**query post by 'type':
 * 1. allPost
 * 2. savedPost
 * 3. followedPost
 * 4. appliedPost
 * 5. myPost
 */

export const POST_QUERY = gql`
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
