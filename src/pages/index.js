// pages/index.js
import { prisma } from '/server/db/client'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home({posts:read}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState(read)

  // Add a use effect in case the posts change when routing to the home page
  useEffect(() => {
    setPosts(read)
  }, [read])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/posts', { title, content })
    setPosts([...read, res.data])
    // console.log(res.data)
  }

  return (
    <div>
      <h1>Home</h1>

      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", maxWidth: "400px"}}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany()

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}