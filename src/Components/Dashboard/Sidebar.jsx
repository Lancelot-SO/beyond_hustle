import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Book,
    BarChart2,
    LogOut,
    Menu,
    Users
} from 'lucide-react';
import PropTypes from 'prop-types';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const links = [
        { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { title: 'Workbook', path: '/dashboard/workbook', icon: BookOpen },
        { title: 'Main Book', path: '/dashboard/main-book', icon: Book },
        { title: 'Business Pitches', path: '/dashboard/business-pitches', icon: Users },
        { title: 'Analytics', path: '/dashboard/analytics', icon: BarChart2 },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            />

            {/* Sidebar Container */}
            <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#1C2237] text-white shadow-2xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-center h-20 border-b border-gray-700">
                        <h1 className="text-2xl font-bold font-openSans text-[#D95B24]">Beyond The Hustle</h1>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {links.map((link) => (
                            <NavLink
                                key={link.title}
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive
                                        ? 'bg-[#D95B24] text-white'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`
                                }
                            >
                                <link.icon className="w-5 h-5 mr-3" />
                                <span className="font-medium">{link.title}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-700">
                        <button className="flex items-center w-full p-3 text-gray-300 rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-colors duration-200">
                            <LogOut className="w-5 h-5 mr-3" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
