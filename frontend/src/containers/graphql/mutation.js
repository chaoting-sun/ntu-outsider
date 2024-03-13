import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation signUp($account: String!, $name: String!, $password: String!) {
    signUp(account: $account, name: $name, password: $password) {
      userId
      account
      name
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($account: String!, $password: String!) {
    login(account: $account, password: $password) {
      userId
      account
      name
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      msg
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($name: String!, $account: String!) {
    updateUser(name: $name, account: $account) {
      userId
      account
      name
    }
  }
`;

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      msg
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $classNo: String!
    $className: String!
    $teacherName: String!
    $content: String!
    $condition: Int!
    $deadline: String!
    $tag: [String]
  ) {
    createPost(
      title: $title
      classNo: $classNo
      className: $className
      teacherName: $teacherName
      content: $content
      condition: $condition
      deadline: $deadline
      tag: $tag
    ) {
      _id
      userId
      author {
        _id
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

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost(
    $postId: ID!
    $authorId: ID!
    $title: String!
    $classNo: String!
    $className: String!
    $teacherName: String!
    $content: String!
    $condition: Int!
    $deadline: String!
    $tag: [String]
  ) {
    updatePost(
      postId: $postId
      authorId: $authorId
      title: $title
      classNo: $classNo
      className: $className
      teacherName: $teacherName
      content: $content
      condition: $condition
      deadline: $deadline
      tag: $tag
    ) {
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
export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!, $authorId: ID!) {
    deletePost(postId: $postId, authorId: $authorId) {
      postId
    }
  }
`;

export const UPDATE_POST_COLLECTION_MUTATION = gql`
  mutation updatePostCollection($postId: ID!) {
    updatePostCollection(postId: $postId) {
      msg
    }
  }
`;

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox($name: ID!, $to: ID!) {
    createChatBox(name: $name, to: $to) {
      name
      messages {
        sender
        body
      }
      namesOfTalkers
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($name: ID!, $to: ID!, $message: String!) {
    createMessage(name: $name, to: $to, message: $message) {
      sender
      body
    }
  }
`;
