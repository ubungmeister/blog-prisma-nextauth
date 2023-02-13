import {PrismaClient} from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {verifyPassword} from "@/utils";

const prisma = new PrismaClient()

export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials){
                const findUser =  await prisma.user.findFirst({
                    where: {
                        email: credentials?.email
                    }
                })
                if(!findUser){
                    console.log('No user found')
                }
                const isValid = await verifyPassword(credentials?.password, findUser?.password)
                if(!isValid){
                    console.log('Could not login')
                }
                return {
                    email:findUser?.email,
                    id: findUser?.id
                }
            }
        })
    ]
})
