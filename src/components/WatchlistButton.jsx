import { Icon } from '@iconify/react/dist/iconify.js'
import { useState, useEffect } from 'react'

export default function WatchlistButton({
  data,
  handleAddToWatchlist,
  setToastActive,
}) {
  const [mediaId, setMediaId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      console.log(data)
      setMediaId(data.tmdbId)
    }
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

  return !loading ? (
    <button className="btn" onClick={handleClick}>
      <Icon icon="material-symbols:add" className="text-xl" /> Add to Watchlist
    </button>
  ) : (
    <button className="btn">
      <Icon icon="eos-icons:loading" className="text-xl" /> Adding to Watchlist
    </button>
  )
}
