import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useSelector, useDispatch } from "react-redux"
import { getAllApplications } from "../../reducers/newApplication"
import type { Application } from "../../reducers/newApplication";
import { formatDistanceToNow, isValid, parseISO } from "date-fns";


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

const RecentApplications = () => {
    const dispatch = useDispatch();
    const { applications = [], error } = useSelector((state: any) => state.application || {});

    useEffect(() => {
        dispatch(getAllApplications() as any);
    }, [dispatch]);
    console.log(applications)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>You've applied to {applications.length} jobs in the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {applications.slice(0, 5).map((application: Application) => (
                        <div
                            key={application._id}
                            className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg border p-4"
                        >
                            <div>
                                <div className="font-semibold">{application.jobTitle}</div>
                                <div className="text-sm text-gray-600">{application.company}</div>
                            </div>
                            <Badge className={statusColors[application.status]}>{statusLabels[application.status]}</Badge>
                            <div className="text-sm text-gray-600">
                                {(() => {
                                    const parsedDate = application.applicationDate ? parseISO(application.applicationDate) : null;
                                    return parsedDate && isValid(parsedDate)
                                        ? formatDistanceToNow(parsedDate, { addSuffix: true })
                                        : "Unknown date";
                                })()}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    View All Applications
                </Button>
            </CardFooter>
        </Card>
    )
}
export default RecentApplications