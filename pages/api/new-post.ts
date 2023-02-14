import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client/";
import {getSession} from "next-auth/react";
const prisma = new PrismaClient()

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const {title, description, address, date, category,photo, id} = req.body

    const session = await getSession({ req:req });
    const email = session?.user?.email as string
    if(req.method === 'POST'){
        try {
            const result = await prisma.blog.create({
                data: {
                    author:{connect:{email:email}},
                    title,
                    description,
                    address,
                    date,
                    category,
                    photo
                }
            })
            res.status(200).json({message: 'Success'})
            return result
        } catch (err) {
            res.status(400).json({message: err})
        }
    }
    if(req.method === 'PUT'){
        try {
            const result = await prisma.blog.update({
                where:{id:Number(id)},
                data: {
                    author:{connect:{email:email}},
                    title,
                    description,
                    address,
                    date,
                    category,
                    photo
                }
            })
            res.status(200).json({message: 'Success'})
            return result
        } catch (err) {
            res.status(400).json({message: err})
        }
    }


}