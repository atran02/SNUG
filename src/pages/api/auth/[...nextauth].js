import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { prisma } from "../../../../server/db/client"


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
secret: process.env.NEXTAUTH_SECRET