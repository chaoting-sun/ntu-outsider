const ChatBox = {
  messages: (parent) => parent.messages,
  namesOfTalkers: async (parent, args, { UserModel }) => {
    let nameArray = parent.name.split("_");
    let user1 = await UserModel.findOne({_id: nameArray[0]});
    let user2 = await UserModel.findOne({_id: nameArray[1]});
    return [await user1.name, await user2.name];
  },
};
export default ChatBox;
