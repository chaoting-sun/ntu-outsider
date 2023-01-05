const Subscription = {
    subscribeChatBox: {
        subscribe: (parent, {id}, { pubsub }) => {
            console.log("pubsub");
            console.log(`chatBox ${id}`);
            return pubsub.subscribe(`chatBox ${id}`);
        }
    },

    subscribeMessage: {
        subscribe: (parent, {id}, { pubsub }) => {
            //console.log(`message ${id}`)
            return pubsub.subscribe(`message ${id}`);
        }
    }
}

export default Subscription;


