import DashboardStats from "@/components/dashboard/dashboard-stats";

export default function Page() {
    return (
        <div
            className='w-full p-10'>
            <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
            <DashboardStats />
        </div>
    );
};