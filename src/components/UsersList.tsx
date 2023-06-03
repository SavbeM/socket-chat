import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";

export const UsersList = () => {
    const users = useSelector((state: RootState) => state.users)

    if(users) {
        return (
            <div style={{display: "flex", flexDirection: "column"}} className="users-list">
                <div style={{color: "green"}} className="current-user">
                    {users.currentUser.username}
                </div>
                {users.otherUsers.map(u => <div>{u.username}</div>)}
            </div>
        )
    }
    else
}
