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
            <h1 className="text-3xl font-bold mb-5 text-white"> <i class="fa-regular fa-star"></i> DeepSearch </h1>
            <span className="text-white">Find movies and TV shows based on your taste — or discover something new.</span> 

            <div className="divider divider-neutral"></div>
            <div className="flex items-center justify-center h-full flex-col gap-5">
                <h2 className="font-bold text-2xl">Welcome to DeepSearch.</h2>
                <p className="text-sm">What kind of movie or TV show are you looking for?</p>
                <div className="w-3/5">
                    <div>
                        <textarea className="textarea textarea-secondary w-full resize-none" placeholder="Ask me anything..."></textarea>
                    </div>
                    <div className="flex justify-end">
                        <Icon icon="mdi:send-circle" className='text-3xl cursor-pointer'/>
                    </div>
                </div>
            </div>
        </main>
    )
}