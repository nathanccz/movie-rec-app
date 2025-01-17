export default function MediaCard({ poster, title, text }) {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                src={poster}
                alt={`poster for ${title}`} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{text}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Edit Review</button>
                </div>
            </div>
        </div>
    )
}