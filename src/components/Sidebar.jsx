export default function Sidebar({ userData }) {
    const handleLogOut = (e) => {
        e.preventDefault()
        window.location.href = 'http://localhost:3000/api/logout'; // Redirect to backend Google OAuth route
      };

    return (
        <aside class="flex w-80 flex-col border-l-[1px] border-r-[1px] border-gray-400">
            <div class="flex mb-8 mt-4 mx-4 items-center">
                {/* <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content w-16 rounded-full">
                    <span class="text-xl">N</span>
                    </div>
                </div> */}
                <img src={userData.image} alt="google avatar" className="w-[50px] h-[50px]" />
                <div class="mt-2 ml-3">
                    <h3 class="font-bold">{userData.displayName}</h3>
                    <span>email@email.com</span>
                </div>
            </div>
            <ul className="menu bg-black rounded-box w-full font-bold">
                <li>
                    <h2 className="menu-title text-xl text-gray-500">Discover</h2>
                    <ul className="text-lg">
                        <li><a href="/dashboard">Watch Now</a></li>
                        <li><a>Browse</a></li>
                        <li><a>DeepSearch</a></li>
                        <li><a>Hidden Gems</a></li>
                    </ul>
                </li>
                <li>
                    <h2 className="menu-title text-xl text-gray-500">Collection</h2>
                    <ul className="text-lg">
                        <li><a>Watchlist</a></li>
                        <li><a href="/faves">Faves</a></li>
                        <li><a>Made for You</a></li>
                        <li><a>Directors</a></li>
                        <li><a>Genres</a></li>
                    </ul>
                </li>
                <li>
                    <h2 className="menu-title text-xl text-gray-500">Playlists</h2>
                    <ul className="text-lg">
                        <li><a>Recently Added</a></li>
                        <li><a>Recently Played</a></li>
                        <li><a>Top Movies</a></li>
                    </ul>
                </li>
            </ul>
           <button class="btn btn-outline mt-8 mx-7 w-4/5" onClick={handleLogOut}>
                    <i class="fa-solid fa-right-from-bracket"></i>Log Out
            </button>
           
        </aside>
    )
}