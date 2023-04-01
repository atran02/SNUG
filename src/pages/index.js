// pages/index.js
import { prisma } from '/server/db/client'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import NavBar from '../../comps/navBar'
import styles from '@/styles/Home.module.css'

export default function Home({posts:read}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState(read)

  const router = useRouter();
  // Add a use effect in case the posts change when routing to the home page
  useEffect(() => {
    setPosts(read)
  }, [read])
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const res = await axios.post('/api/posts', { title, content })
  //   setPosts([...read, res.data])
  //   // console.log(res.data)
  // }

  const handleClickSnug = ()=>{
    router.push('/snugs')
  }
  const handleClickProfile = ()=>{
    router.push('/profile')
  }

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
            <h1>Welcome to SNUG!</h1>
            <h4>SNUG is a place for you to get anything off your chest. Just type your troubles away!</h4>
            <img src='/snug.png' alt='Comfy Blob Emote'/>
          </div>

          <div className={styles.hBtn}>
            <button onClick={handleClickProfile}>Login</button>
            <button onClick={handleClickSnug}>View SNUGS</button>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    orderBy:{
      createdAt: 'desc'
    },
    include: {
      user: true,
    }
  })
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}