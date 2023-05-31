import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store";
import {
    addMessageToSendActionCreator,
    closeSocketActionCreator,
    sendMessageActionCreator
} from "../app/reducers/websocketReducer";

export const ChatInput = () => {
    const {username, id} = useSelector((state: RootState) => state.users.currentUser )
    const [messageValue, setMessageValue] = useState<string>("")
    const dispatch: AppDispatch = useDispatch()

    const inputHandler = (value: string) => {
        setMessageValue(value)
    }

    const sendMessage =  ()  => {
        if(messageValue.length !== 0)
            dispatch(addMessageToSendActionCreator({username: username, userId: id, message: messageValue, type: "message"}))
        dispatch(sendMessageActionCreator())
        setMessageValue("")
    }

    const closeConnection = () => {
        dispatch(closeSocketActionCreator())

    }

    return(
        <div>
            <input value={messageValue} onChange={e => inputHandler(e.target.value)}/>
            <button onClick={sendMessage}>Send</button>
            <button onClick={closeConnection}>Leave</button>
        </div>
    )
}