import React from 'react';
import DashboardTable from '../DashboardTable';

const DashboardMainBook = () => {
    const mainBookData = [
        { no: 1, id: 'MB-001', title: 'Beyond The Hustle', customer: 'Michael Scott', date: '2023-10-01', type: 'Hardcover', status: 'Completed' },
        { no: 2, id: 'MB-002', title: 'Beyond The Hustle', customer: 'Dwight Schrute', date: '2023-10-02', type: 'E-book', status: 'Completed' },
        { no: 3, id: 'MB-003', title: 'Beyond The Hustle', customer: 'Jim Halpert', date: '2023-10-03', type: 'Hardcover', status: 'Pending' },
        { no: 4, id: 'MB-004', title: 'Beyond The Hustle', customer: 'Pam Beesly', date: '2023-10-04', type: 'E-book', status: 'Completed' },
        { no: 5, id: 'MB-005', title: 'Beyond The Hustle', customer: 'Ryan Howard', date: '2023-10-05', type: 'Hardcover', status: 'Pending' },
    ];

    const mainBookColumns = ['No.', 'ID', 'Title', 'Customer', 'Date', 'Type', 'Status'];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Main Book Orders</h1>
            <DashboardTable
                title="All Main Book Orders"
                columns={mainBookColumns}
                data={mainBookData}
                enableExport={true}
            />
        </div>
    );
};

export default DashboardMainBook;
