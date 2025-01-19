import DashboardMain from "../components/DashboardMain";
import Sidebar from "../components/Sidebar";
import Faves from "../components/Faves";
import Reviews from "../components/Reviews";
import { getDashboardData } from "../services/api";
import { useState, useEffect } from "react";

export default function Dashboard({ route }) {
    const [userData, setUserData] = useState({})
    const [activeRoute, setActiveRoute] = useState('index')
    const [isMobile, setIsMobile] = useState(false);

     useEffect(() => {
            if (Object.keys(userData).length > 0) {
                return
            }
            async function fetchDashboardData() {
                try {
                    const data = await getDashboardData()
                    console.log(data)
                    
                    if (data.message === 'Not authenticated') {
                        window.location.href = 'http://localhost:5173/login'
                    } else {
                        setUserData(data)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchDashboardData()
        }, [])

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 1024);
        }
    
        window.addEventListener('resize', handleResize);
        handleResize()
    
        return () => window.removeEventListener('resize', handleResize);
      }, [])

    const handleLogOut = (e) => {
        e.preventDefault()
        window.location.href = 'http://localhost:3000/api/logout' // Redirect to backend Google OAuth route
      }
    
    return (
        <div className={"flex w-full max-w-[1700px] mx-auto all 0.3s ease" + ` ${isMobile && "flex-col"}`} id="pageWrapper">
            <Sidebar userData={userData} activeRoute={activeRoute} isMobile={isMobile} handleLogOut={handleLogOut}/>
            {route === 'index' && <DashboardMain userData={userData} setActiveRoute={setActiveRoute} isMobile={isMobile}/>}
            {route === 'faves' && <Faves userData={userData} setActiveRoute={setActiveRoute}/>}
            {route === 'reviews' && <Reviews userData={userData} setActiveRoute={setActiveRoute}/>}
        </div>
    )
}