export default function MediaCard({ data, loading }) {
    return (
        <>
            {!loading && data ? data.map(m =>
            <div className="card bg-base-100 min-w-[150px] shadow-xl lg:min-w-[200px]" key={m.tmdbId}>
                <figure>
                    <img
                    src={m.poster}
                    alt={m.title || m.name} 
                    className="cursor-pointer hover:scale-110 ease-in-out duration-500 w-full h-full"/>
                </figure>
                <div className="card-body px-0 py-5">
                    <a href="">
                        <h2 className="card-title hover:text-gray-500 ease-in-out duration-300 text-md">
                            {m.title || m.name}
                        </h2>
                    </a>
                    <div className="badge badge-secondary">{m.release_date?.split('-')[0] || m.first_air_date?.split('-')[0]}</div>
                    {/* <p className="text-sm">Dir. {m.director.name}</p> */}
                    <div className="card-actions justify-end mt-5">
                    {m.genres.map(g =>
                        <div className="badge badge-outline" key={g.id}>{g}</div>
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