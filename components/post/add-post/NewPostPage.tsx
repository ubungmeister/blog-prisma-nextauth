import React, {FormEvent, ReactNode, useRef, useState} from 'react';
import SelectCategory from "@/components/post/add-post/SelectCategory";
import ReactDatePicker from "react-datepicker";
import {useRouter} from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import {RegisterData} from "@/components/authentication/Register";
import {createPost} from "@/utils";

export type PostType = {
    user?:string
    author?: string
    id?: number
    title: string
    description: string
    category: string
    date: Date
    address: string
    photo: string

}


const NewPostPage = () => {

    const [category, setCategory] = useState('')
    const [date, setDate] = useState<Date>(new Date())
    const titleInputRef = useRef<HTMLInputElement>(null)
    const addressInputRef = useRef<HTMLInputElement>(null)
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null)
    const photoInputRef = useRef<HTMLInputElement>(null)

    const router = useRouter()

    const onFormHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const title = titleInputRef.current?.value as string
        const description = descriptionInputRef.current?.value as string
        const address = addressInputRef.current?.value as string
        const photo = photoInputRef.current?.value as string
        const data = {title, description, address, date, category, photo}
        if (data) {
            try {
                await createPost(data)
                console.log("Post created successfully")
                await router.replace('/')
            } catch (error) {
                console.error("Error creating post:", error)
            }
        }
    }

    return (
        <form onSubmit={(e) => onFormHandler(e)}
              className='mx-auto items-center flex flex-col bg-gray-100 w-auto
              md:min-w-[35%] min-w-[70%] max-w-min py-4 space-y-2 rounded-md'>
            <div className='text-xl p-2'>Add Event</div>
            <input
                ref={titleInputRef}
                className=' p-2 md:w-3/4 w-5/6 '
                placeholder='Title'
            />
            <textarea
                ref={descriptionInputRef}
                className=' p-2 md:w-3/4 w-5/6 '
                placeholder='Description'
            />
            <input
                ref={addressInputRef}
                className=' p-2 md:w-3/4 w-5/6 '
                placeholder='Address'
            />
            <input
                ref={photoInputRef}
                className=' p-2 md:w-3/4 w-5/6 '
                placeholder='Photo src'
            />
            <div className=' md:w-3/4 w-5/6'>
                <ReactDatePicker
                    className='py-1 text-center focus:outline-none w-full'
                    closeOnScroll={true}
                    selected={date}
                    onChange={(date: Date) => setDate(date)}
                />
            </div>
            <SelectCategory
                selectedCategory={setCategory}/>
            <button
                className='bg-blue-400 px-2 py-1 text-xl text-white rounded-md hover:bg-blue-500'
                type={'submit'}>Submit
            </button>
        </form>
    );
};

export default NewPostPage;

