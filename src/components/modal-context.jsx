import { createContext, useContext, useState } from "react";
import { getFullMediaDetails } from "../services/tmdb-api";

export const ModalContext = createContext(null)

export default function ModalContextProvider({ children }) {
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
     
            document.getElementById('my_modal_3').showModal()
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