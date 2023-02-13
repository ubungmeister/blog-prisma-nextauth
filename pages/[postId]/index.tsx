import React from 'react';
import {GetStaticPaths, GetStaticProps} from "next";
import {PrismaClient} from "@prisma/client";
import {context} from "@opentelemetry/api";
import {PostType} from "@/components/post/add-post/NewPostPage";
import OnePost from "@/components/post/OnePost";

export type SelectedEvent = {
    event: PostType
}

const prisma = new PrismaClient()

export const getStaticPaths: GetStaticPaths = async () => {
    const eventIds = await prisma.blog.findMany({
        select: {id: true}
    })
    const paths = eventIds.map(post => ({
        params: {postId: post.id.toString()}
    }))
    return {
        paths,
        fallback: false
    }
}
export const getStaticProps: GetStaticProps = async (context) => {
    const postId = context.params?.postId
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
                author: event?.author?.name
            }
        }
    };
}

const SelectedPost = ({event}: SelectedEvent) => {
    return (
        <div className='min-h-screen bg-white'>
           <OnePost event={event}/>
        </div>
    );
};

export default SelectedPost;