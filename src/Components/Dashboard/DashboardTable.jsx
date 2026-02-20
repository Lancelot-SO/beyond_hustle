import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, FileText, Search } from 'lucide-react';

const DashboardTable = ({ title, columns, data, enableExport = false }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(row =>
        Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${title.replace(/\s+/g, '_')}.xlsx`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(title, 14, 15);

        const tableColumn = columns;
        const tableRows = filteredData.map(row => Object.values(row));

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
        doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50/50 gap-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D95B24] focus:border-transparent w-full text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {enableExport && (
                            <div className="flex gap-2">
                                <button
                                    onClick={exportToExcel}
                                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition"
                                >
                                    <Download size={14} /> Excel
                                </button>
                                <button
                                    onClick={exportToPDF}
                                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
                                >
                                    <FileText size={14} /> PDF
                                </button>
                            </div>
                        )}
                        <button className="text-sm text-[#D95B24] font-medium hover:underline ml-2 whitespace-nowrap">View All</button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                            {columns.map((col, index) => (
                                <th key={index} className="px-3 sm:px-6 py-3 font-semibold text-center sm:text-left">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredData && filteredData.length > 0 ? (
                            filteredData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                    {Object.values(row).map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap text-center sm:text-left">
                                            {cell === 'Completed' ? (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                                                    {cell}
                                                </span>
                                            ) : cell === 'Pending' ? (
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
                                                    {cell}
                                                </span>
                                            ) : (
                                                cell
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                                    {searchTerm ? 'No results match your search' : 'No data available'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

DashboardTable.propTypes = {
    title: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    enableExport: PropTypes.bool,
};

export default DashboardTable;
