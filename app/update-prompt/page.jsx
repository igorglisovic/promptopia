'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'
import Loading from '@components/Loading'

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const router = useRouter()

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`api/prompt/${promptId}`)
      const data = await res.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if (promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async e => {
    e.preventDefault()

    setSubmitting(true)

    if (!promptId) return alert('Prompt ID not found!')

    try {
      setLoading(true)
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt
