import {RegisterData} from "@/components/authentication/Register";
import {compare, hash} from "bcryptjs";


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