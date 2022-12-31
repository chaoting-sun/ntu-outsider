const Post = {
  author: async(parent, args, { UserModel }, info) => {
    let postAuthor = await UserModel.findOne({_id: parent.userId});
    return postAuthor;
  },
  comments: async(parent, args, {CommentModel}, info) => {
    return await CommentModel.find({postId: parent._id});
  },
//   class: async(parent, args, {ClassModel}, info) => {
//     return await ClassModel.findOne({_id: parent.classId});
//   }
};
export default Post;