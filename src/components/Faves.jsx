import { useState, useEffect } from 'react'
import { getFaves } from '../services/api'
import SearchBar from './SearchBar'
import { useModalContext } from './modal-context'
import { Icon } from '@iconify/react/dist/iconify.js'
import { removeFave } from '../services/api'

export default function Faves({ userData, setActiveRoute, activeRoute }) {
  const [faves, setFaves] = useState([])
  const [loading, setLoading] = useState(false)
  const { handleModalOpen } = useModalContext()
  const [isHovered, setIsHovered] = useState(null)

  useEffect(() => {
    async function fetchFaves() {
      const data = await getFaves()
      console.log(data)
      if (data.length > 0) {
        setFaves(data)
      }
    }
    fetchFaves()
  }, [])

  const handleRemoveFave = async (mediaId) => {
    try {
      const response = await removeFave(mediaId)

      if (response) {
        setFaves(faves.filter((fave) => fave.tmdbId !== mediaId))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main class="p-10 bg-black w-full h-screen bg-main-background bg-cover rounded-tl-lg border-r-[1px] border-gray-400 overflow-y-scroll relative">
      <SearchBar userData={userData} />
      <h1 className="text-3xl font-bold mb-2 text-white">
        {' '}
        <i class="fa-regular fa-star"></i> My Faves{' '}
      </h1>

      <div className="divider divider-neutral"></div>

      <div className="w-full flex flex-wrap gap-3">
        {faves.map((fave) => (
          <div
            key={fave.tmdbId}
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(fave.tmdbId)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <img
              src={fave.poster}
              alt={`poster for ${fave.title}`}
              className={
                'lg:w-[200px] lg:h-[300px] cursor-pointer hover:scale-110 ease-in-out duration-500 w-full h-full' +
                `${fave.tmdbId === isHovered ? ' opacity-50' : ''}`
              }
              onClick={() =>
                handleModalOpen(fave.tmdbId, fave.mediaType, activeRoute)
              }
            />
            {isHovered && fave.tmdbId === isHovered && (
              <div className="relative">
                <Icon
                  icon="mdi:heart"
                  className="text-3xl cursor-pointer absolute right-0 bottom-0"
                  onClick={() => handleRemoveFave(fave.tmdbId)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
