import React, { useState, useEffect } from 'react';
import StatsCard from '../StatsCard';
import DashboardTable from '../DashboardTable';
import DashboardChart from '../DashboardChart';
import { BookOpen, Book, Users, Eye, Loader2, AlertCircle } from 'lucide-react';

const DashboardOverview = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('https://api.drboahemaantim.com/api/dashboard/overview-numbers');
                if (!response.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Polished Data from API
    const stats = [
        {
            title: 'Workbook Number',
            value: data?.workbooks_bought?.toLocaleString() || '0',
            icon: BookOpen,
            color: 'bg-blue-500',
            description: 'Total number of digital workbooks purchased and downloaded by users to date.'
        },
        {
            title: 'Mainbook Number',
            value: data?.beyond_hustle_books?.toLocaleString() || '0',
            icon: Book,
            color: 'bg-indigo-500',
            description: 'Total sales and distribution count for the "Beyond The Hustle" main book.'
        },
        {
            title: 'Site Visits',
            value: data?.site_visits?.toLocaleString() || '0',
            icon: Eye,
            color: 'bg-orange-500',
            description: 'Total unique visitors and sessions recorded on the platform.'
        },
        {
            title: 'Business Pitches',
            value: data?.business_pitches?.toLocaleString() || '0',
            icon: Users,
            color: 'bg-purple-500',
            description: 'Number of unique business ideas and pitches submitted through the platform.'
        },
    ];

    const chartData = [
        { name: 'Mon', value: 4000 },
        { name: 'Tue', value: 3000 },
        { name: 'Wed', value: 2000 },
        { name: 'Thu', value: 2780 },
        { name: 'Fri', value: 1890 },
        { name: 'Sat', value: 2390 },
        { name: 'Sun', value: 3490 },
    ];

    const workbookData = [
        { no: 1, id: 'WB-001', name: 'Financial Freedom', status: 'Completed' },
        { no: 2, id: 'WB-002', name: 'Invest Smart', status: 'Pending' },
        { no: 3, id: 'WB-003', name: 'Retire Early', status: 'Completed' },
        { no: 4, id: 'WB-004', name: 'Tax Hacks', status: 'Completed' },
        { no: 5, id: 'WB-005', name: 'Wealth Building', status: 'Pending' },
    ];

    const workbookColumns = ['No.', 'ID', 'Name', 'Status'];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="h-10 w-10 text-indigo-500 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading dashboard overview...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-red-50 rounded-2xl p-8 border border-red-100">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h3>
                <p className="text-red-600 text-center max-w-md">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, Dr. Boahemaa!</p>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        color={stat.color}
                        description={stat.description}
                    />
                ))}
            </div>

            {/* Charts Section */}
            <div className="mb-8">
                <DashboardChart title="Traffic Overview" data={chartData} />
            </div>

            {/* Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DashboardTable
                    title="Recent Workbook Orders"
                    columns={workbookColumns}
                    data={workbookData}
                />
                <DashboardTable
                    title="Recent Mainbook Orders"
                    columns={workbookColumns}
                    data={workbookData}
                />
            </div>
        </div>
    );
};

export default DashboardOverview;
