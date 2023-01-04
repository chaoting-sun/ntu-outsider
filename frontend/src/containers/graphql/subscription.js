import { gql } from "@apollo/client";

export const CHATBOX_SUBSCRIPTION = gql`
    subscription($id: ID!) {
        subscribeChatBox(id: $id) {
            messages {
              body
              sender
            }
            name
            namesOfTalkers
        }
    }
`
export const MESSAGE_SUBSCRIPTION = gql`
    subscription($id: ID!) {
        subscribeMessage(id: $id) {
            chatBoxName
            message {
                body
                sender
            }
        }
    }
`

