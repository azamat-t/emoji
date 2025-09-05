'use client'
// pages/favorites.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [copiedEmoji, setCopiedEmoji] = useState(null)

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem('emojiFavorites')) || []
    setFavorites(storedFavorites)
  }, [])

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

  // Remove from favorites
  const removeFavorite = (emoji) => {
    const updatedFavorites = favorites.filter((fav) => fav.name !== emoji.name)
    setFavorites(updatedFavorites)
    localStorage.setItem('emojiFavorites', JSON.stringify(updatedFavorites))
  }

  // Clear all favorites
  const clearAllFavorites = () => {
    if (confirm('Are you sure you want to clear all favorites?')) {
      setFavorites([])
      localStorage.setItem('emojiFavorites', JSON.stringify([]))
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Head>
        <title>My Favorites | Emoji Hub</title>
        <meta name='description' content='Your favorite emojis' />
      </Head>

      <header className='bg-indigo-600 text-white p-4 shadow-md'>
        <div className='container mx-auto flex justify-between items-center'>
          <Link href='/' className='text-2xl font-bold'>
            Emoji Hub
          </Link>
          <nav className='flex items-center space-x-4'>
            <Link
              href='/catalog'
              className='text-sm font-medium hover:text-indigo-200 transition-colors'
            >
              ← Back to Catalog
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

        <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-semibold text-gray-800'>
              My Favorite Emojis
            </h2>
            {favorites.length > 0 && (
              <button
                onClick={clearAllFavorites}
                className='text-sm text-red-600 hover:text-red-800 font-medium transition-colors'
              >
                Clear All
              </button>
            )}
          </div>
          <p className='text-gray-600 mt-2'>
            You have {favorites.length} favorite emojis
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className='text-center py-12 bg-white rounded-lg shadow-md'>
            <div className='text-5xl mb-4'>😢</div>
            <h3 className='text-xl font-medium text-gray-800 mb-2'>
              No favorites yet
            </h3>
            <p className='text-gray-500 mb-4'>
              Start adding emojis to your favorites from the catalog
            </p>
            <Link
              href='/catalog'
              className='inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors'
            >
              Browse Emojis
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {favorites.map((emoji) => (
              <div
                key={emoji.name}
                className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center relative'
              >
                {/* Remove button */}
                <button
                  onClick={() => removeFavorite(emoji)}
                  className='absolute top-2 right-2 p-1 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors'
                  aria-label='Remove from favorites'
                >
                  ❌
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
      </main>
    </div>
  )
}
