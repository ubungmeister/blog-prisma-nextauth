import React, {FormEvent, useState} from 'react';
import {SelectedEvent} from "@/pages/[postId]";
import {editPost, transferDate} from "@/utils";
import ReactDatePicker from "react-datepicker";
import SelectCategory from "@/components/post/add-post/SelectCategory";
import "react-datepicker/dist/react-datepicker.css";


const OnePost = ({event}:SelectedEvent) => {
    const {title, description, photo, date, address, author, category,id} =event
    const [newDate, setNewDate] = useState<Date>(new Date(date))
    const [newCategory, setNewCategory] = useState(category)
    const dateStart = transferDate(date)
    const initialState = {title, description, photo, date, address, author, category}
    const [postData, setPostData]=useState(initialState)

    const onFormHandler = async (e:FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
        const data = {...postData, date:newDate, category:newCategory, id}
            await editPost(data)
    }

    return (
        <form onSubmit={(e) => onFormHandler(e)}
              className='mx-auto items-center flex flex-col bg-gray-100 w-auto
              md:min-w-[35%] min-w-[60%] max-w-min py-4 space-y-2 rounded-md'>
            <div className='text-xl p-2'>Add Event</div>
            <input
                onChange={(e)=>setPostData({...postData, title:e.target.value})}
                value={postData.title}
                className=' p-2 md:w-2/3 w-5/6 '
                placeholder='Title'
            />
            <textarea
                onChange={(e)=>setPostData({...postData, description:e.target.value})}
                value={postData.description}
                className='w-full p-2 md:w-2/3 w-5/6 '
                placeholder='Description'
            />
            <input
                onChange={(e)=>setPostData({...postData, address:e.target.value})}
                value={postData.address}
                className='w-full p-2 md:w-2/3 w-5/6 '
                placeholder='Address'
            />
            <input
                onChange={(e)=>setPostData({...postData, photo:e.target.value})}
                value={postData.photo}
                className='w-full p-2 md:w-2/3 w-5/6 '
                placeholder='Photo src'
            />
            <div className='w-full md:w-2/3 w-5/6'>
                <ReactDatePicker
                    className='py-1 text-center focus:outline-none w-full'
                    closeOnScroll={true}
                    selected={newDate}
                    onChange={(date: Date) => setNewDate(date)}
                />
            </div>
            <SelectCategory
                selectedCategory={setNewCategory}/>
            <button
                className='bg-blue-400 px-2 py-1 text-xl text-white rounded-md hover:bg-blue-500'
                type={'submit'}>Submit
            </button>
        </form>
    );
};

export default OnePost;