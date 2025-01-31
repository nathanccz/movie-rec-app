import { Icon } from "@iconify/react/dist/iconify.js"
import { useState, useEffect } from "react"

export default function WatchlistButton({ data, handleAddToWatchlist }) {
    const [mediaId, setMediaId] = useState('')
       const [loading, setLoading] = useState(false)
       
       useEffect(() => {
        if (data) {
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
        } catch (error) {
            console.error("Error adding favorite:", error);
        } finally {
            setLoading(false)
        }
       }
    
    return (
        <button className="btn" onClick={handleClick}>
           <Icon icon="material-symbols:add" className='text-xl'/> Add to Watchlist 
        </button>
    )
}