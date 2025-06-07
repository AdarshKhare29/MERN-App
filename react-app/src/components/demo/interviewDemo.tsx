import React from "react"
import { Badge } from "../ui/badge"
const InterviewDemo = () => {
    return (
        <div className="bg-white p-4 rounded-lg border">
            <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">📅</div>
                    <div>
                        <div className="font-medium text-sm">Technical Interview</div>
                        <div className="text-xs text-gray-600">Tomorrow, 10:00 AM</div>
                    </div>
                    <Badge className="bg-blue-500 ml-auto">Scheduled</Badge>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">👥</div>
                    <div>
                        <div className="font-medium text-sm">HR Interview</div>
                        <div className="text-xs text-gray-600">Wed, 2:30 PM</div>
                    </div>
                    <Badge className="bg-green-500 ml-auto">Completed</Badge>
                </div>
            </div>
        </div>
    )
}
export default InterviewDemo