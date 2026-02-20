import React, { useState, useEffect } from 'react';
import StatsCard from '../StatsCard';
import DashboardBarChart from '../DashboardBarChart';
import DashboardPieChart from '../DashboardPieChart';
import DashboardChart from '../DashboardChart';
import { BookOpen, Book, Users, Eye, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const DashboardOverview = () => {
    const { token } = useAuth();
    const [data, setData] = useState(null);
    const [trafficData, setTrafficData] = useState([]);
    const [period, setPeriod] = useState('week'); // Add period state
    const [salesDistributionData, setSalesDistributionData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trafficLoading, setTrafficLoading] = useState(true);
    const [salesLoading, setSalesLoading] = useState(true);
    const [pieLoading, setPieLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTrafficData = async (selectedPeriod) => {
        if (!token) return;
        setTrafficLoading(true);
        try {
            const response = await fetch(`https://api.drboahemaantim.com/api/dashboard/site-visits?period=${selectedPeriod}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();

            if (result.labels && result.data) {
                const formattedData = result.labels.map((label, index) => ({
                    name: label,
                    value: result.data[index]
                }));
                setTrafficData(formattedData);
            }
        } catch (error) {
            console.error('Failed to fetch traffic data:', error);
        } finally {
            setTrafficLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchTrafficData(period);
        }
    }, [period, token]);

    useEffect(() => {
        if (!token) return;

        const fetchDashboardData = async () => {
            try {
                const response = await fetch('https://api.drboahemaantim.com/api/dashboard/overview-numbers', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
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



        const fetchSalesDistribution = async () => {
            setSalesLoading(true);
            try {
                const response = await fetch('https://api.drboahemaantim.com/api/dashboard/workbook-sales-per-month', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = await response.json();

                if (result.labels && result.data) {
                    const formattedData = result.labels.map((label, index) => ({
                        name: label,
                        value: result.data[index]
                    }));
                    setSalesDistributionData(formattedData);
                }
            } catch (error) {
                console.error('Failed to fetch sales distribution:', error);
            } finally {
                setSalesLoading(false);
            }
        };

        const fetchBookSalesPercentage = async () => {
            setPieLoading(true);
            try {
                const response = await fetch('https://api.drboahemaantim.com/api/dashboard/book-sales-percentage', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = await response.json();
                setPieData([
                    { name: 'Workbooks', value: result.workbook_percentage || 0 },
                    { name: 'Main Book', value: result.book_percentage || 0 },
                ]);
            } catch (error) {
                console.error('Failed to fetch book sales percentage:', error);
            } finally {
                setPieLoading(false);
            }
        };

        fetchDashboardData();
        fetchSalesDistribution();
        fetchBookSalesPercentage();
    }, [token]);

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
            <div className="mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Overview</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Welcome back, Dr. Boahemaa!</p>
            </div>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
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
                <DashboardChart
                    title="Traffic Overview"
                    data={trafficData}
                    period={period}
                    onPeriodChange={(newPeriod) => setPeriod(newPeriod)} // Update state
                    loading={trafficLoading}
                />
            </div>

            {/* Replacement Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DashboardBarChart
                    title="Monthly Sales Distribution"
                    data={salesDistributionData}
                    loading={salesLoading}
                    valueLabel="Sales"
                />
                <DashboardPieChart
                    title="Book Sales Percentage"
                    data={pieData}
                    loading={pieLoading}
                />
            </div>
        </div>
    );
};

export default DashboardOverview;
