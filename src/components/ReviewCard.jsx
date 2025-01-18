import { Icon } from "@iconify/react/dist/iconify.js"

export default function MediaCard({ poster, title, text, handleOpenDelModal }) {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                src={poster}
                alt={`poster for ${title}`} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="max-h-[200px] overflow-hidden">
                    <p>{text}</p>
                </div>
                <div className="font-bold cursor-pointer hover:text-gray-400 ease-in-out duration-100">
                    Show More
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">
                        <Icon icon="material-symbols:edit-outline" className='text-xl'/>Edit Review
                    </button>
                    <button className="btn" onClick={handleOpenDelModal}><Icon icon="material-symbols:delete-outline" className='text-xl'/></button>
                </div>
            </div>
        </div>
    )
}