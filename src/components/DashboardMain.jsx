import { useState, useEffect } from 'react'
import { getTrendingNow } from '../services/tmdb-api'
import MediaCard from './MediaCard'
import SearchBar from './SearchBar'

export default function DashboardMain({ userData, isMobile }) {
  const [movies, setMovies] = useState([])
  const [tvShows, setTvShows] = useState([])
  const [loading, setLoading] = useState(false)
  const [userRegion, setUserRegion] = useState('')

  useEffect(() => {
    setLoading(true)

    async function fetchTrendingMovies() {
      try {
        setUserRegion('US') //Need to fix error reading undefined at user.country
        const movieData = await getTrendingNow('Netflix', 'movie', userRegion)
        const tvData = await getTrendingNow('Netflix', 'tv', userRegion)
        console.log('movies from index', movieData)
        setMovies(movieData)
        setTvShows(tvData)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTrendingMovies()
  }, [])

  return (
    <main
      class={
        ' bg-black w-full h-screen bg-main-background bg-cover rounded-tl-lg border-r-[1px] border-gray-400 overflow-y-scroll relative' +
        `${isMobile ? ' p-2' : ' p-10'}`
      }
    >
      {!isMobile && <SearchBar userData={userData} />}
      <h1 className="text-3xl font-bold mb-5 text-white">
        {' '}
        <i class="fa-regular fa-star"></i> Watch Now{' '}
      </h1>
      <span className="text-white">Top movies for you. Updated daily.</span>

      <div className="divider divider-neutral"></div>
      <h2 className="text-xl font-bold mb-5 text-white">Top Movies</h2>
      <div className="flex lg:flex-row overflow-x-scroll mb-8 gap-5 w-full">
        <MediaCard data={movies} loading={loading} />
      </div>
      <h2 className="text-xl font-bold mb-5 text-white">Top TV Shows</h2>
      <div className="flex lg:flex-row overflow-x-scroll mb-8 gap-5 w-full">
        <MediaCard data={tvShows} loading={loading} />
      </div>
    </main>
  )
}
