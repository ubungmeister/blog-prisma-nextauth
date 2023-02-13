import React from 'react';
import {SelectedEvent} from "@/pages/[postId]";
import {transferDate} from "@/utils";



const OnePost = ({event}:SelectedEvent) => {
    const {title, description, photo, date, address, author} =event
    const dateStart = transferDate(date)
    return (
        <div className='mx-auto w-auto min-w-[50%] max-w-min p-10 flex flex-col space-y-4'>
            <div className='text-center text-xl'>{title}</div>
            <img src={photo}/>
            <div>{author}</div>
            <div className=' my-4 flex  mb-2 border-y border-gray-200 py-4 justify-between space-x-1 px-2 md:text-base text-sm'>
                <div className='flex flex-row space-x-1'>
                    <h1 className=' text-orange-600'> Where:</h1>
                    <div className='italic text-gray-500'>{address}</div>
                </div>
                <div className='flex flex-row space-x-1'>
                    <h1 className=' text-orange-600'> When:</h1>
                    <div className='italic text-gray-500'>{dateStart}</div>
                </div>
            </div>
            <div className='px-2'>{description}</div>

        </div>
    );
};

export default OnePost;