import { gql } from "@apollo/client";

export const CHATBOX_SUBSCRIPTION = gql`
    subscription($id: ID!) {
        subscribeChatBox(id: $id) {
            messages {
              body
              sender
            }
            name
        }
    }
`
