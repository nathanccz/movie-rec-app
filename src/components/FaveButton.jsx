import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"

export default function FaveButton({ data, handleAddFave }) {
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
        await handleAddFave(mediaId)
    } catch (error) {
        console.error("Error adding favorite:", error);
    } finally {
        setLoading(false)
    }
   }

    return (
        <button className="btn" onClick={handleClick}>
            <Icon icon="mdi:heart-outline" className='text-xl'/>
        </button>
    )
}