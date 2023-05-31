import {AnyAction} from "redux"

export interface MessageType  {
    _id?: string,
    userId: string
    username: string,
    message: string,
    type: "message" | "notification"
}

export const initialMessagesState: Array<MessageType> | [] = []

const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"
const RECEIVE_ALL_MESSAGE = "RECEIVE_ALL_MESSAGE"
export type ReceiveMessageActionType = { type: typeof RECEIVE_MESSAGE, message: MessageType }

export const receiveMessageActionCreator = (message: MessageType): ReceiveMessageActionType => {
    return ({
            type: RECEIVE_MESSAGE, message: message
        }
    )
}

export type ReceiveAllMessagesActionType =  {
    type: typeof RECEIVE_ALL_MESSAGE, messages: Array<MessageType>
}

export const receiveAllMessagesActionCreator = (messages: Array<MessageType>): ReceiveAllMessagesActionType => {
    return {
        type: RECEIVE_ALL_MESSAGE, messages: messages
    }
}


const messagesReducer = (state = initialMessagesState, action: AnyAction): Array<MessageType> | [] => {
    switch (action.type) {
        case RECEIVE_MESSAGE:
            return [...state, action.message]
        case RECEIVE_ALL_MESSAGE:
            return action.messages
        default:
            return state
    }
}

export default messagesReducer