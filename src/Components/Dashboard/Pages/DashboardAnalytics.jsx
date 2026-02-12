import React from 'react';
import DashboardChart from '../DashboardChart';
import { Info } from 'lucide-react';

const DashboardAnalytics = () => {
    // Polished Dummy Data
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

    const trafficData = [
        { name: 'Mon', value: 1200 },
        { name: 'Tue', value: 1900 },
        { name: 'Wed', value: 1500 },
        { name: 'Thu', value: 2100 },
        { name: 'Fri', value: 2800 },
        { name: 'Sat', value: 3200 },
        { name: 'Sun', value: 3800 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DashboardChart title="Yearly Site Visits" data={visitData} />
                <DashboardChart title="Weekly Traffic Trends" data={trafficData} />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {/* Insight Card 1 */}
                    <div className="p-4 bg-orange-50 rounded-lg relative">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <p className="text-orange-600 text-sm font-medium">Avg. Visit Duration</p>
                            <div className="relative group/tooltip">
                                <Info size={14} className="text-orange-400 cursor-help" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 pointer-events-none border border-white/5">
                                    The average amount of time a visitor spends on your site during a single session.
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">4m 32s</p>
                    </div>

                    {/* Insight Card 2 */}
                    <div className="p-4 bg-indigo-50 rounded-lg relative">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <p className="text-indigo-600 text-sm font-medium">Bounce Rate</p>
                            <div className="relative group/tooltip">
                                <Info size={14} className="text-indigo-400 cursor-help" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 pointer-events-none border border-white/5">
                                    The percentage of visitors who leave the site after viewing only one page.
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">24.5%</p>
                    </div>

                    {/* Insight Card 3 */}
                    <div className="p-4 bg-green-50 rounded-lg relative">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <p className="text-green-600 text-sm font-medium">New Sessions</p>
                            <div className="relative group/tooltip">
                                <Info size={14} className="text-green-400 cursor-help" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 pointer-events-none border border-white/5">
                                    The percentage of first-time visitors compared to returning users.
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">82%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAnalytics;
