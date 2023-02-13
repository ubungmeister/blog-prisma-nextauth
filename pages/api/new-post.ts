import {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client/";
import {getSession} from "next-auth/react";
// interface AuthRequest extends NextApiRequest {
//     auth: {
//         user: any;
//     };
// }
const prisma = new PrismaClient()

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const {title, description, address, date, category,photo} = req.body
    // const author = req.auth.user
    const session = await getSession({ req:req });
    const email = session?.user?.email as string

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