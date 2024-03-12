import { message } from "antd";

export const displayStatus = (s) => {
  if (s.msg) {
    const { type, msg } = s;
    const content = { content: msg, duration: 1 };

    switch (type) {
      case "success":
        message.success(content); // show status of success
        break;
      case "error":
      default:
        message.error(content); // show status of error
        break;
    }
  }
};

// a error parser for graphql error

export const parseErrorMessage = (error) => {
  const graphQLError = error.graphQLErrors[0];
  const errorCode = graphQLError.extensions?.code;
  const customMessage = graphQLError.extensions?.msg;
  console.log("Error code/message:", errorCode, customMessage);

  return { type: errorCode, msg: customMessage || "Unexpected error" };
}

export const standardizeFetchedPost = (post) => {
  const {
    _id: postId,
    title,
    className,
    classNo,
    teacherName,
    condition,
    content,
    deadline,
    tag,
    author: { _id: authorId, name: authorName },
  } = post;

  return {
    authorId,
    authorName,
    postId,
    title,
    className,
    classNo,
    teacherName,
    condition,
    content,
    deadline,
    tag,
  };
};
