import React, {FormEvent, useRef, useState} from 'react';
import {useRouter, withRouter} from "next/router";
import {useAppContext} from "@/components/authContext/AuthContext";

export const createUser = async (registerData: RegisterData) => {
    try {
        const result = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                'Content-type': 'application/json'
            }
        })
        return result
    } catch (error) {
        console.log(error)
    }

}

export type RegisterData = {
    email: string
    password: string
    id?: number
    name?: string
}

export type isLoginType = {
    isLogin: (isLogin: boolean) => void
}


const Register = () => {
    const {setIsLogin} = useAppContext()
    const router = useRouter()
    const initialState = {email: '', password: '', name: ''}
    const [registerData, setRegisterData] = useState<RegisterData>(initialState)
    const [success, setSuccess] = useState<boolean>(false)

    const onFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (registerData.email.trim() && registerData.password.trim().length >= 6) {
            const result = await createUser(registerData)
            if (result) {
                await router.replace('/')

            }
        }
    }

    return (
        <form
            className='mx-auto items-center w-auto md:min-w-[25%] min-w-[70%] max-w-min flex flex-col py-8 border rounded-md border-gray-500 space-y-4'
            onSubmit={(e) => onFormHandler(e)}>

            <h1 className='text-xl'>Register</h1>
            <input className='border border-gray-500 p-2 rounded-md'
                   placeholder={'User name'}
                   value={registerData.name}
                   onChange={(e) =>
                       setRegisterData({...registerData, name: e.currentTarget.value})}
            />
            <input className='border border-gray-500 p-2 rounded-md'
                   placeholder={'Email'}
                   value={registerData.email}
                   onChange={(e) =>
                       setRegisterData({...registerData, email: e.currentTarget.value})}
            />
            <input className='border border-gray-500 p-2 rounded-md'
                   placeholder={'Password'}
                   value={registerData.password}
                   onChange={(e) =>
                       setRegisterData({...registerData, password: e.currentTarget.value})}
            />
            <button className='hover:bg-indigo-500 font-semibold p-1.5 bg-blue-400 text-white rounded-md text-xl'
                    type={"submit"}>Submit
            </button>
            <div className='flex flex-row space-x-1'>
                <p>Have have an account</p>
                <button onClick={() => setIsLogin(false)}>Login</button>

            </div>
        </form>
    );
};

export default Register;