export default function MediaCard({ data, loading }) {
    return (
        <>
            {!loading ? data.map(m =>
            <div className="card bg-base-100 w-96 shadow-xl lg:min-w-[250px]" key={m.id}>
                <figure>
                    <img
                    src={m.imageSet.verticalPoster.w360}
                    alt={m.title} 
                    className="cursor-pointer hover:scale-110 ease-in-out duration-500"/>
                </figure>
                <div className="card-body">
                    <a href="">
                        <h2 className="card-title hover:text-gray-500 ease-in-out duration-300 text-md">
                            {m.title}
                        </h2>
                    </a>
                    <div className="badge badge-secondary">{m.releaseYear}</div>
                    <p className="text-sm">Dir. {m.directors.join(', ')}</p>
                    <div className="card-actions justify-end">
                    {m.genres.map(g =>
                        <div className="badge badge-outline" key={g.id}>{g.name}</div>
                    )}
                    </div>
                </div>
            </div>
            ) : 
            <>
                <div className="card bg-base-100 w-80 shadow-xl lg:min-w-[250px]">
                    <div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-64 w-full"></div>
                        <div className="skeleton h-10 w-28"></div>
                        <div className="skeleton h-10 w-full"></div>
                        <div className="skeleton h-410w-full"></div>
                    </div>
                </div>
                <div className="card bg-base-100 w-80 shadow-xl lg:min-w-[250px]">
                    <div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-64 w-full"></div>
                        <div className="skeleton h-10 w-28"></div>
                        <div className="skeleton h-10 w-full"></div>
                        <div className="skeleton h-410w-full"></div>
                    </div>
                </div>
                <div className="card bg-base-100 w-80 shadow-xl lg:min-w-[250px]">
                    <div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-64 w-full"></div>
                        <div className="skeleton h-10 w-28"></div>
                        <div className="skeleton h-10 w-full"></div>
                        <div className="skeleton h-410w-full"></div>
                    </div>
                </div>
                <div className="card bg-base-100 w-80 shadow-xl lg:min-w-[250px]">
                    <div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-64 w-full"></div>
                        <div className="skeleton h-10 w-28"></div>
                        <div className="skeleton h-10 w-full"></div>
                        <div className="skeleton h-410w-full"></div>
                    </div>
                </div>
                <div className="card bg-base-100 w-80 shadow-xl lg:min-w-[250px]">
                    <div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-64 w-full"></div>
                        <div className="skeleton h-10 w-28"></div>
                        <div className="skeleton h-10 w-full"></div>
                        <div className="skeleton h-410w-full"></div>
                    </div>
                </div>
            </>
            }
          
        </>
    )
}