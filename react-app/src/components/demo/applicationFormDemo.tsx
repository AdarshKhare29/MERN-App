import React from "react"
import { Badge } from "../ui/badge"
const ApplicationFormDemo = () => {
    return (
        <div className="bg-white p-4 rounded-lg border">
            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Job Title</label>
                    <div className="w-full p-2 border rounded text-sm">Senior Frontend Developer</div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                    <div className="w-full p-2 border rounded text-sm">TechCorp Inc.</div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                    <Badge className="bg-yellow-500">Applied</Badge>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Application Date</label>
                    <div className="w-full p-2 border rounded text-sm">2024-01-15</div>
                </div>
            </div>
        </div>
    )
}
export default ApplicationFormDemo