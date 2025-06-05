import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { Icon } from '@iconify/react/dist/iconify.js'
import { getOpenAIRecommendations } from '../services/api'
import ChatMain from './ChatMain'
import { buildResultsMessage, isLikelyMediaRelated } from '../../utils/helpers'
import { generateDataFromMessage } from '../services/tmdb-api'

export default function DeepSearch({ userData, setActiveRoute, activeRoute }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [mediaType, setMediaType] = useState('any')
  const [message, setMessage] = useState('')
  const [userMessages, setUserMessages] = useState([])
  const [isChatting, setIsChatting] = useState(false)
  const [introMessage, setIntroMessage] = useState('')
  const [endMessage, setEndMessage] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    setActiveRoute('deepsearch')
  }, [])

  const handleGetRecommendations = async () => {
    if (!message) {
      alert('Please enter a message.')
      return
    }
    if (!isLikelyMediaRelated(message)) {
      alert("Couldn't generate recommendations. Please try again.")
      return
    }
    try {
      console.log(message, mediaType)
      const response = await getOpenAIRecommendations(mediaType, message)
      console.log(response)
      setIsChatting(true)
      const data = buildResultsMessage(response.reply)
      const results = await generateDataFromMessage(data[1])
      console.log(results)
      setIntroMessage(data[0])
      setEndMessage(data[2])
      setResults(results.filter((el) => el))
      setUserMessages([...userMessages, message])
      setMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)
  }

  const handleClick = (e) => {
    if (e.target.tagName === 'BUTTON') {
      const selected = e.target.textContent.toLowerCase()
      console.log('Selected category:', selected)
      setMediaType(selected)
    }
  }

  return !isChatting ? (
    <main className="p-10 bg-black w-full h-screen bg-main-background bg-cover rounded-tl-lg border-r-[1px] border-gray-400 overflow-y-scroll relative">
      <div className="flex items-center justify-center h-full flex-col gap-5">
        <h2 className="font-bold text-xl">
          Welcome to Deep Search, powered by DeepSeek AI.
        </h2>
        <p className="text-md">
          What kind of movie or TV show are you looking for?
        </p>
        <p className="text-sm italic">
          Example: "What are some good movies for date night?"
        </p>
        <div className="w-3/5 p-2 border rounded bg-gray-800">
          <div className="mb-1">
            <textarea
              className="textarea textarea-secondary w-full resize-none border-none focus:outline-none overflow-visible bg-transparent"
              placeholder="Ask me anything..."
              onChange={handleInputChange}
              value={message}
            ></textarea>
          </div>
          <div className="flex justify-between">
            <div className="h-[2rem] over" onClick={handleClick}>
              <button className="btn btn-outline text-xs mr-3 px-3 h-[2.1rem] rounded">
                Any
              </button>
              <button className="btn btn-outline text-xs mr-3 px-3 h-[2.1rem] rounded">
                Movie
              </button>
              <button className="btn btn-outline text-xs px-3 h-[2.1rem] rounded">
                TV
              </button>
            </div>
            <Icon
              icon="mdi:send-circle"
              className="text-3xl cursor-pointer"
              onClick={handleGetRecommendations}
            />
          </div>
        </div>
      </div>
    </main>
  ) : (
    <ChatMain
      userData={userData}
      results={results}
      handleInputChange={handleInputChange}
      userMessages={userMessages}
      handleGetRecommendations={handleGetRecommendations}
      message={message}
      introMessage={introMessage}
      endMessage={endMessage}
    />
  )
}
