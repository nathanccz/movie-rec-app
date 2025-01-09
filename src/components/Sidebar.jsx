export default function Sidebar() {
    return (
        <aside class="flex w-80 flex-col border-l-[1px] border-r-[1px] border-gray-400">
            <div class="flex mb-8 mt-4 mx-4">
                <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content w-16 rounded-full">
                    <span class="text-xl">N</span>
                    </div>
                </div>
                <div class="mt-2 ml-3">
                    <h3 class="font-bold">Username</h3>
                    <span>email@email.com</span>
                </div>
            </div>
            <ul className="menu bg-black rounded-box w-full font-bold">
                <li>
                    <h2 className="menu-title text-xl">Discover</h2>
                    <ul>
                        <li><a>Watch Now</a></li>
                        <li><a>Browse</a></li>
                        <li><a>Claude AI</a></li>
                    </ul>
                </li>
                <li>
                    <h2 className="menu-title text-xl">Collection</h2>
                    <ul>
                        <li><a>Watchlist</a></li>
                        <li><a>Faves</a></li>
                        <li><a>Made for You</a></li>
                        <li><a>Directors</a></li>
                        <li><a>Genres</a></li>
                    </ul>
                </li>
                <li>
                    <h2 className="menu-title text-xl">Playlists</h2>
                    <ul>
                        <li><a>Recently Added</a></li>
                        <li><a>Recently Played</a></li>
                        <li><a>Top Movies</a></li>
                    </ul>
                </li>
            </ul>
            <a href="/logout"
                ><button class="btn btn-outline mt-8 mx-7 w-4/5">
                    <i class="fa-solid fa-right-from-bracket"></i>Log Out
                </button>
            </a>
        </aside>
    )
}