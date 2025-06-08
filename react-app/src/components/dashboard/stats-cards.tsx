import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { getAllApplications } from "../../reducers/newApplication";
import type { Application } from "../../reducers/newApplication"; // adjust path if needed
import { getWeekStats } from "../../utils";
const StatsCards = () => {
    const dispatch = useDispatch();
    const { applications = [], error } = useSelector((state: any) => state.application || {});

    useEffect(() => {
        dispatch(getAllApplications() as any);
    }, [dispatch]);

    const stats = useMemo(() => {
        const total = applications.length;
        const interviews = applications.filter((app: Application) => app.status === "interview").length;
        const offers = applications.filter((app: Application) => app.status === "offer").length;
        const successRate = total > 0 ? ((offers / total) * 100).toFixed(1) : "0";

        const { totalDelta, interviewDelta, offerDelta } = getWeekStats(applications);

        return {
            total,
            interviews,
            offers,
            successRate,
            totalDelta,
            interviewDelta,
            offerDelta,
        };
    }, [applications]);

    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <p className="text-xs text-gray-600">
                        {stats.totalDelta >= 0 ? "+" : ""}
                        {stats.totalDelta} from last week
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.interviews}</div>
                    <p className="text-xs text-gray-600">
                        {stats.interviewDelta >= 0 ? "+" : ""}
                        {stats.interviewDelta} from last week
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Offers Received</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.offers}</div>
                    <p className="text-xs text-gray-600">
                        {stats.offerDelta >= 0 ? "+" : ""}
                        {stats.offerDelta} from last week
                    </p>

                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Application Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.successRate}%</div>
                    <Progress value={parseFloat(stats.successRate)} className="mt-2" />
                </CardContent>
            </Card>
        </div>
    );
};

export default StatsCards;
