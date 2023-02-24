import {GetStaticProps} from "next";
import {PrismaClient} from "@prisma/client";
import {PostType} from "@/components/post/add-post/NewPostPage";
import AllPosts from "@/components/post/AllPosts";
import '../styles/Home.module.css'
import {select} from "ts-pattern/dist/patterns";
import {getSession} from "next-auth/react";

const prisma = new PrismaClient()

export type PostsArrType = {
    posts: PostType[]
}
export type HomeProps = PostsArrType & {
    error?: string;

}
export default function Home({posts, error}: HomeProps) {

    return (
        <div className=''>
            {error
                ? (<div className='error'>{error}</div>)
                : (
                <div className='pt-10 mb-10 grid grid-cols-1 md:grid-cols-2 gap-10 '>
                    {posts.map((post) => {
                        return (
                            <div key={post.id}>
                                <AllPosts post={post}/>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const posts = await prisma.blog.findMany()
        const session = await getSession()

        return {
            props: {
                posts: posts.reverse().map((event) => ({
                    id: event.id.toString(),
                    title: event.title,
                    description: event.description,
                    address: event.address,
                    photo: event.photo,
                    category: event.category,
                    date: new Date(event.date).toLocaleDateString('en-US'),
                    author: event.authorEmail
                })),
                user: session?.user?.email || null
            }
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                posts: []
            }
        }
    }

}
