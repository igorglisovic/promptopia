'use client'

import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import Loading from './Loading'

const PromptCardList = ({ data, handleTagClick, loading }) => {
  return (
    <div className="mt-2 prompt_layout">
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [posts, setPosts] = useState([])

  const filterPrompts = searchText => {
    const regex = new RegExp(searchText, 'i')
    return posts.filter(
      item =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }

  const handleSearchChange = e => {
    setLoading(true)
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchedResult = filterPrompts(e.target.value)
        setSearchResults(searchedResult)
        setLoading(false)
      }, 500)
    )
  }

  const handleTagClick = tagText => {
    setSearchText(tagText)

    const searchedResult = filterPrompts(tagText)
    setSearchResults(searchedResult)
  }

  useEffect(() => {
    if (!searchResults.length && searchText) {
      setErrorMessage('No prompts found.')
    }

    if (searchResults.length) {
      setErrorMessage('')
    }
  }, [searchResults])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/prompt')
        const data = await res.json()

        setPosts(data)
      } catch (error) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex items-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {errorMessage && <p className="mt-2">{errorMessage}</p>}
      {loading ? (
        <Loading />
      ) : (
        <PromptCardList
          data={searchText ? searchResults : posts}
          handleTagClick={handleTagClick}
          loading={loading}
        />
      )}
    </section>
  )
}

export default Feed
