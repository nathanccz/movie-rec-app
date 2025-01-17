import DashboardMain from "../components/DashboardMain";
import Sidebar from "../components/Sidebar";
import Faves from "../components/Faves";
import { getDashboardData } from "../services/api";
import { useState, useEffect } from "react";

export default function Dashboard({ route }) {
    const [userData, setUserData] = useState({})

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
            <Sidebar userData={userData}/>
            {route === 'index' && <DashboardMain userData={userData}/>}
            {route === 'faves' && <Faves userData={userData}/>}
        </div>
    )
}