const Comment = {
    commenter: async(parent, args, {UserModel}) => {
        return await UserModel.findOne({_id: parent.userId});
    }
};
export default Comment