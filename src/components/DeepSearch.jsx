import { useState, useEffect } from "react"
import SearchBar from "./SearchBar";
import { useModalContext } from "./modal-context";
import { Icon } from "@iconify/react/dist/iconify.js"

export default function DeepSearch({ userData, setActiveRoute, activeRoute }) {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const {handleModalOpen} = useModalContext()
    const [query, setQuery] = useState('')

    useEffect(() => {
        setActiveRoute('deepsearch')
        
    }, [])

    return (
        <main class="p-10 bg-black w-full h-screen bg-main-background bg-cover rounded-tl-lg border-r-[1px] border-gray-400 overflow-y-scroll relative">
            <SearchBar userData={userData} />
           
            <div className="flex items-center justify-center h-full flex-col gap-5">
                <h2 className="font-bold text-xl">Welcome to Deep Search, powered by DeepSeek AI.</h2>
                <p className="text-sm">What kind of movie or TV show are you looking for?</p>
                <div className="w-3/5 p-2 border rounded bg-gray-800">
                    <div className="mb-1">
                        <textarea className="textarea textarea-secondary w-full resize-none border-none focus:outline-none overflow-visible bg-transparent" placeholder="Ask me anything..."></textarea>
                    </div>
                    <div className="flex justify-between">
                        <div className="h-[2rem] over">
                            <button className="btn btn-outline text-xs mr-3 px-3 h-[2.1rem] rounded">Any</button>
                            <button className="btn btn-outline text-xs mr-3 px-3 h-[2.1rem] rounded">Film</button>
                            <button className="btn btn-outline text-xs px-3 h-[2.1rem] rounded">TV</button>
                        </div>
                        <Icon icon="mdi:send-circle" className='text-3xl cursor-pointer'/>
                    </div>
                </div>
            </div>
        </main>
    )
}