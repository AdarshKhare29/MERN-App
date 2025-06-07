import React from "react"
const DashboardDemo = () => {
    return (
        <div className="bg-white p-4 rounded-lg border">
            <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-xs text-gray-600">Applications</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">7</div>
                    <div className="text-xs text-gray-600">Interviews</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded">
                    <div className="text-2xl font-bold text-yellow-600">2</div>
                    <div className="text-xs text-gray-600">Offers</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded">
                    <div className="text-2xl font-bold text-purple-600">29%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                </div>
            </div>
            <div className="text-sm text-gray-600">Track your progress with real-time analytics and insights.</div>
        </div>
    )
}
export default DashboardDemo