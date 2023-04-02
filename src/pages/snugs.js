// pages/index.js
import { prisma } from '/server/db/client'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Head from 'next/head'

import NavBar from '../../comps/navBar'
import styles from '@/styles/Home.module.css'

export default function Snugs({posts:read}) {
    console.log(read);
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState(read)

  // Add a use effect in case the posts change when routing to the home page
  useEffect(() => {
    setPosts(read)
  }, [read])
  

  const handleSubmit = async (e) => {
    // e.preventDefault()
    const res = await axios.post('/api/posts', { title, content })
    setPosts([...read, res.data])
    // console.log(res.data)
  }
  const handleLike = async (id) => {
    // e.preventDefault()
    const res = await axios.post('/api/posts/likes', { postId: id })
    posts.filter((post) => {if(res.data.postId === post.id)post.likes.push(res.data)});
    setPosts(posts)
    // setLike([...read, res.data])
    // console.log(res.data)
  }

  return (
    <>
      <Head>
        <title>SNUG.</title>
        <meta name="description" content="cozy safe place where you can let your feelings out" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/snug.png" />
      </Head>
      <div className={styles.main}>
        <NavBar/>
        
        <div className={styles.formCont}>
          <form onSubmit={handleSubmit} className={styles.formStyle}>
            <input type="text" value={title} placeholder="Post Title..." onChange={(id) => setTitle(id.target.value)} />
            <textarea value={content} placeholder="What is on your mind?" onChange={(id) => setContent(id.target.value)} />
            <button type="submit">Post My SNUG!</button>
          </form>
        </div>

        {posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className={styles.likesCont}>
                <div className={styles.functions}>
                    <p>Edit</p>
                    <p>Delete</p>
                </div>
                <p className={styles.likes}>{post.likes.length ? post.likes.length : 0}<img onClick={(id)=>handleLike(post.id)}src="https://cdn3.emoji.gg/emojis/4459_ComfyBlob.png" width="28px" alt="ComfyBlob"/></p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps() {
    const posts = await prisma.post.findMany({include: {likes:true}})

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}