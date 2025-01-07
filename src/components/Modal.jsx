import { useState, useEffect } from "react";
import { getUserRegion } from "../services/ipify-api";

export default function Modal({ data, setModalContent }) {
    const [region, setRegion] = useState('')

    useEffect(() => {
        async function getRegion() {
            try {
                const userRegion = await getUserRegion()
                setRegion(userRegion)
            } catch (error) {
                console.log(error)
            }
        }

        getRegion()
    }, [])
    
    const handleModalClose = () => {
        setModalContent({})
    }

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box lg:max-w-4xl border">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>✕</button>
                </form>
                <h3 className="font-bold text-2xl">{data.title}</h3>
                <div className="flex">
                    <img src={data.poster} alt={`poster for ${data.title}`} />
                    <video src="https://www.youtube.com/watch?v=XLA_uqAfbew"></video>
                </div>
                <p className="py-4">{data.plot_overview}</p>
                <p className="py-4">{region}</p>
            </div>
        </dialog>
    )
}