import FaveButton from "./FaveButton";
import Rating from "./Rating";
import SaveButton from "./SaveButton";

export default function ReviewModal({ data }) {
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
                        <textarea className="textarea textarea-bordered w-full mb-5 h-[20rem]" placeholder="Add review..."></textarea>
                    </div>
                </div>
                <div className="flex gap-5 items-center justify-end">
                    <Rating /> 
                    <FaveButton />
                    <SaveButton />
                </div>
            </div>
        </dialog>
    )
}