const Subscription = {
    subscribeChatBox: {
        subscribe: (parent, {id}, { pubsub }) => {
            return pubsub.subscribe(`chatBox ${id}`);
        }
    },

    subscribeMessage: {
        subscribe: (parent, {id}, { pubsub }) => {
            return pubsub.subscribe(`message ${id}`);
        }
    }
}

export default Subscription;


