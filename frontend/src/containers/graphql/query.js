import { gql } from "@apollo/client";

export const CHATBOX_QUERY = gql`
  query queryChatBox($name1: ID!, $name2: ID!) {
    queryChatBox(name1: $name1, name2: $name2) {
      name
      namesOfTalkers
      messages {
        sender
        body
      }
      namesOfTalkers
    }
  }
`;
export const CHATBOXES_QUERY = gql`
  query queryChatBoxes($userId: ID!) {
    queryChatBoxes(userId: $userId) {
      name
      messages {
        sender
        body    
      }
      namesOfTalkers
    }
  }
`;
export const USER_QUERY = gql`
  query queryUser($account: String!, $password: String!) {
    queryUser(account: $account, password: $password) {
      _id
      account
      name
      password
      postCollection
    }
  }
`;
export const POST_QUERY = gql`
  query queryPost($type: String!, $queryString: String!) {
    queryPost(type: $type, queryString: $queryString) {
      _id
      userId
      author {
        _id
        account
        name
        password
        postCollection
      }
      title
      classNo
      className
      teacherName
      content
      condition
      deadline
      tag
    }
  }
`;

export const POST_COLLECTION_QUERY = gql`
  query queryPostCollection($userId: String!, $type: String!) {
    queryPostCollection(userId: $userId, type: $type) {
      _id
      userId
      author {
        _id
        account
        name
        password
        postCollection
      }
      title
      classNo
      className
      teacherName
      content
      condition
      deadline
      tag
    }
  }
`;
