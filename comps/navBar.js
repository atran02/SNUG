import compStyles from '@/styles/comps.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/api/auth/[...nextauth]"

export default function NavBar()
{
    const { data: session } = useSession()
    const router = useRouter();
    const userNA = "user";

    const handleClickHome = ()=>{
        router.push('/')
      }
      const handleClickProfile = ()=>{
        router.push('/profile')
      }
    return <>
        <div className={compStyles.navC}>
            <div className={compStyles.nav}>
                <h1 onClick={handleClickHome}>SNUG.</h1>
                {/* <Link href='/'>          
                    <h1>SNUG.</h1>
                </Link>  */}
                <div className={compStyles.navAlign}>
                    <div className={compStyles.navItem1}>
                        <p>{session ? session.user.name : userNA}</p>
                    </div>
                    {/* <img src="https://cdn3.emoji.gg/emojis/4459_ComfyBlob.png" width="64px" alt="ComfyBlob" onClick={handleClickProfile}/> */}
                    <Link href='/profile'><img src="https://cdn3.emoji.gg/emojis/4459_ComfyBlob.png" width="64px" alt="ComfyBlob"/></Link>
                </div>
            </div>
        </div>
    </>
}


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    //redirect to login page
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}