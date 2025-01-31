import { useState } from "react"
import { fetchMovieAutocomplete, fetchTvAutocomplete, getFullMediaDetails } from "../services/tmdb-api";
import Modal from "./Modal";
import { Icon } from "@iconify/react/dist/iconify.js"
import ReviewModal from "./ReviewModal";
import { addMovie, getMovie } from "../services/api";

export default function SearchBar({ data, userData }) {
    
    const [movieResults, setMovieResults] = useState([])
    const [tvResults, setTvResults] = useState([])
    const [inputText, setInputText] = useState('')
    const [wasEmpty, setWasEmpty] = useState(true)
    const [modalContent, setModalContent] = useState({})

    const handleInputChange = async (e) => {
        const value = e.target.value
        setInputText(value)

        if (value === '' && !wasEmpty) {
            setWasEmpty(true)
            setMovieResults([])
        } else if (value !== '' && wasEmpty) {
            setWasEmpty(false)
        }
        
        if (inputText.length > 2) {
            const movieData = await fetchMovieAutocomplete(inputText)
            console.log(movieData)
            setMovieResults(movieData)
        }
    }

    const handleModalOpen = async (tmdbId, mediaType) => { //NOTE: Add cache expiration to prevent stale data.
        const region = userData?.country

        let dataFromLS = localStorage.getItem(tmdbId),
            dataFromDB
        
        if (dataFromLS !== null) {
            setModalContent(JSON.parse(dataFromLS))
        } else {
            try {
                const data = await getMovie(tmdbId)
                console.log(data)
                dataFromDB = data[0] || null
                if (dataFromDB) {
                    setModalContent(dataFromDB)
                } else {
                    dataFromDB = null
                }
            } catch (error) {
                console.log(error)
            }
        } 
        
        if (!dataFromLS && !dataFromDB && region) {
            
            try {
                const data = await getFullMediaDetails(tmdbId, mediaType, region)

                setModalContent(data)
                handleAddMovie(data)
            } catch (error) {
                console.log(error)
            }
        }
 
        document.getElementById('my_modal_3').showModal()
    }

    const handleClearInput = () => {
        setInputText('')
        setWasEmpty(true)
        setMovieResults([])
    }

    const handleReviewModalOpen = () => {
        document.getElementById('my_modal_4').showModal()
    }

    const handleAddMovie = async (data) => {
        try {
            localStorage.setItem(data.tmdbId, JSON.stringify(data))
            const response = await addMovie(data)

            if (response.ok) {
                console.log('movie added!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <div className="absolute z-50 top-5 right-5">
            <div className="flex justify-end w-full mb-3">
                <label className="input input-bordered flex items-center gap-2 w-96">
                   {!wasEmpty && <Icon icon="mdi:clear-circle" className='text-md cursor-pointer opacity-50 hover:opacity-100 ease-in-out duration-300' onClick={handleClearInput}/>}
                    <input type="text" className="grow" placeholder="Search title" onChange={handleInputChange} value={inputText}/>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                    </svg>
                </label>
            </div>
            {!wasEmpty && movieResults &&
            <div className="flex justify-end w-full border-gray-400 border">
                <div className="flex flex-col items-start gap-2 w-96 bg-black px-3 overflow-y-scroll max-h-[30rem] relative">
                    <div role="tablist" className="tabs tabs-bordered top-0 z-50 sticky bg-black w-full py-3">
                        <a role="tab" className="tab tab-active">Movies</a>
                        <a role="tab" className="tab">TV Shows</a>
                    </div>
                    {movieResults.map(r => 
                        <div className="card w-full card-side bg-base-100 shadow-xl px-4 cursor-pointer hover:bg-slate-600 ease-in-out duration-300" key={r.id} onClick={() => handleModalOpen(r.id, 'movie')}>
                            <figure>
                            <img
                                src={r.poster}
                                alt="Movie"
                                className="w-[70px] h-[100-px]" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{r.title}</h2>
                                <p>{r.release_date?.split('-')[0]}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            }
        </div>
        <Modal data={modalContent} setModalContent={setModalContent} handleReviewModalOpen={handleReviewModalOpen}/>
        <ReviewModal data={modalContent} setModalContent={setModalContent}/>
        </>
    )
}