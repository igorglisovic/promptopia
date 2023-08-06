'use client'

import Profile from '@components/Profile'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')

  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/users/${params?.id}/posts`)
        const data = await response.json()

        setUserPosts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (params?.id) fetchPosts()
  }, [params.id])

  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={userPosts}
      loading={loading}
    />
  )
}

export default UserProfile
