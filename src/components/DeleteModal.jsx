import { useState } from 'react'

export default function DeleteModal({ handleDeleteReview }) {
  return (
    <dialog id="my_modal_del" className="modal">
      <div className="modal-box border">
        <h3 className="font-bold text-lg">Are you sure?</h3>
        <p className="py-4">This review will be permanently deleted.</p>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-error text-white mr-3"
              onClick={handleDeleteReview}
            >
              Delete Review
            </button>
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
