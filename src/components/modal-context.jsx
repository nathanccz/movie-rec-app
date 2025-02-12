import { createContext, useContext, useState } from "react";
import { getFullMediaDetails } from "../services/tmdb-api";
import { addMovie, getMovie } from "../services/api";
import ReviewModal from "./ReviewModal";
import Modal from "./Modal";

export const ModalContext = createContext(null)

export default function ModalContextProvider({ children, activeRoute }) {
    const [modalContent, setModalContent] = useState({})

     const handleModalOpen = async (tmdbId, mediaType) => { //NOTE: Add cache expiration to prevent stale data.
            // const region = userData?.country
            const region = 'US'
    
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
     
            document.getElementById(activeRoute).showModal()
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

    const handleReviewModalOpen = () => {
        document.getElementById('my_modal_4').showModal()
    }

    return (
        <ModalContext.Provider
            value={{
                modalContent,
                setModalContent,
                handleModalOpen
            }}
        >
            {children}
            <Modal data={modalContent} setModalContent={setModalContent} handleModalOpen={handleModalOpen} activeRoute={activeRoute} handleReviewModalOpen={handleReviewModalOpen}/>
            <ReviewModal data={modalContent} setModalContent={setModalContent}/>
        </ModalContext.Provider>
    )
}

export function useModalContext() {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error (
            'useModalContext must be used within a ModalContextProvider'
        )
    }
    return context
}