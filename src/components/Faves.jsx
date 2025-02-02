import { useState, useEffect } from "react"
import { getFaves } from "../services/api";
import SearchBar from "./SearchBar";


export default function Faves({ userData, setActiveRoute }) {
    const [faves, setFaves] = useState([])
    const [loading, setLoading] = useState(false)
   
    useEffect(() => {
        setActiveRoute('faves')
        async function fetchFaves() {
            const data = await getFaves()
            console.log(data)
            if (data.length > 0) {
                setFaves(data)
            } 
        }
        fetchFaves()
    }, [])

    return (
        <main class="p-10 bg-black w-full h-screen bg-main-background bg-cover rounded-tl-lg border-r-[1px] border-gray-400 overflow-y-scroll relative">
            <SearchBar userData={userData} />
            <h1 className="text-3xl font-bold mb-2 text-white"> <i class="fa-regular fa-star"></i> Your Faves </h1> 

            <div className="divider divider-neutral"></div>
            
            <div className="w-full flex flex-wrap gap-3">
                {faves.map(fave =>
                    <div key={fave.tmdbId}>
                        <img src={fave.poster} alt={`poster for ${fave.title}`} className="lg:w-[200px] lg:h-[300px] cursor-pointer hover:scale-110 ease-in-out duration-500 w-full h-full"/>
                    </div>
                )}
            </div>
        </main>
    )
}