import DashboardMain from "../components/DashboardMain";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
    return (
        <div class="flex w-full max-w-[1700px] mx-auto all 0.3s ease" id="pageWrapper">
            <Sidebar />
            <DashboardMain />
        </div>
    )
}