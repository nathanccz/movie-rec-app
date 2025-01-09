import { useState } from "react"
import { getAutocompleteDetails, getTitleDetails } from "../services/watchmode-api";
import Modal from "./Modal";

export default function SearchBar({ data }) {
    const [results, setResults] = useState([])
    const [inputText, setInputText] = useState('')
    const [wasEmpty, setWasEmpty] = useState(true)
    const [modalContent, setModalContent] = useState({})

    const handleInputChange = async (e) => {
        const value = e.target.value
        setInputText(value)

        if (value === '' && !wasEmpty) {
            setWasEmpty(true)
            setResults([])
        } else if (value !== '' && wasEmpty) {
            setWasEmpty(false)
        }
        
        if (inputText.length > 2) {
            const data = await getAutocompleteDetails(inputText)
            setResults(data.results)
        }
    }

    const handleModalOpen = async (id) => {
        try {
            const data = await getTitleDetails(id)
            console.log(data)
            setModalContent(data)
        } catch (error) {
            console.log(error)
        }

        document.getElementById('my_modal_3').showModal()
    }

    return (
        <>
        <div className="absolute z-50 top-5 right-5">
            <div className="flex justify-end w-full mb-3">
                <label className="input input-bordered flex items-center gap-2 w-96">
                    <input type="text" className="grow" placeholder="Search title" onChange={handleInputChange}/>
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
            {!wasEmpty && results &&
            <div className="flex justify-end w-full border-gray-400 border">
                <div className="flex flex-col items-start gap-2 w-96 bg-black p-3 overflow-y-scroll max-h-[30rem]">
                    {results.map(r => 
                        <div className="card w-full card-side bg-base-100 shadow-xl px-4 cursor-pointer hover:bg-slate-600 ease-in-out duration-300" key={r.id} onClick={() => handleModalOpen(r.id)}>
                            <figure>
                            <img
                                src={r.image_url}
                                alt="Movie"
                                className="w-[70px] h-[100-px]" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{r.name}</h2>
                                <p>{r.year}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            }
        </div>
        <Modal data={modalContent} setModalContent={setModalContent}/>
        </>
    )
}