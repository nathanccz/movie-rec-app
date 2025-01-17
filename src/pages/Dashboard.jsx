import DashboardMain from "../components/DashboardMain";
import Sidebar from "../components/Sidebar";
import Faves from "../components/Faves";
import Reviews from "../components/Reviews";
import { getDashboardData } from "../services/api";
import { useState, useEffect } from "react";

export default function Dashboard({ route }) {
    const [userData, setUserData] = useState({})
    const [activeRoute, setActiveRoute] = useState('index')

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
    
    return (
        <div class="flex w-full max-w-[1700px] mx-auto all 0.3s ease" id="pageWrapper">
            <Sidebar userData={userData} activeRoute={activeRoute}/>
            {route === 'index' && <DashboardMain userData={userData} setActiveRoute={setActiveRoute}/>}
            {route === 'faves' && <Faves userData={userData} setActiveRoute={setActiveRoute}/>}
            {route === 'reviews' && <Reviews userData={userData} setActiveRoute={setActiveRoute}/>}
        </div>
    )
}