import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "../ui/button"
import Sidebar from "../shared/sidebar"
import StatsCards from "./stats-cards"
// import { RecentApplications } from "./RecentApplications"
// import { UpcomingInterviews } from "./upcoming-interviews"
// import { ApplicationTimeline } from "./ApplicationTimeline"
import AddApplicationModal from "./applicationFormModal"

const Dashboard = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const openAddModal = () => setIsAddModalOpen(true)
    const closeAddModal = () => setIsAddModalOpen(false)
    return (
        <div className="flex min-h-screen w-full flex-col">

            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                                <p className="text-gray-600">Track and manage your job applications in one place.</p>
                            </div>
                            <Button className="w-full md:w-auto" onClick={openAddModal}>
                                <PlusCircle className="mr-2" size={16} />
                                Add New Application
                            </Button>
                        </div>
                        <StatsCards />
                        {/* <RecentApplications applications={recentApplications} />
                        <div className="grid gap-6 md:grid-cols-2">
                            <UpcomingInterviews interviews={upcomingInterviews} />
                            <ApplicationTimeline />
                        </div> */}
                    </div>
                </main>
            </div>
            <AddApplicationModal isOpen={isAddModalOpen} onClose={closeAddModal} />
        </div>
    )
}
export default Dashboard