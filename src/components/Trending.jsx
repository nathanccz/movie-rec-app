import { useState, useEffect } from "react"
import TrendingList from "./TrendingList";
import { getTrendingNow } from "../services/tmdb-api";

export default function Trending() {
    const [titles, setTitles] = useState([])
    const [mediaType, setMediaType] = useState('movie')
    const [streamingService, setStreamingService] = useState('Netflix')
    const [isActive, setIsActive] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        async function fetchTrendingShows() {
            try {
                const data = await getTrendingNow(streamingService, mediaType, 'US')
                console.log(data)
                setTitles(data);
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTrendingShows()
    }, [streamingService, mediaType])

    const handleServiceChange = (e) => {
        setStreamingService(e.target.value)
    }

    const handleMediaChange = (e) => {
        if (e.target.value === 'movie' && !isActive) {
            setIsActive(true)
            setMediaType('movie')
        } else if (e.target.value === 'tv' && isActive) {
            setIsActive(false)
            setMediaType('tv')
        } else {
            return
        }
    }

    return (
        <>
            <div className="w-full my-10" 
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200">
                <h2 className="my-5 text-2xl font-bold px-3">Trending Now</h2>
                <div className="mb-10 flex flex-col gap-4 justify-center items-center w-full px-6 lg:flex-row lg:justify-start">
                    <select className="select select-bordered w-full lg:w-[10rem]" onChange={handleServiceChange}>
                        <option 
                            disabled={streamingService === 'Netflix'} 
                            selected={streamingService === 'Netflix'}
                            value={'Netflix'}>
                            Netflix
                        </option>
                        <option 
                            disabled={streamingService === 'Max'} 
                            selected={streamingService === 'Max'}
                            value={'Max'}>
                            Max
                        </option>
                        <option 
                            disabled={streamingService === 'Amazon Prime'} 
                            selected={streamingService === 'Amazon Prime'}
                            value={'Amazon Prime'}>
                            Amazon Prime
                        </option>
                        <option 
                            disabled={streamingService === 'Apple TV'} 
                            selected={streamingService === 'Apple TV'}
                            value={'Apple TV'}>
                            Apple TV
                        </option>
                    </select>
                    <select className="select select-bordered w-full lg:w-[10rem]" onChange={handleMediaChange}>
                        <option 
                            disabled={isActive} 
                            selected={isActive}
                            value={'movie'}>
                            Movies
                        </option>
                        <option 
                            disabled={!isActive} 
                            selected={!isActive}
                            value={'tv'}>
                            TV Shows
                        </option>
                    </select>
                </div>
                <TrendingList data={titles} isLoading={isLoading} /> 
            </div>
        </>   
    )
}