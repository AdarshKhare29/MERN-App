import React from "react"
const AnalyticsDemo = () => {
    return (
        <div className="bg-white p-4 rounded-lg border">
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span>Application Success Rate</span>
                        <span>29%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "29%" }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span>Interview Conversion</span>
                        <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                    💡 Tip: Your interview conversion rate is above average! Focus on applying to more positions.
                </div>
            </div>
        </div>
    )
}
export default AnalyticsDemo