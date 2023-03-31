// pages/api/posts.js
// import { PrismaClient } from '@prisma/client'
import { prisma } from "/server/db/client"

import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
// import { useRouter } from "next/router"

// const prisma = new PrismaClient()

export default async function handle(req, res) {
  const { method } = req
  
  const handleClickProfile = ()=>{
    router.push('/profile')
  }

  switch (method) {
    case 'POST':
        const session = await getServerSession(req, res, authOptions)
    if(!session){
        res.status(401).json({error:'Unauthorized'})
        return
    }
      // get the title and content from the request body
      const { title, content } = req.body
      // use prisma to create a new post using that data
      const post = await prisma.post.create({
        data: {
          title,
          content
        }
      })
      // send the post object back to the client
      res.status(201).json(post)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}