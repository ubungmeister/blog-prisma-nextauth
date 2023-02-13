import React, {useEffect, useState} from 'react';
import NewPostPage from "@/components/post/add-post/NewPostPage";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
import {GetServerSideProps, GetServerSidePropsContext} from "next";

const NewPost = () => {

    return (

        <div className='bg-white min-h-screen mx-auto justify-center pt-12'>
            <NewPostPage/>
        </div>

    );
};

export default NewPost;


export async function getServerSideProps(context:GetServerSidePropsContext) {
        const session = await getSession({req:context.req})
        if(!session){
            return{
                redirect:{
                    destination:"/authentication",
                    permanent:false
                }
            }
        }
        return {
            props:{session}
        }
}