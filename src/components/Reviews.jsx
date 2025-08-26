import { useState, useEffect } from 'react'
import { getReviews, deleteReview, editReview } from '../services/api'
import ReviewCard from './ReviewCard'
import SearchBar from './SearchBar'
import DeleteModal from './DeleteModal'
import Toast from './Toast'
import EditReviewModal from './EditReviewModal'

export default function Reviews({ userData, setActiveRoute }) {
  const [reviews, setReviews] = useState([])
  const [activeReview, setActiveReview] = useState('')
  const [toastActive, setToastActive] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    async function fetchReviews() {
      const data = await getReviews()
      console.log(data)
      if (data.length > 0) {
        setReviews(data)
      }
    }
    fetchReviews()
  }, [])

  const handleOpenDelModal = (mongoId) => {
    console.log(mongoId)
    if (mongoId) {
      setIsDeleting(true)
      setActiveReview(mongoId)
    }
    document.getElementById('my_modal_del').showModal()
  }

  const handleDeleteReview = async () => {
    if (activeReview) {
      try {
        const response = await deleteReview(activeReview)

        if (response) {
          setToastActive(true)
          setReviews(reviews.filter((r) => r.mongoId !== activeReview))
          await new Promise((resolve) => setTimeout(resolve, 3000))
          setToastActive(false)
          setIsDeleting(false)
          setActiveReview('')
          console.log('review deleted!')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleOpenEditModal = (mongoId) => {
    console.log(mongoId)
    if (mongoId) {
      setIsEditing(true)
      setActiveReview(mongoId)
    }
    document.getElementById('my_modal_edit').showModal()
  }

  const handleEditReview = async (mongoId) => {
    try {
      const response = editReview(mongoId)

      if (response) {
        setToastActive(true)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setToastActive(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="p-10 bg-black w-full h-screen bg-main-background bg-cover rounded-tl-lg border-r-[1px] border-gray-400 overflow-y-scroll relative">
      <SearchBar userData={userData} />
      <h1 className="text-3xl font-bold mb-2 text-white">
        {' '}
        <i class="fa-regular fa-star"></i> Your Reviews{' '}
      </h1>

      <div className="divider divider-neutral"></div>

      <div className="w-full flex flex-wrap gap-3">
        {reviews.map((review) => (
          <ReviewCard
            mongoId={review.mongoId}
            poster={review.poster}
            title={review.title}
            text={review.text}
            key={review.mongoId}
            handleOpenDelModal={handleOpenDelModal}
            handleOpenEditModal={handleOpenEditModal}
          />
        ))}
      </div>
      <DeleteModal
        handleDeleteReview={handleDeleteReview}
        toastActive={toastActive}
      />
      <EditReviewModal
        handleEditReview={handleEditReview}
        toastActive={toastActive}
        data={reviews.filter((r) => r.mongoId === activeReview)}
        setIsEditing={setIsEditing}
        reviews={reviews}
        setReviews={setReviews}
      />
      {toastActive && isDeleting && <Toast text={'Review deleted!'} />}
      {toastActive && isEditing && (
        <Toast text={'Your review has been updated!'} />
      )}
    </main>
  )
}
