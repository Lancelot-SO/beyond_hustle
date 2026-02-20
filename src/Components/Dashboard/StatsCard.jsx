import React from 'react';
import PropTypes from 'prop-types';
import { Info } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, color, description }) => {
    return (
        <div className={`relative overflow-visible rounded-2xl p-4 sm:p-6 bg-white border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}>
            {/* Background Circle Decoration - Subtle */}
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300 ${color}`}></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</p>

                    {/* Tooltip trigger icon with floating tooltip */}
                    <div className="relative group/tooltip">
                        <div className={`p-2 rounded-full bg-gray-50 border border-gray-100 ${color.replace('bg-', 'text-')} cursor-help transition-all hover:bg-white hover:shadow-sm`}>
                            {Icon && <Icon size={20} />}
                        </div>

                        {/* Floating Tooltip */}
                        {description && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 p-4 bg-gray-900 text-white text-[11px] rounded-xl shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 pointer-events-none border border-white/10 backdrop-blur-sm">
                                <p className="font-bold mb-1.5 text-[#D95B24] border-b border-white/10 pb-1">{title}</p>
                                <p className="text-gray-300 leading-relaxed font-normal">{description}</p>
                                {/* Tooltip Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                            </div>
                        )}
                    </div>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
            </div>

            {/* Decorative gradient line at the bottom */}
            <div className={`absolute bottom-0 left-0 h-1 w-full ${color}`}></div>
        </div>
    );
};

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.elementType,
    color: PropTypes.string,
    description: PropTypes.string,
};

StatsCard.defaultProps = {
    color: 'bg-blue-500',
    description: '',
};

export default StatsCard;
