import React from 'react';
import Register from "@/components/authentication/Register";
import Login from "@/components/authentication/Login";
import {useAppContext} from "@/components/authContext/AuthContext";

const Authentication = () => {
    const {isLogin} = useAppContext()

    return (
        <div className='pt-10'>
            {isLogin ? <Register/> : <Login/>}
        </div>
    );
};

export default Authentication;