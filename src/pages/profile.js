// /pages/profile.jsx
import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { useRouter } from "next/router"
import NavBar from "../../comps/navBar"
import styles from '@/styles/Home.module.css'
import Head from "next/head"


export default function Component() {
  const { data: session } = useSession()
  const router = useRouter()
  const handleClickHome = ()=>{
    router.push('/')
  }

    const handleClickProfile = ()=>{
      router.push('/profile')
    }
    const handleClickSnug = ()=>{
      router.push('/snugs')
    }

  if (session) {
    return (
      <>
        <Head>
        <title>SNUG.</title>
        <meta name="description" content="cozy safe place where you can let your feelings out" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/snug.png" />
      </Head>
      <div className={styles.mainH}>
      <NavBar/>
      <div className={styles.snugCont}>
          <div className={styles.snugInfo}>
            <h1>Signed in as {session.user.email}</h1>
            <img src={session.user.image} />
            <h4>{session.user.name}</h4>
          </div>

          <div className={styles.hBtn}>
            <button onClick={() => signOut()}>Sign Out</button>
            <button onClick={handleClickSnug}>View SNUGS</button>
          </div>
        </div>
        </div>
{/* 
        <button onClick={handleClickHome}>Go Home</button>
        <button onClick={() => signOut()}>Sign out</button> */}
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
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