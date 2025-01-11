import { useState, useEffect } from "react"
import { getTrendingMovies, getTrendingShows } from "../services/rapidapi";
import MediaCard from "./MediaCard";
import SearchBar from "./SearchBar";


export default function DashboardMain({ userData }) {
     const [movies, setMovies] = useState([])
     const [loading, setLoading] = useState(false)

    //   useEffect(() => {
    //         setLoading(true)
    //          async function fetchTrendingMovies() {
    //              try {
    //                  const data = await getTrendingMovies('netflix')
    //                  console.log(data)
    //                  setMovies(data.shows);
    //                  setLoading(false)
    //              } catch (error) {
    //                  console.log(error)
    //              }
    //          }
    //          fetchTrendingMovies()
    //      }, [])

    return (
        <main class="p-10 bg-black w-full h-screen bg-main-background bg-cover rounded-tl-lg border-r-[1px] border-gray-400 overflow-y-scroll relative">
            <SearchBar />
            <h1 class="text-3xl font-bold mb-2 text-white"> <i class="fa-regular fa-star"></i> Watch Now </h1>
            <span class="text-white">Top movies for you. Updated daily.</span>

            <div className="divider divider-neutral"></div>

            <div className="flex lg:flex-row overflow-x-scroll mb-8 gap-5 w-full"> 
                <MediaCard data={movies} loading={loading}/>
            </div>
            
            <h2 class="text-3xl font-bold mb-2 text-white"> <i class="fa-regular fa-star"></i> Hidden Gems </h2>
            <span class="text-white">Lesser-known titles you may enjoy.</span>
            
            <div className="divider divider-neutral"></div>
            
        </main>
    )
}