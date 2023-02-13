import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";
import {hashPassword} from "@/utils";

const prisma = new PrismaClient()


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {email, password, name} = req.body
    const hashedPassword = await hashPassword(password)
    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        res.status(200).json({message: 'User created'})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'Fail to create user'})
    }
}