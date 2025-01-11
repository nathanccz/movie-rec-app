import { Icon } from "@iconify/react/dist/iconify.js"

export default function ReviewButton({ handleReviewModalOpen }) {
    return (
        <button className="btn" onClick={handleReviewModalOpen}>
           <Icon icon="jam:write-f" className='text-xl'/> Review
        </button>
    )
}