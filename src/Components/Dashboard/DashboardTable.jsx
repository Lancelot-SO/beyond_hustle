import React from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Download } from 'lucide-react';

const DashboardTable = ({ title, columns, data, enableExport = false }) => {

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${title.replace(/\s+/g, '_')}.xlsx`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(title, 20, 10);

        // Extract headers and body
        // Assuming 'data' is an array of objects, and 'columns' matches the keys or we just trust the order
        // For a more robust solution, we should map data to columns explicitly, 
        // but for now let's assume simple object interactions or flat data.

        // Better approach: map data values to an array of arrays
        const tableBody = data.map(row => Object.values(row));

        doc.autoTable({
            head: [columns],
            body: tableBody,
        });

        doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <div className="flex items-center gap-2">
                    {enableExport && (
                        <>
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
                                <Download size={14} /> PDF
                            </button>
                        </>
                    )}
                    <button className="text-sm text-[#D95B24] font-medium hover:underline ml-2">View All</button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                            {columns.map((col, index) => (
                                <th key={index} className="px-6 py-3 font-semibold text-center sm:text-left">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data && data.length > 0 ? (
                            data.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                    {Object.values(row).map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap text-center sm:text-left">
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
                                    No data available.
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
