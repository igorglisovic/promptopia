'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'
import { useEffect, useState } from 'react'

const MyProfile = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(session)
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await res.json()

        setPosts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (session?.user.id) fetchPosts()
  }, [])

  const handleEdit = post => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async post => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        })

        const filteredPosts = posts.filter(p => p._id !== post._id)

        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalazed profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      loading={loading}
    />
  )
}

export default MyProfile
