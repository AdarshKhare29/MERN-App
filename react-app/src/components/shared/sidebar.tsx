import { useLocation, useNavigate } from "react-router-dom"
import { BarChart3, BriefcaseIcon, Calendar, Settings } from "../icons"

const Sidebar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
        { path: "/applications", label: "Applications", icon: BriefcaseIcon },
        { path: "/interviews", label: "Interviews", icon: Calendar },
        { path: "/settings", label: "Settings", icon: Settings },
    ]

    return (
        <aside className="hidden w-[200px] flex-col border-r bg-gray-50 sm:flex">
            <nav className="grid gap-2 px-2 py-4">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path

                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${isActive
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                        >
                            <Icon size={16} />
                            {item.label}
                        </button>
                    )
                })}
            </nav>
        </aside>
    )
}
export default Sidebar