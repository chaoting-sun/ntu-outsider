import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation signUp($account: String!, $name: String!, $password: String!) {
    signUp(account: $account, name: $name, password: $password) {
      userId
      createPost
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

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $account: String!
    $name: String!
    $password: String!
  ) {
    createAccount(account: $account, name: $name, password: $password) {
      __typename
      ... on User {
        _id
        account
        name
        password
        postCollection
      }
      ... on ValidationError {
        path
        report
      }
      ... on ServerError {
        report
      }
    }
  }
`;
export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($userId: ID!, $name: String!, $account: String!) {
    updateUser(userId: $userId, name: $name, account: $account) {
      _id
      account
      name
      password
      postCollection
    }
  }
`;

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword(
    $userId: ID!
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      userId: $userId
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      _id
      account
      name
      password
      postCollection
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $userId: ID!
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
      userId: $userId
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
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
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

export const UPDATE_POST_COLLECTION_MUTATION = gql`
  mutation updatePostCollection($userId: ID!, $postId: ID!) {
    updatePostCollection(userId: $userId, postId: $postId) {
      _id
      account
      name
      password
      postCollection
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
