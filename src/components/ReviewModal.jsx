import FaveButton from "./FaveButton";
import Rating from "./Rating";
import SaveButton from "./SaveButton";
import { addReview } from "../services/api";
import { useState, useEffect } from "react";
import Toast from "./Toast";

export default function ReviewModal({ data }) {
    const [review, setReview] = useState('')
    const [loading, setLoading] = useState(false)
    const [toastActive, setToastActive] = useState(false)
    const [rating, setRating] = useState(0)

    useEffect(() => {
        console.log(data)
    }, [])

    const handleChange = (event) => {
        setReview(event.target.value)
    }

    const handleSave = async () => {
        const mediaId = data?.tmdbId
        if (mediaId) {
            setLoading(true)
            try {
                const response = await addReview(mediaId, review)
                console.log(response)
                if (response) {
                    setLoading(false)
                    setToastActive(true)
                    await new Promise(resolve => setTimeout(resolve, 3000))
                    setToastActive(false)
                    setReview('')
                    console.log('Review saved!')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box max-w-5xl border">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                
               <div className="flex gap-10">
                    <div>
                        <img src={data.poster} alt={`poster for ${data.title}`} />
                    </div>
                    <div className="w-full">
                        <h2 className="font-bold text-2xl mb-5">{data.title} {`(${data.release_date?.split('-')[0]})`}</h2>
                        <textarea className="textarea textarea-bordered w-full mb-5 h-[20rem]" placeholder="Add review..." onChange={handleChange} value={review}></textarea>
                    </div>
                </div>
                <div className="flex gap-5 items-center justify-end">
                    <Rating /> 
                    <FaveButton />
                    <SaveButton handleSave={handleSave} loading={loading}/>
                </div>
            </div>
            {toastActive && <Toast text={'Review saved!'}/>}
        </dialog>
    )
}