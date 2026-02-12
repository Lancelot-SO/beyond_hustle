import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../Components/Dashboard/DashboardLayout';
import DashboardOverview from '../Components/Dashboard/Pages/DashboardOverview';
import DashboardProfile from '../Components/Dashboard/Pages/DashboardProfile';
import DashboardWorkbook from '../Components/Dashboard/Pages/DashboardWorkbook';
import DashboardMainBook from '../Components/Dashboard/Pages/DashboardMainBook';
import DashboardAnalytics from '../Components/Dashboard/Pages/DashboardAnalytics';
import DashboardBusinessPitches from '../Components/Dashboard/Pages/DashboardBusinessPitches';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/profile" element={<DashboardProfile />} />
                <Route path="/workbook" element={<DashboardWorkbook />} />
                <Route path="/main-book" element={<DashboardMainBook />} />
                <Route path="/business-pitches" element={<DashboardBusinessPitches />} />
                <Route path="/analytics" element={<DashboardAnalytics />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </DashboardLayout>
    );
};

export default Dashboard;
