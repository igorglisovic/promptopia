'use client'

import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
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
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchedResult = filterPrompts(e.target.value)
        setSearchResults(searchedResult)
      }, 500)
    )
  }

  const handleTagClick = tagText => {
    setSearchText(tagText)

    const searchedResult = filterPrompts(tagText)
    setSearchResults(searchedResult)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()

      setPosts(data)
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
      <PromptCardList
        data={searchText ? searchResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed
