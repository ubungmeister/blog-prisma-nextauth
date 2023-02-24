import {RegisterData} from "@/components/authentication/Register";
import {compare, hash} from "bcryptjs";
import {PostType} from "@/components/post/add-post/NewPostPage";


export const transferDate =(date:Date)=>{
    const newDate = new Date(date).toLocaleDateString('en-US')
    return newDate
}

export const  createUser =async (registerData:RegisterData)=>{
    try{
        const result = await fetch('/api/register',{
            method: 'POST',
            body:JSON.stringify(registerData),
            headers: {
                'Content-type': 'application/json'
            }
        })
        return result
    }catch (error){
        console.log(error)
    }

}
export async function hashPassword(password: string) {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
}

export async function verifyPassword(password:any, hashedPassword:any){
    const isValid = await compare(password,hashedPassword)
    return isValid
}

export const createPost = async (data: PostType) => {
    const result = await fetch('/api/new-post', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
}

export const deletePost= async (id:number)=>{

    const result = await fetch('/api/delete-post', {
        method: 'DELETE',
        body: JSON.stringify({id}),
        headers: {'Content-Type': 'application/json'}
    })

}
export const editPost= async (data:PostType)=>{

    const result = await fetch('/api/new-post', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })

}