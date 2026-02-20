import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import PropTypes from 'prop-types';

const DashboardChart = ({ title, data, period, onPeriodChange, loading }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 h-full">
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-500">Overview of performance</p>
                </div>
                <select
                    value={period}
                    onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#D95B24] focus:border-[#D95B24] block p-2"
                >
                    <option value="week">Last 7 days</option>
                    <option value="month">Last 30 days</option>
                    <option value="year">This Year</option>
                </select>
            </div>

            <div className="h-[220px] sm:h-[300px] w-full relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-xl">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D95B24]"></div>
                    </div>
                )}
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D95B24" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#D95B24" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ color: '#D95B24', fontWeight: 600 }}
                            cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#D95B24"
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

DashboardChart.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    period: PropTypes.string,
    onPeriodChange: PropTypes.func,
    loading: PropTypes.bool,
};

export default DashboardChart;
