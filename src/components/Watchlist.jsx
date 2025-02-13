import { useState, useEffect } from "react"
import { getWatchlist } from "../services/api";
import SearchBar from "./SearchBar";
import { useModalContext } from "./modal-context";
import { Icon } from "@iconify/react/dist/iconify.js"
import { removeFromWatchlist } from "../services/api";


export default function Watchlist({ userData, setActiveRoute }) {
    const [watchlist, setWatchlist] = useState([])
    const [loading, setLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const {handleModalOpen} = useModalContext()
   
    useEffect(() => {
        setActiveRoute('watchlist')
        async function fetchWatchlist() {
            const data = await getWatchlist()
            console.log(data)
            if (data.length > 0) {
                setWatchlist(data)
            } 
        }
        fetchWatchlist()
    }, [])

    const setOpacityClass = () => {
        let baseClass = "lg:w-[200px] lg:h-[300px] cursor-pointer hover:scale-110 ease-in-out duration-500 w-full h-full"
        if (isHovered) {
            baseClass += ' opacity-50'
        }
        return baseClass
    }

     const handleRemoveFromWatchlist = async (mediaId) => {
            try {
                const response = await removeFromWatchlist(mediaId)
              
                if (response) {
                    setWatchlist(watchlist.filter(fave => fave.tmdbId !== mediaId))
                }
            } catch (error) {
                console.log(error)
            }
        }

    return (
        <main class="p-10 bg-black w-full h-screen bg-main-background bg-cover rounded-tl-lg border-r-[1px] border-gray-400 overflow-y-scroll relative">
            <SearchBar userData={userData} />
            <h1 className="text-3xl font-bold mb-2 text-white"> <i class="fa-regular fa-star"></i> Your Watchlist </h1> 

            <div className="divider divider-neutral"></div>
            
            <div className="w-full flex flex-wrap gap-3">
                {watchlist.map(title =>
                    <div key={title.tmdbId} className="overflow-hidden relative">
                        <img src={title.poster} alt={`poster for ${title.title}`} onClick={() => handleModalOpen(title.tmdbId, title.mediaType)} className={setOpacityClass()} id={title.tmdbId}/>
                        <Icon icon="mdi:eye" className='text-3xl cursor-pointer absolute right-0 bottom-0' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => handleRemoveFromWatchlist(title.tmdbId)}/>
                    </div>
                )}
            </div>
        </main>
    )
}