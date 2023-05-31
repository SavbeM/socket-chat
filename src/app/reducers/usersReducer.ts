import {AnyAction} from "redux"

export type userType = {
    id: null | number,
    username: string,
    isLogged: boolean,

}

export type otherUsersType = {
    id: null | number,
    username: string,
}

type UsersStateType = {
    currentUser: userType
    otherUsers: Array<otherUsersType>
}

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const SET_USERNAME = "SET-USERNAME"

export const initialUsersState: UsersStateType  = {
    currentUser: {
        id: null,
        username: "",
        isLogged: false,
    },
    otherUsers: []

}

export type SetUsernameActionCreatorType = {
    type: typeof SET_USERNAME, username: string
}

export type LogoutType = {type: typeof LOGOUT}

export const setUsernameActionCreator = (username: string): SetUsernameActionCreatorType => {
    return{
        type: SET_USERNAME, username: username
    }
}

export const logoutActionCreator = () => {
    return {
        type: LOGOUT
    }
}

export type LoginActionCreatorType = {
    type: typeof LOGIN, id: string
}

export const loginActionCreator = (id: string): LoginActionCreatorType => {
    return {
        type: LOGIN, id: id
    }
}


const usersReducer = ( state = initialUsersState, action: AnyAction) => {
    switch (action.type) {
        case SET_USERNAME:
            return{...state,currentUser: {username: action.username, id: null, isLogged: false}}

        case LOGIN:
            return {...state, currentUser: {...state.currentUser, id: action.id, isLogged: true}}
            default:
            return state
        case LOGOUT:
            return {...state, currentUser: {id: null, username: null, isLogged: false}}
    }
}

export default usersReducer