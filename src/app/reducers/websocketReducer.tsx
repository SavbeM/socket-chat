import {AnyAction} from "redux"
import {MessageType} from "./messagesReducer";



export type initialStateType = {
    socket: boolean,
    messageToSend: null | MessageType
}


export const ASYNC_SET_CONNECTION = "ASYNC-SET-CONNECTION"
export const SET_CONNECTION = "SET-CONNECTION"
export const ADD_MESSAGE_TO_SEND = "ADD-MESSAGE-TO-SEND"
export const MESSAGE_IS_SENDED = "MESSAGE-IS-SENDED"
export const SEND_MESSAGE = "SEND-MESSAGE"
export const CLOSE_SOCKET = "CLOSE-SOCKET"

const initialState: initialStateType = {
    socket: false,
    messageToSend: null
}


export type SetAsyncConnectionActionType = { type: typeof ASYNC_SET_CONNECTION }

export type SetConnectionActionType = { type: typeof SET_CONNECTION }


export  type AddMessageToSendType = {type: typeof ADD_MESSAGE_TO_SEND, message: MessageType}

export type MessageIsSended = {type: typeof MESSAGE_IS_SENDED}

export type SendMessageType = {type: typeof SEND_MESSAGE}

export type CloseSocketType = {type: typeof CLOSE_SOCKET}

export const sendMessageActionCreator = (): SendMessageType => {
   return {
       type: SEND_MESSAGE
   }
}



export const closeSocketActionCreator = (): CloseSocketType => {
    return {
        type: CLOSE_SOCKET
    }
}

export const messageIsSendedActionCreator = (): MessageIsSended => {
    return{
        type: MESSAGE_IS_SENDED
    }
}

export const setAsyncConnectionActionCreator = (): SetAsyncConnectionActionType => {
    return {
        type: ASYNC_SET_CONNECTION,
    }
}

export const setConnectionActionCreator = (): SetConnectionActionType => {
    return {
        type: SET_CONNECTION,
    }
}


export const addMessageToSendActionCreator = (message: MessageType): AddMessageToSendType => {
    return{
        type: ADD_MESSAGE_TO_SEND, message: message
    }
}

const websocketReducer = (state = initialState, action: AnyAction): initialStateType => {
    switch (action.type) {
        case SET_CONNECTION:
            return {...state ,socket: true}
        case ADD_MESSAGE_TO_SEND:
            return {...state, messageToSend: action.message}
        case MESSAGE_IS_SENDED:
            return {...state, messageToSend: null}
        default:
            return state
    }
}

export default websocketReducer