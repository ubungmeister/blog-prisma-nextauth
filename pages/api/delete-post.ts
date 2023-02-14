import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const postId = req.body.id
        try{
            await prisma.blog.delete({
                where:{id:Number(postId)}
            })
            res.status(200).json({message:'Post deleted'})
        }catch (error){
            res.status(400).json({message:error})
        }

}
