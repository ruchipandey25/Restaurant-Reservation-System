import {
    Ban,
    IndianRupee,
    Star,
    Table,
} from "lucide-react";
import StatsCard from "./stats-card";

const DashboardStats = () => {

    const statsData = [
        {
            icon: IndianRupee,
            label: "Total Revenue",
            bgColor: "bg-emerald-500/10",
            iconColor: "text-emerald-500",
        },
        {
            icon: Table,
            label: "Total Reservations",
            bgColor: "bg-violet-500/10",
            iconColor: "text-violet-500",
        },
        {
            icon: Star,
            label: "Customer Feedback",
            bgColor: "bg-orange-500/10",
            iconColor: "text-orange-500",
        },
        {
            icon: Ban,
            label: "Cancellations",
            bgColor: "bg-red-500/10",
            iconColor: "text-red-500",
        },
    ];

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 '>
            {statsData.map((stat) => (
                <StatsCard
                    key={stat.label}
                    icon={stat.icon}
                    label={stat.label}
                    value={"0"}
                    bgColor={stat.bgColor}
                    iconColor={stat.iconColor}
                />
            ))}
        </div>
    );
};
export default DashboardStats;