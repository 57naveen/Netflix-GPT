import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'

const GptSearch = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-900">
      <div className="w-full max-w-2xl mt-[10%]">
        <GptSearchBar />
      </div>
      <div className="w-full">
        <GptMovieSuggestion />
      </div>
    </div>
  )
}

export default GptSearch