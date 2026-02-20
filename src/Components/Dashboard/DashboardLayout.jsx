import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import PropTypes from 'prop-types';

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">
                <TopBar toggleSidebar={toggleSidebar} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-3 sm:p-4 md:p-6">
                    <div className="container mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;
