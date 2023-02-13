import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useAppContext} from "@/components/authContext/AuthContext";
import {signOut, useSession} from "next-auth/react";
import {signout} from "next-auth/core/routes";

const Header = () => {
    const {isLogin} = useAppContext()
    const {status} = useSession()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(()=>{
        if(status==='authenticated'){
            setIsAuthenticated(true)
        }
        if(status==='unauthenticated'){
            setIsAuthenticated(false)
        }
    },[status])

    return (
        <div className='bg-gray-100 flex flex-row justify-center md:space-x-36 p-4 text-xl space-x-16'>
            <Link href={'/'}>
                <div className='bg-blue-400 p-2 text-white rounded-md hover:bg-blue-600 cursor-pointer'>All Posts</div>
            </Link>
            <Link href={'/new-post'}>
                <div className='bg-blue-400 p-2 text-white rounded-md hover:bg-blue-600 cursor-pointer'>Add Posts</div>
            </Link>
            <Link href={'/authentication'}>
                {isAuthenticated
                    ? <div
                        onClick={() => signOut()}
                        className='bg-blue-400 p-2 text-white rounded-md
                        hover:bg-blue-600 cursor-pointer'>Logout</div>
                    :
                    <div
                        className='bg-blue-400 p-2 text-white rounded-md
                        hover:bg-blue-600 cursor-pointer'>Login</div>

                }
            </Link>


        </div>
    );
};

export default Header;