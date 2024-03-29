import styled from "styled-components";

const StyledMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({isMe}) => (isMe ? 'row-reverse' : 'row')};
    margin: 3px 0px;
    padding: 8px;

    & p:first-child {
        margin: 0 5px;
    }

    & p:last-child {
        padding: 2px 5px;
        border-radius: 5px;
        background: #E8E3E5;
        color: gray;
        margin: auto 0;
    }
`

const Message = ({isMe, message}) => {
    return (
        <StyledMessage isMe = {isMe}>
            <p>{message}</p>
        </StyledMessage>
    )
}

export default Message



