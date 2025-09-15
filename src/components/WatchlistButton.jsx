import { Icon } from '@iconify/react/dist/iconify.js'
import { useState, useEffect } from 'react'
import { getWatchlist } from '../services/api'
import { isEmpty } from '../../utils/helpers'

export default function WatchlistButton({
  data,
  handleAddToWatchlist,
  setToastActive,
}) {
  const [mediaId, setMediaId] = useState('')
  const [loading, setLoading] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  useEffect(() => {
    if (data) {
      console.log(data)
      setMediaId(data.tmdbId)
    }
    const checkWatchlist = async () => {
      const watchlist = await getWatchlist()
      console.log(mediaId)
      console.log(
        !isEmpty(watchlist.find((title) => title.tmdbId == data.tmdbId))
      )
      return !isEmpty(watchlist.find((title) => title.tmdbId == data.tmdbId))
    }
    setIsInWatchlist(checkWatchlist())
  }, [data])

  const handleClick = async () => {
    if (!mediaId) {
      console.log('No mediaId found')
      return
    }

    setLoading(true)

    try {
      await handleAddToWatchlist(mediaId)
      setToastActive(true)
    } catch (error) {
      console.error('Error adding favorite:', error)
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setToastActive(false)
      setLoading(false)
    }
  }

  return loading ? (
    <button className="btn">
      <Icon icon="eos-icons:loading" className="text-xl" /> Adding to Watchlist
    </button>
  ) : !isInWatchlist ? (
    <button className="btn" onClick={handleClick}>
      <Icon icon="material-symbols:add" className="text-xl" /> Add to Watchlist
    </button>
  ) : (
    <button className="btn">
      <Icon icon="gg:remove" className="text-xl" /> Remove from Watchlist
    </button>
  )
}
