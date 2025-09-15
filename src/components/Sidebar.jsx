import { NavLink } from 'react-router-dom'

export default function Sidebar({ userData, isMobile, handleLogOut }) {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'bg-gray-700 block' : 'block'
  return (
    <>
      {isMobile ? (
        <div className="navbar bg-base-100 sticky top-0 z-50">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border"
              >
                <li>
                  <a>Homepage</a>
                </li>
                <li>
                  <a>Portfolio</a>
                </li>
                <li>
                  <a>About</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a className="text-xl p-0 cursor-pointer">
              <img src="/logo.svg" alt="" className="w-[120px] h-[40px]" />
            </a>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <aside class="flex w-80 flex-col border-l-[1px] border-r-[1px] border-gray-400">
          <div class="flex mb-8 mt-4 mx-4 items-center">
            {/* <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content w-16 rounded-full">
                    <span class="text-xl">N</span>
                    </div>
                </div> */}
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocIN_uR-GpkIp3aQ_50-V1M6V2hfmKJ94qivbRuRgWuCJvd-Qg=s96-c"
              alt="google avatar"
              className="w-[50px] h-[50px]"
            />
            <div class="mt-2 ml-3">
              <h3 class="font-bold">{userData.displayName}</h3>
              <span>n.casarez@icloud.com</span>
            </div>
          </div>
          <ul className="menu bg-black rounded-box w-full font-bold">
            <li>
              <h2 className="menu-title text-xl text-gray-500">Discover</h2>
              <ul className="text-lg">
                <li>
                  <NavLink to={'/dashboard'} className={getNavLinkClass} end>
                    Trending
                  </NavLink>
                </li>
                {/* <li>
                  <a>Browse</a>
                </li> */}
                <li>
                  <NavLink
                    to={'/dashboard/deepsearch'}
                    className={getNavLinkClass}
                  >
                    SmartSearch
                  </NavLink>
                </li>
                <li>
                  <a>Hidden Gems</a>
                </li>
              </ul>
            </li>
            <li>
              <h2 className="menu-title text-xl text-gray-500">Collection</h2>
              <ul className="text-lg">
                <li>
                  <NavLink
                    to={'/dashboard/watchlist'}
                    className={getNavLinkClass}
                  >
                    Watchlist
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/dashboard/faves'} className={getNavLinkClass}>
                    My Faves
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/dashboard/reviews'}
                    className={getNavLinkClass}
                  >
                    My Reviews
                  </NavLink>
                </li>
                <li>
                  <a>Directors</a>
                </li>
                <li>
                  <a>Genres</a>
                </li>
              </ul>
            </li>
            <li>
              <h2 className="menu-title text-xl text-gray-500">Chat History</h2>
              <ul className="text-lg">
                <li>
                  <a>Recently Added</a>
                </li>
                <li>
                  <a>Recently Played</a>
                </li>
                <li>
                  <a>Top Movies</a>
                </li>
              </ul>
            </li>
          </ul>
          <button
            class="btn btn-outline mt-8 mx-7 w-4/5"
            onClick={handleLogOut}
          >
            <i class="fa-solid fa-right-from-bracket"></i>Log Out
          </button>
        </aside>
      )}
    </>
  )
}
