import React, {FC} from "react";

import {RenderMessages} from "./RenderMessages";
import {ChatInput} from "./ChatInput";
import {UsersList} from "./UsersList";


export const Chat: FC = () => {


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