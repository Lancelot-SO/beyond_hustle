import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

const DashboardPieChart = ({ title, data, loading = false }) => {
    const COLORS = ['#D95B24', '#4F46E5', '#10B981', '#F59E0B', '#6366F1'];

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 h-full">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">Resource distribution</p>
            </div>

            <div className="h-[220px] sm:h-[300px] w-full">
                {loading ? (
                    <div className="h-full flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-[#D95B24] animate-spin" />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E7EB',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                formatter={(value) => <span className="text-xs font-medium text-gray-600">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

DashboardPieChart.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DashboardPieChart;
