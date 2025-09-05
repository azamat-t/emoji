'use client'
// pages/catalog.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function EmojiCatalog() {
  const [emojis, setEmojis] = useState([])
  const [filteredEmojis, setFilteredEmojis] = useState([])
  const [categories, setCategories] = useState([])
  const [groups, setGroups] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [copiedEmoji, setCopiedEmoji] = useState(null)

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem('emojiFavorites')) || []
    setFavorites(storedFavorites)
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('emojiFavorites', JSON.stringify(favorites))
  }, [favorites])

  // Fetch all emojis
  const fetchEmojis = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://emojihub.yurace.pro/api/all')
      if (!response.ok) {
        throw new Error('Failed to fetch emojis')
      }
      const data = await response.json()
      setEmojis(data)
      setFilteredEmojis(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://emojihub.yurace.pro/api/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      setError(err.message)
    }
  }

  // Fetch groups
  const fetchGroups = async () => {
    try {
      const response = await fetch('https://emojihub.yurace.pro/api/groups')
      if (!response.ok) {
        throw new Error('Failed to fetch groups')
      }
      const data = await response.json()
      setGroups(data)
    } catch (err) {
      setError(err.message)
    }
  }

  // Filter emojis based on search query, category, and group
  const filterEmojis = () => {
    let filtered = emojis

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((emoji) =>
        emoji.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((emoji) => emoji.category === selectedCategory)
    }

    // Filter by group
    if (selectedGroup !== 'all') {
      filtered = filtered.filter((emoji) => emoji.group === selectedGroup)
    }

    setFilteredEmojis(filtered)
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  // Handle group change
  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value)
  }

  // Copy emoji to clipboard
  const copyEmoji = (emoji) => {
    const textArea = document.createElement('textarea')
    textArea.value = emoji.htmlCode[0]
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)

    setCopiedEmoji(emoji.name)
    setTimeout(() => setCopiedEmoji(null), 2000)
  }

  // Toggle favorite status
  const toggleFavorite = (emoji) => {
    if (favorites.some((fav) => fav.name === emoji.name)) {
      // Remove from favorites
      setFavorites(favorites.filter((fav) => fav.name !== emoji.name))
    } else {
      // Add to favorites
      setFavorites([...favorites, emoji])
    }
  }

  // Check if emoji is favorite
  const isFavorite = (emoji) => {
    return favorites.some((fav) => fav.name === emoji.name)
  }

  // Initialize data
  useEffect(() => {
    fetchEmojis()
    fetchCategories()
    fetchGroups()
  }, [])

  // Apply filters when any filter criteria changes
  useEffect(() => {
    filterEmojis()
  }, [searchQuery, selectedCategory, selectedGroup, emojis])

  return (
    <div className='min-h-screen bg-gray-50'>
      <Head>
        <title>Emoji Catalog | Emoji Hub</title>
        <meta name='description' content='Browse and search for emojis' />
      </Head>

      <header className='bg-indigo-600 text-white p-4 shadow-md'>
        <div className='container mx-auto flex justify-between items-center'>
          <Link href='/' className='text-2xl font-bold'>
            Emoji Hub
          </Link>
          <nav className='flex items-center space-x-4'>
            <Link
              href='/'
              className='text-sm font-medium hover:text-indigo-200 transition-colors'
            >
              ← Back to Home
            </Link>
            <Link
              href='/favorites'
              className='text-sm font-medium hover:text-indigo-200 transition-colors flex items-center'
            >
              ❤️ Favorites ({favorites.length})
            </Link>
          </nav>
        </div>
      </header>

      <main className='container mx-auto p-4'>
        {/* Notification for copied emoji */}
        {copiedEmoji && (
          <div className='fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50 animate-fadeInOut'>
            Copied {copiedEmoji} to clipboard!
          </div>
        )}

        {/* Filters */}
        <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Find Your Emoji
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Search input */}
            <div>
              <label
                htmlFor='search'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Search by name
              </label>
              <input
                type='text'
                id='search'
                placeholder='Search emojis...'
                value={searchQuery}
                onChange={handleSearch}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors'
              />
            </div>

            {/* Category filter */}
            <div>
              <label
                htmlFor='category'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Filter by category
              </label>
              <select
                id='category'
                value={selectedCategory}
                onChange={handleCategoryChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors'
              >
                <option value='all'>All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Group filter */}
            <div>
              <label
                htmlFor='group'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Filter by group
              </label>
              <select
                id='group'
                value={selectedGroup}
                onChange={handleGroupChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors'
              >
                <option value='all'>All Groups</option>
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600'></div>
            <p className='mt-4 text-gray-500'>Loading emojis...</p>
          </div>
        ) : error ? (
          <div className='bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg'>
            <strong className='font-bold'>Error: </strong>
            <span className='block sm:inline'>{error}</span>
            <button
              onClick={fetchEmojis}
              className='mt-3 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors'
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className='mb-6 flex justify-between items-center'>
              <p className='text-gray-600'>
                Showing {filteredEmojis.length} of {emojis.length} emojis
              </p>

              {filteredEmojis.length > 0 && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedGroup('all')
                  }}
                  className='text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors'
                >
                  Clear all filters
                </button>
              )}
            </div>

            {filteredEmojis.length === 0 ? (
              <div className='text-center py-12 bg-white rounded-lg shadow-md'>
                <div className='text-5xl mb-4'>😢</div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>
                  No emojis found
                </h3>
                <p className='text-gray-500'>
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {filteredEmojis.map((emoji) => (
                  <div
                    key={emoji.name}
                    className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center relative'
                  >
                    {/* Favorite button */}
                    <button
                      onClick={() => toggleFavorite(emoji)}
                      className={`absolute top-2 right-2 p-1 rounded-full ${
                        isFavorite(emoji)
                          ? 'bg-red-100 text-red-500'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      } transition-colors`}
                      aria-label={
                        isFavorite(emoji)
                          ? 'Remove from favorites'
                          : 'Add to favorites'
                      }
                    >
                      {isFavorite(emoji) ? '❤️' : '🤍'}
                    </button>

                    {/* Emoji display */}
                    <div
                      className='text-3xl mb-3'
                      dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }}
                    />

                    {/* Emoji name */}
                    <h3 className='text-sm font-medium text-center text-gray-800 mb-1 line-clamp-2'>
                      {emoji.name}
                    </h3>

                    {/* Category */}
                    <div className='text-xs text-gray-500 text-center mt-auto mb-2'>
                      <span className='block'>{emoji.category}</span>
                    </div>

                    {/* Copy button */}
                    <button
                      onClick={() => copyEmoji(emoji)}
                      className='w-full bg-indigo-600 text-white py-1 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center'
                    >
                      <svg
                        className='w-4 h-4 mr-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
                        ></path>
                      </svg>
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
