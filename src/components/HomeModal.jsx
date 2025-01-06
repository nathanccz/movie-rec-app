import { useState } from "react"

export default function HomeModal() {
    const [isLoading, setIsLoading] = useState(false)
    return (
        <>
            <dialog id="my_modal_3" className="modal">
            <div className="modal-box max-w-3xl">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <img className="my-5" src="" alt="" />
                <h3 className="font-bold text-lg">Hello!</h3>
                <div className="flex justify-start gap-3">
                    <div className="year"></div>
                    <div className="rating"></div>
                    <div className="genre"></div>
                </div>
                <p className="py-4">Press ESC key or click on ✕ button to close</p>
                <button className="btn btn-info">Get Started</button>
            </div>
            </dialog>
        </>
    )
}