import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DashboardMain from './components/DashboardMain.jsx'
import DeepSearch from './components/DeepSearch.jsx'
import Watchlist from './components/Watchlist.jsx'
import Faves from './components/Faves.jsx'
import Reviews from './components/Reviews.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardMain />,
      },
      {
        path: '/dashboard/browse',
        element: <DashboardMain />,
      },
      {
        path: '/dashboard/deepsearch',
        element: <DeepSearch />,
      },
      {
        path: '/dashboard/hiddengems',
        element: <DashboardMain />,
      },
      {
        path: '/dashboard/watchlist',
        element: <Watchlist />,
      },
      {
        path: '/dashboard/faves',
        element: <Faves />,
      },
      {
        path: '/dashboard/reviews',
        element: <Reviews />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
