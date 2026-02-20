import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';

const TopBar = ({ toggleSidebar }) => {
    const { user } = useAuth();
    const { searchQuery, setSearchQuery } = useSearch();
    const displayName = user?.name || 'Admin';
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <header className="bg-white shadow-sm h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 -ml-2 rounded-md lg:hidden text-gray-600 hover:bg-gray-100"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#D95B24] focus:bg-white transition-all w-64"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="border-l pl-4">
                    <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-3 p-1 px-2 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-800 group-hover:text-[#D95B24] transition-colors">{displayName}</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-[#D95B24] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:shadow-md transition-all">
                            {initial}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

TopBar.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
};

export default TopBar;
