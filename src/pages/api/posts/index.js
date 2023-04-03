// pages/api/posts.js
// import { PrismaClient } from '@prisma/client'
import { prisma } from "/server/db/client"

import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
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
      // get the title and content from the request body
      const { title, content } = req.body
      // use prisma to create a new post using that data
      const post = await prisma.post.create({
        data: {
          title,
          content,
          userId: prismaUser.id,
        },
        include: {
            likes: true,
        }, 
      })
      // send the post object back to the client
      res.status(201).json(post)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}