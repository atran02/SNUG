// pages/api/posts.js
// import { PrismaClient } from '@prisma/client'
import { prisma } from "../../../../../server/db/client"
import { getServerSession } from "./../../auth/[...nextauth]"
import { authOptions } from "./../../auth/[...nextauth]"
// import { useRouter } from "next/router"

// const prisma = new PrismaClient()

export default async function handle(req, res) {
  const { method } = req
  
//   prisma.user.update({
//     where: {email:session.user.email},
//   })

const session = await getServerSession(req, res, authOptions)
if(!session){
    res.status(401).json({error:'Unauthorized'})
    return
}

const prismaUser = await prisma.user.findUnique({
    where: {email: session.user.email},
})

if (!prismaUser){
    res.status(401).json({error:'Unauthorized'})
    return
}
  switch (method) {
    case 'POST':
      const { postId } = req.body
      
  
      const like = await prisma.like.create({
        data: {
          postId,
          userId: prismaUser.id,
        },
      })
      // send the post object back to the client
      res.status(201).json(like)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}