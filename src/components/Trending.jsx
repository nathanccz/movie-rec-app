import { useState, useEffect } from "react"
import TrendingList from "./TrendingList";
import { getTrendingMovies, getTrendingShows } from "../services/rapidapi";

export default function Trending() {
    const [movies, setMovies] = useState([])
    const [tvShows, setTvShows] = useState([])
    const [streamingService, setStreamingService] = useState('netflix')
    const [isActive, setIsActive] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     setIsLoading(true)
    //     async function fetchTrendingMovies() {
    //         try {
    //             const data = await getTrendingMovies(streamingService)
    //             console.log(data)
    //             setMovies(data.shows);
    //             setIsLoading(false)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchTrendingMovies()
    // }, [streamingService])

    // useEffect(() => {
    //     setIsLoading(true)
    //     async function fetchTrendingShows() {
    //         try {
    //             const data = await getTrendingShows(streamingService)
    //             console.log(data)
    //             setTvShows(data);
    //             setIsLoading(false)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchTrendingShows()
    // }, [streamingService])

    const handleServiceChange = (e) => {
        setStreamingService(e.target.value)
    }

    const handleMediaChange = (e) => {
        if (e.target.value === 'movies' && !isActive) {
            console.log('active')
            setIsActive(true)
        } else if (e.target.value === 'tv' && isActive) {
            console.log('not')
            setIsActive(false)
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
                            disabled={streamingService === 'netflix'} 
                            selected={streamingService === 'netflix'}
                            value={'netflix'}>
                            Netflix
                        </option>
                        <option 
                            disabled={streamingService === 'hbo'} 
                            selected={streamingService === 'hbo'}
                            value={'hbo'}>
                            HBO Max
                        </option>
                        <option 
                            disabled={streamingService === 'disney'} 
                            selected={streamingService === 'disney'}
                            value={'disney'}>
                            Disney+
                        </option>
                        <option 
                            disabled={streamingService === 'apple'} 
                            selected={streamingService === 'apple'}
                            value={'apple'}>
                            Apple TV
                        </option>
                    </select>
                    <select className="select select-bordered w-full lg:w-[10rem]" onChange={handleMediaChange}>
                        <option 
                            disabled={isActive} 
                            selected={isActive}
                            value={'movies'}>
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
                {isActive ? 
                <TrendingList data={movies} isLoading={isLoading} /> :
                <TrendingList data={tvShows} isLoading={isLoading}/>}
            </div>
        </>   
    )
}