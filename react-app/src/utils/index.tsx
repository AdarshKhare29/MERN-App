import {
    parseISO,
    startOfWeek,
    endOfWeek,
    subWeeks,
    isWithinInterval,
    isValid
} from "date-fns";

export interface Application {
    applicationDate?: string;
    status: string;
}

export function getWeekStats(applications: Application[]) {
    const now = new Date();

    const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
    const thisWeekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const lastWeekStart = subWeeks(thisWeekStart, 1);
    const lastWeekEnd = subWeeks(thisWeekEnd, 1);

    const safeParse = (dateStr?: string) => {
        if (!dateStr) return null;
        const parsed = parseISO(dateStr);
        return isValid(parsed) ? parsed : null;
    };

    const thisWeekApps = applications.filter(app => {
        const date = safeParse(app.applicationDate);
        return date && isWithinInterval(date, { start: thisWeekStart, end: thisWeekEnd });
    });

    const lastWeekApps = applications.filter(app => {
        const date = safeParse(app.applicationDate);
        return date && isWithinInterval(date, { start: lastWeekStart, end: lastWeekEnd });
    });

    const totalDelta = thisWeekApps.length - lastWeekApps.length;
    const interviewDelta =
        thisWeekApps.filter(app => app.status === "interview").length -
        lastWeekApps.filter(app => app.status === "interview").length;
    const offerDelta =
        thisWeekApps.filter(app => app.status === "offer").length -
        lastWeekApps.filter(app => app.status === "offer").length;

    return {
        totalDelta,
        interviewDelta,
        offerDelta
    };
}
