import React, {useEffect, useState} from 'react';
import {PostType} from "@/components/post/add-post/NewPostPage";
import Link from "next/link";
import {deletePost, transferDate} from "@/utils";
import {getSession, useSession} from "next-auth/react";
import {useRouter} from "next/router";

type AllPostsProps  = {
    post: PostType
}

const AllPosts = ({post}:AllPostsProps ) => {
    const {title, address, photo, id, date, category, author ,user} = post
    const dateStart = transferDate(date)
    const [email, setEmail]=useState('')
    const {status} =useSession()
    const router =useRouter()
    useEffect(()=>{
        getSession().then(session=>{
            if(session){

                setEmail(session?.user?.email || '')
            }else {
                setEmail('')
            }
        })
    },[status])

    const onDeleteHandler =async (id:any)=>{
        const result = await deletePost(id)
        console.log("Post deleted")
        await router.replace(router.asPath)
    }

    return (

        <div className=' mx-auto bg-gray-100 w-auto min-w-[60%] max-w-min space-y-4 rounded-md pb-4 cursor-pointer'>
            {email === author &&
                <button onClick={()=>onDeleteHandler(id)}>x</button>}
            {email === author &&
                <Link href={`/update/${id}`}>
                    <button>Update</button>
                </Link>}

            <img className='rounded-t-md' src={photo}/>
            <div className='flex flex-row justify-between px-2'>
                <address>{address}</address>
                <div className='text-orange-600'>{dateStart}</div>
            </div>
            <div className='text-xl  text-left p-2'>{title}</div>
            <div className='flex flex-row space-x-2 px-2'>
                <p className='italic'>Category:</p>
                <div className='bg-blue-300 text-white rounded-md px-1'>#{category}</div>
            </div>
            <Link href={`/${id}`}>
                <div>Explore</div>
            </Link>
        </div>
    );
};

export default AllPosts;