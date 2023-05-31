import React, {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";

export const RenderMessages: FC = () => {
    const selectedMessages = useSelector((state: RootState) => state.messages)


    console.log(selectedMessages)
    return (
        <>
            {selectedMessages.map(message => {
                switch (message.type) {
                    case "notification":
                        return (
                            <div key={message._id}>
                                <div style={{color: "blue"}}>{message.message}</div>
                            </div>
                        )
                    case "message":
                        return(
                        <div key={message._id}>
                            <div>{message.username}</div>
                            <div >{message.message}</div>
                        </div>)
                }

            })}
        </>
    )
}