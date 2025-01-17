import { useState, useEffect } from "react"
import { getReviews } from "../services/api";
import ReviewCard from "./ReviewCard";
import SearchBar from "./SearchBar";

export default function Reviews({ userData, setActiveRoute }) {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
   
    useEffect(() => {
        setActiveRoute('reviews')
        async function fetchReviews() {
            const data = await getReviews()
            console.log(data)
            if (data.length > 0) {
                setReviews(data)
            } 
        }
        fetchReviews()
    }, [])

    return (
        <main class="p-10 bg-black w-full h-screen bg-main-background bg-cover rounded-tl-lg border-r-[1px] border-gray-400 overflow-y-scroll relative">
            <SearchBar userData={userData} />
            <h1 className="text-3xl font-bold mb-2 text-white"> <i class="fa-regular fa-star"></i> Your Reviews </h1> 

            <div className="divider divider-neutral"></div>
            
            <div className="w-full flex flex-wrap gap-3">
                {reviews.map(review =>
                    <ReviewCard mediaId={review.tmdbId} poster={review.poster} title={review.title} text={review.text} key={review.tmdbId}/>
                )}
            </div>
        </main>
    )
}