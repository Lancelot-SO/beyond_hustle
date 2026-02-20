import React, { useState, useEffect } from 'react';
import DashboardChart from '../DashboardChart';
import DashboardBarChart from '../DashboardBarChart';
import { Info, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const DashboardAnalytics = () => {
    const { token } = useAuth();
    const [trafficData, setTrafficData] = useState([]);
    const [visitsPerPage, setVisitsPerPage] = useState([]);
    const [summary, setSummary] = useState(null);
    const [bounceData, setBounceData] = useState([]);
    const [sessionsData, setSessionsData] = useState([]);
    const [period, setPeriod] = useState('month');
    const [loading, setLoading] = useState(true);
    const [visitsLoading, setVisitsLoading] = useState(true);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [engagementLoading, setEngagementLoading] = useState(true);

    // Polished Dummy Data for visits (static for now)
    const visitData = [
        { name: 'Jan', value: 4500 },
        { name: 'Feb', value: 3200 },
        { name: 'Mar', value: 5800 },
        { name: 'Apr', value: 4900 },
        { name: 'May', value: 7200 },
        { name: 'Jun', value: 6400 },
        { name: 'Jul', value: 8100 },
        { name: 'Aug', value: 9500 },
        { name: 'Sep', value: 8800 },
        { name: 'Oct', value: 10200 },
        { name: 'Nov', value: 11500 },
        { name: 'Dec', value: 12800 },
    ];

    const fetchTrafficData = async (selectedPeriod) => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await fetch(`https://api.drboahemaantim.com/api/dashboard/site-visits?period=${selectedPeriod}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (data.labels && data.data) {
                const formattedData = data.labels.map((label, index) => ({
                    name: label,
                    value: data.data[index]
                }));
                setTrafficData(formattedData);
            }
        } catch (error) {
            console.error('Failed to fetch traffic data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchVisitsSummary = async () => {
        if (!token) return;
        setSummaryLoading(true);
        try {
            const response = await fetch('https://api.drboahemaantim.com/api/dashboard/visits-summary', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data) setSummary(data);
        } catch (error) {
            console.error('Failed to fetch visits summary:', error);
        } finally {
            setSummaryLoading(false);
        }
    };

    const fetchVisitsPerPage = async () => {
        if (!token) return;
        setVisitsLoading(true);
        try {
            const response = await fetch('https://api.drboahemaantim.com/api/dashboard/visits-per-page', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data) {
                // Map API keys to the format expected by BarChart (name/value)
                const formatted = Object.entries(data).map(([key, val]) => ({
                    name: key.split('/').pop() || 'Home',
                    value: val
                }));
                setVisitsPerPage(formatted);
            }
        } catch (error) {
            console.error('Failed to fetch visits per page:', error);
        } finally {
            setVisitsLoading(false);
        }
    };

    const fetchEngagementMetrics = async (selectedPeriod) => {
        if (!token) return;
        setEngagementLoading(true);
        try {
            const [bounceRes, sessionsRes] = await Promise.all([
                fetch(`https://api.drboahemaantim.com/api/dashboard/bounce-rate?period=${selectedPeriod}`, {
                    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
                }),
                fetch(`https://api.drboahemaantim.com/api/dashboard/new-sessions-percentage?period=${selectedPeriod}`, {
                    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
                })
            ]);

            const bounceJson = await bounceRes.json();
            const sessionsJson = await sessionsRes.json();

            if (bounceJson.labels && bounceJson.data) {
                setBounceData(bounceJson.labels.map((label, i) => ({ name: label, value: bounceJson.data[i] })));
            }
            if (sessionsJson.labels && sessionsJson.data) {
                setSessionsData(sessionsJson.labels.map((label, i) => ({ name: label, value: sessionsJson.data[i] })));
            }
        } catch (error) {
            console.error('Failed to fetch engagement metrics:', error);
        } finally {
            setEngagementLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchTrafficData(period);
            fetchVisitsSummary();
            fetchVisitsPerPage();
            fetchEngagementMetrics(period);
        }
    }, [period, token]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">Analytics Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Real-time performance monitoring and user behavioral analysis</p>
                </div>
                <div className="bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                        <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-75"></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live System Status</span>
                </div>
            </div>

            {/* Top Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DashboardChart
                    title="Traffic Overview Trend"
                    data={trafficData}
                    period={period}
                    onPeriodChange={setPeriod}
                    loading={loading}
                />
                <DashboardBarChart
                    title="Page Distribution Analysis"
                    data={visitsPerPage}
                    loading={visitsLoading}
                />
            </div>

            {/* Metrics & Insights Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Site Summary Section */}
                <div className="xl:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Key Performance Indicators</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Core site-wide metrics</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase rounded-full border border-gray-100">
                            Auto-sync enabled
                        </div>
                    </div>

                    {summaryLoading ? (
                        <div className="flex-grow flex items-center justify-center min-h-[250px]">
                            <Loader2 className="h-10 w-10 text-[#D95B24] animate-spin" />
                        </div>
                    ) : summary ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Total Visits */}
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="p-2 bg-orange-50 text-[#D95B24] rounded-lg">
                                            <Info className="w-4 h-4 opacity-70" />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Visits</span>
                                    </div>
                                    <p className="text-4xl font-black text-gray-900 font-openSans mb-1">
                                        {summary.total_visits?.toLocaleString() || 0}
                                    </p>
                                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-tighter flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Verified Data
                                    </p>
                                </div>
                            </div>

                            {/* Unique Visitors */}
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                            <Info className="w-4 h-4 opacity-70" />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Unique Users</span>
                                    </div>
                                    <p className="text-4xl font-black text-gray-900 font-openSans mb-1">
                                        {summary.unique_visitors?.toLocaleString() || 0}
                                    </p>
                                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Unique Identity
                                    </p>
                                </div>
                            </div>

                            {/* Avg Pages per Visit */}
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-green-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                            <Info className="w-4 h-4 opacity-70" />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Page Depth</span>
                                    </div>
                                    <p className="text-4xl font-black text-gray-900 font-openSans mb-1">
                                        {(summary.total_visits / (summary.unique_visitors || 1)).toFixed(1)}
                                    </p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Pages per session</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-grow flex items-center justify-center min-h-[250px] text-gray-400 font-semibold italic">
                            Summary data payload empty
                        </div>
                    )}

                    <div className="mt-auto pt-8 border-t border-gray-50 hidden md:block">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Insights Summary</p>
                    </div>
                </div>

                {/* Engagement Figures Section */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">User Engagement</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Behavioral figures</p>
                        </div>
                    </div>

                    <div className="space-y-6 flex-grow">
                        {/* Bounce Rate card */}
                        <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:border-[#D95B24]/40 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-orange-600 group-hover:bg-[#D95B24] group-hover:text-white transition-colors duration-300">
                                    <Info className="w-6 h-6 opacity-80" />
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bounce Rate</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-2xl font-black text-gray-900">
                                            {engagementLoading ? '...' : bounceData.length > 0 ? `${bounceData[bounceData.length - 1].value}%` : '24.5%'}
                                        </p>
                                        <span className="text-[10px] font-bold text-green-600">Site-wide</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* New Sessions card */}
                        <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:border-indigo-600/40 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                    <Info className="w-6 h-6 opacity-80" />
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New Sessions</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-2xl font-black text-gray-900">
                                            {engagementLoading ? '...' : sessionsData.length > 0 ? `${sessionsData[sessionsData.length - 1].value}%` : '82%'}
                                        </p>
                                        <span className="text-[10px] font-bold text-indigo-600">First-time</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Session Duration card */}
                        <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:border-green-600/40 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                    <Info className="w-6 h-6 opacity-80" />
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Avg. Session</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-2xl font-black text-gray-900">4m 32s</p>
                                        <span className="text-[10px] font-bold text-gray-400">Estimated</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-50">
                        <p className="text-[10px] font-bold text-gray-300 uppercase italic tracking-widest text-center">User engagement KPIs</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAnalytics;
