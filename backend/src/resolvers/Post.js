const Post = {
  author: async(parent, args, { UserModel }, info) => {
    let postAuthor = await UserModel.findOne({_id: parent.userId});
    return postAuthor;
  },
};
export default Post;