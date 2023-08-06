'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'
import Loading from '@components/Loading'

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { data: session } = useSession()

  const createPrompt = async e => {
    e.preventDefault()

    setSubmitting(true)

    try {
      setLoading(true)
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      })

      if (res.ok) {
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
      setLoading(false)
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
