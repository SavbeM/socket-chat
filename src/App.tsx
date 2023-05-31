import React, {useEffect} from 'react';
import './App.css';
import {Login} from "./components/Login";
import {Chat} from "./components/Chat";
import {useSelector} from "react-redux";
import {RootState} from "./app/store";

function App() {
    const isLogged = useSelector((state: RootState) => state.users.currentUser.isLogged)



    useEffect(() => {
    }, [isLogged])



    return !isLogged ? <Login/> : <Chat/>
}

export default App;
