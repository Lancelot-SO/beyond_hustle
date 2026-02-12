import React from 'react';
import DashboardTable from '../DashboardTable';

const DashboardWorkbook = () => {
    const workbookData = [
        { no: 1, id: 'WB-001', name: 'Financial Freedom', customer: 'John Doe', date: '2023-10-01', amount: 'GHS 100', status: 'Completed' },
        { no: 2, id: 'WB-002', name: 'Invest Smart', customer: 'Jane Smith', date: '2023-10-02', amount: 'GHS 250', status: 'Pending' },
        { no: 3, id: 'WB-003', name: 'Retire Early', customer: 'Alice Johnson', date: '2023-10-03', amount: 'GHS 150', status: 'Completed' },
        { no: 4, id: 'WB-004', name: 'Tax Hacks', customer: 'Bob Brown', date: '2023-10-04', amount: 'GHS 120', status: 'Completed' },
        { no: 5, id: 'WB-005', name: 'Wealth Building', customer: 'Charlie Davis', date: '2023-10-05', amount: 'GHS 200', status: 'Pending' },
        // Add more mock data as needed
        { no: 6, id: 'WB-006', name: 'Crypto Basics', customer: 'Diana Prince', date: '2023-10-06', amount: 'GHS 300', status: 'Completed' },
        { no: 7, id: 'WB-007', name: 'Stock Market 101', customer: 'Evan Wright', date: '2023-10-07', amount: 'GHS 180', status: 'Pending' },
    ];

    const workbookColumns = ['No.', 'ID', 'Name', 'Customer', 'Date', 'Amount', 'Status'];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Workbook Orders</h1>
            <DashboardTable
                title="All Workbook Orders"
                columns={workbookColumns}
                data={workbookData}
                enableExport={true}
            />
        </div>
    );
};

export default DashboardWorkbook;
