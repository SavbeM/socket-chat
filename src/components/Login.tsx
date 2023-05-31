import React, {FC, useState} from "react";
import {setAsyncConnectionActionCreator} from "../app/reducers/websocketReducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../app/store";
import {
    setUsernameActionCreator,
} from "../app/reducers/usersReducer";

export const Login: FC = () => {
    const [username, setUsername] = useState<string>("")
    const dispatch: AppDispatch = useDispatch()


    const handleUsername = (value: string) => {
        setUsername(value)
    }

    const connect = () => {
        dispatch(setUsernameActionCreator(username))
        dispatch(setAsyncConnectionActionCreator())
    }


    return (
        <>
            <div className="form">
               <input onChange={e => handleUsername(e.target.value)}/>
               <button onClick={connect}>Join</button>
            </div>
        </>
    )
}