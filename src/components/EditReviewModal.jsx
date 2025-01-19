import { useState, useEffect } from "react"
import Rating from "./Rating";
import SaveButton from "./SaveButton";
import FaveButton from "./FaveButton";
import { editReview } from "../services/api";
import Toast from "./Toast";

export default function EditReviewModal({ data, setIsEditing, reviews, setReviews }) {
    const [review, setReview] = useState('')
    const [loading, setLoading] = useState(false)
    const [toastActive, setToastActive] = useState(false)

    useEffect(() => {
        if (data) {
            console.log(data)
            setReview(data[0]?.text)
        }
    }, [data])

    const handleChange = (event) => {
        setReview(event.target.value)
    }

    const handleSave = async () => {
        const mongoId = data[0]?.mongoId
        if (mongoId) {
            setLoading(true)
            try {
                const response = await editReview(mongoId, review)
             
                if (response) {
                    setLoading(false)
                    setToastActive(true)
                    setReviews(reviews.map(r => {
                        if (r.mongoId === mongoId) {
                            return {
                                ...r,
                                text: review
                            }
                        } else {
                            return r
                        }
                    }))
                    await new Promise(resolve => setTimeout(resolve, 3000))
                    setToastActive(false)
                    setIsEditing(false)
                    setReview('')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <dialog id="my_modal_edit" className="modal">
            <div className="modal-box max-w-5xl border">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                
               <div className="flex gap-10">
                    <div>
                        <img src={data[0]?.poster} alt={`poster for ${data[0]?.title}`} />
                    </div>
                    <div className="w-full">
                        <h2 className="font-bold text-2xl mb-5">{data[0]?.title} {`(${data[0]?.release_date?.split('-')[0]})`}</h2>
                        <textarea className="textarea textarea-bordered w-full mb-5 h-[20rem]" placeholder="" onChange={handleChange} value={review}></textarea>
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