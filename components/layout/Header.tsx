import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

const Header = () => {
    // Retrieve the authentication status from the session
    const {status} = useSession()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Update the state when the authentication status changes
    useEffect(() => {
        if (status === 'authenticated') {
            setIsAuthenticated(true)
        }
        if (status === 'unauthenticated') {
            setIsAuthenticated(false)
        }
    }, [status])

    return (
        <div className='bg-gray-100 flex flex-row justify-center md:space-x-36 p-4 md:text-xl text-[16px] space-x-10 md:space-x-16'>
            <Link href={'/'}>
                <div className='bg-blue-400 p-2 text-white rounded-md hover:bg-blue-600 cursor-pointer'>All Posts</div>
            </Link>
            <Link href={'/new-post'}>
                <div className='bg-blue-400 p-2 text-white rounded-md hover:bg-blue-600 cursor-pointer'>Add Posts</div>
            </Link>
            <Link href={'/authentication'}>
                <div
                    onClick={() => signOut()}
                    className='bg-blue-400 p-2 text-white rounded-md hover:bg-blue-600 cursor-pointer'>
                    {isAuthenticated? 'Logout':'Login'}
                </div>
            </Link>
        </div>
    );
};

export default Header;