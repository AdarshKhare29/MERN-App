import { useEffect, useMemo, useState } from "react"
import { PlusCircle, Search, Edit, Trash2, ExternalLink, Eye } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Sidebar from "../shared/sidebar"
import AddApplicationModal from "../dashboard/applicationFormModal"
import { useSelector, useDispatch } from "react-redux"
import { getAllApplications } from "../../reducers/newApplication"
import type { Application } from "../../reducers/newApplication";
import { isValid, parseISO, differenceInCalendarDays } from "date-fns";
import { EditApplicationModal } from "./editApplicationModal"
import ApplicationDetails from "./ApplicationDetails"

const ApplicationsPage = () => {
    const dispatch = useDispatch();
    const { applications = [], error } = useSelector((state: any) => state.application || {});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingApplication, setEditingApplication] = useState<Application | null>(null)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

    useEffect(() => {
        dispatch(getAllApplications() as any);
    }, [dispatch]);
    console.log(applications)

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortBy, setSortBy] = useState("date")

    const statusColors = {
        applied: "bg-yellow-500 hover:bg-yellow-600",
        interview: "bg-blue-500 hover:bg-blue-600",
        offer: "bg-green-500 hover:bg-green-600",
        rejected: "bg-red-500 hover:bg-red-600",
    }

    const statusLabels = {
        applied: "Applied",
        interview: "Interview",
        offer: "Offer",
        rejected: "Rejected",
    }

    const stats = useMemo(() => {
        const total = applications.length;
        const interviews = applications.filter((app: Application) => app.status === "interview").length;
        const offers = applications.filter((app: Application) => app.status === "offer").length;
        const applied = applications.filter((app: Application) => app.status === "applied").length;
        const successRate = total > 0 ? ((offers / total) * 100).toFixed(1) : "0";

        return {
            total,
            applied,
            interviews,
            offers,
            successRate,
        };
    }, [applications]);

    const filteredApplications = useMemo(() => {
        return applications
            .filter((app: Application) => {
                const matchesSearch =
                    app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    app.company?.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesStatus = statusFilter === "all" || app.status === statusFilter;

                return matchesSearch && matchesStatus;
            })
            .sort((a: any, b: any) => {
                if (sortBy === "date") {
                    return new Date(b.applicationDate || 0).getTime() - new Date(a.applicationDate || 0).getTime();
                }
                if (sortBy === "company") {
                    return (a.company || "").localeCompare(b.company || "");
                }
                if (sortBy === "jobTitle") {
                    return (a.jobTitle || "").localeCompare(b.jobTitle || "");
                }
                return 0;
            });
    }, [applications, searchTerm, statusFilter, sortBy]);

    const handleEditApplication = (application: Application) => {
        console.log(application)
        setEditingApplication(application)
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false)
        setEditingApplication(null)
    }

    const handleUpdateApplication = (id: string, updates: Partial<Application>) => {
        // updateApplication(id, updates)
    }

    const handleViewDetails = (application: Application) => {
        setSelectedApplication(application)
        setIsDetailsModalOpen(true)
    }

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false)
        setSelectedApplication(null)
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
                                <p className="text-gray-600">Manage all your job applications in one place.</p>
                            </div>
                            <Button className="w-full md:w-auto" onClick={() => setIsAddModalOpen(true)}>
                                <PlusCircle className="mr-2" size={16} />
                                Add New Application
                            </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.total}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Applied</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-yellow-600">{stats.applied}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-600">{stats.interviews}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Offers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">{stats.offers}</div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Filter Applications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                                        <Input
                                            placeholder="Search by job jobTitle or company..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="applied">Applied</option>
                                        <option value="interview">Interview</option>
                                        <option value="offer">Offer</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="date">Sort by Date</option>
                                        <option value="company">Sort by Company</option>
                                        <option value="jobTitle">Sort by Title</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Applications List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Applications ({filteredApplications.length})</CardTitle>
                                <CardDescription>
                                    {filteredApplications.length} of {applications.length} applications
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {filteredApplications.map((application: Application) => (
                                        <div
                                            key={application.company}
                                            className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 ${application.status === 'interview' ? 'border-blue-300 bg-blue-50/30' : ''
                                                }`}
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold">{application.jobTitle}</h3>
                                                    <Badge className={statusColors[application.status]}>
                                                        {statusLabels[application.status]}
                                                    </Badge>
                                                    {application.status === 'interview' && (
                                                        <span className="text-xs text-blue-600 font-medium">
                                                            📝 Click to add interview questions
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 mb-1">{application.company}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    {application.location && <span>📍 {application.location}</span>}
                                                    {application.salary && <span>💰 {application.salary}</span>}
                                                    <span>📅 Applied  {(() => {
                                                        const parsedDate = application.applicationDate ? parseISO(application.applicationDate) : null;

                                                        if (!parsedDate || !isValid(parsedDate)) return "Unknown date";

                                                        const now = new Date();
                                                        const diffInDays = differenceInCalendarDays(now, parsedDate);

                                                        if (diffInDays === 0) return "Today";
                                                        if (diffInDays === 1) return "Yesterday";
                                                        return `${diffInDays} days ago`;
                                                    })()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleViewDetails(application)}
                                                    title="View details"
                                                    className={application.status === 'interview' ? 'bg-blue-100 hover:bg-blue-200' : ''}
                                                >
                                                    <Eye size={16} />
                                                </Button>
                                                {application.url && (
                                                    <Button variant="ghost" size="sm" onClick={() => window.open(application.url, "_blank")}>
                                                        <ExternalLink size={16} />
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="sm" onClick={() => handleEditApplication(application)}
                                                    title="Edit application">
                                                    <Edit size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredApplications.length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            <p>No applications found matching your criteria.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>

            <AddApplicationModal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false)
                    setSearchTerm("")
                    setStatusFilter("all")
                    setSortBy("date")
                }}
            />
            <EditApplicationModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                onUpdateApplication={handleUpdateApplication}
                application={editingApplication}
            />

            {/* New Application Details Modal */}
            <ApplicationDetails
                isOpen={isDetailsModalOpen}
                onClose={closeDetailsModal}
                application={selectedApplication}
            />
        </div>
    )
}
export default ApplicationsPage