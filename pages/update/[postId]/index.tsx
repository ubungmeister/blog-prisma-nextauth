import React from 'react';
import {GetServerSideProps, GetStaticPaths, GetStaticProps} from "next";
import {PrismaClient} from "@prisma/client";
import {context} from "@opentelemetry/api";
import {PostType} from "@/components/post/add-post/NewPostPage";
import OnePost from "@/components/post/OnePost";
import UpdatePost from "@/components/post/UpdatePost";
import {getSession} from "next-auth/react";

export type SelectedEvent = {
    event: PostType
}

const prisma = new PrismaClient()

export const getServerSideProps:GetServerSideProps = async (context) => {
    const postId = context.params?.postId
    const session = await getSession(context)
    if(!session){
        return{
            redirect:{
                destination:"/",
                permanent:false
            }
        }
    }
    const event = await prisma.blog.findUnique({
        where: {
            id: Number(postId)
        },include:{
            author:{
                select:{name:true}
            }
        }
    })
    const date = event?.date.toLocaleDateString('en-US')
    return {
        props: {
            event: {
                title: event?.title,
                date,
                category: event?.category,
                address: event?.address,
                photo: event?.photo,
                description: event?.description,
                author: event?.author?.name,
                id:postId

            },

        }
    };
}

const SelectedPost = ({event}: SelectedEvent) => {
    return (
        <div className='min-h-screen bg-white'>
        <UpdatePost event={event}/>
    </div>
);
};

export default SelectedPost;