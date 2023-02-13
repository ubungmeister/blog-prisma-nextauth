import React from 'react';
import {PostType} from "@/components/post/add-post/NewPostPage";
import Link from "next/link";
import {transferDate} from "@/utils";

type AllPostsProps  = {
    post: PostType
}

const AllPosts = ({post}:AllPostsProps ) => {
    const {title, address, photo, id, date, category} = post
    const dateStart = transferDate(date)
    return (

        <div className=' mx-auto bg-gray-100 w-auto min-w-[60%] max-w-min space-y-4 rounded-md pb-4 cursor-pointer'>
            <Link href={`/${id}`}>
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
            </Link>
        </div>
    );
};

export default AllPosts;