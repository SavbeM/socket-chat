import React, {FC} from "react";

import {RenderMessages} from "./RenderMessages";
import {ChatInput} from "./ChatInput";
import {UsersList} from "./UsersList";
import {AppDispatch} from "../app/store";
import {useDispatch} from "react-redux";
import {closeSocketActionCreator} from "../app/reducers/websocketReducer";


export const Chat: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    window.onbeforeunload = () => {
        dispatch(closeSocketActionCreator())
    }

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between"}} className="chat-input-box">
                <div style={{display:"flex", flexDirection: "column"}}>
                    <ChatInput/>
                    <div className="chat-messages">
                        <RenderMessages/>
                    </div>
                </div>
                <UsersList/>
            </div>
        </>
    )
}