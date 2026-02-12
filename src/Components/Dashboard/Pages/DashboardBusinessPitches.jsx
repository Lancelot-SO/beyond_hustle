import React, { useState } from 'react';
import { Eye, X, Download, FileSpreadsheet, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DashboardBusinessPitches = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPitch, setSelectedPitch] = useState(null);

    // Mock Data for Business Pitches
    const pitches = [
        {
            id: 'BP-2024-001',
            businessName: 'EcoGro Tech',
            entrepreneur: 'Kwame Mensah',
            industry: 'Agriculture',
            status: 'Pending',
            dateSubmitted: '2024-02-10',
            description: 'A sustainable farming technology that uses AI to optimize irrigation water usage for smallholder farmers, reducing waste by up to 40%.',
            fundingAsk: 'GHS 50,000',
            contactEmail: 'kwame@ecogrotech.com',
            phone: '+233 54 123 4567'
        },
        {
            id: 'BP-2024-002',
            businessName: 'SolarAfric Solutions',
            entrepreneur: 'Ama Osei',
            industry: 'Energy',
            status: 'Reviewed',
            dateSubmitted: '2024-02-08',
            description: 'Affordable solar-powered cold storage units for rural market women to reduce post-harvest losses of fruits and vegetables.',
            fundingAsk: 'GHS 75,000',
            contactEmail: 'ama@solarafric.com',
            phone: '+233 24 987 6543'
        },
        {
            id: 'BP-2024-003',
            businessName: 'EduLearn Ghana',
            entrepreneur: 'Kofi Boateng',
            industry: 'Education',
            status: 'Approved',
            dateSubmitted: '2024-02-05',
            description: 'An offline-first e-learning platform providing localized STEM content to schools without reliable internet access.',
            fundingAsk: 'GHS 30,000',
            contactEmail: 'kofi@edulearn.gh',
            phone: '+233 20 111 2222'
        },
        {
            id: 'BP-2024-004',
            businessName: 'HealthConnect',
            entrepreneur: 'Abena Agyeman',
            industry: 'Healthcare',
            status: 'Pending',
            dateSubmitted: '2024-02-11',
            description: 'Telemedicine app connecting patients in remote areas with specialized doctors in Accra for consultations.',
            fundingAsk: 'GHS 100,000',
            contactEmail: 'abena@healthconnect.com',
            phone: '+233 55 333 4444'
        },
        {
            id: 'BP-2024-005',
            businessName: 'WasteNot Ghana',
            entrepreneur: 'Yaw Asare',
            industry: 'Sanitation',
            status: 'Rejected',
            dateSubmitted: '2024-01-25',
            description: 'Community-based waste recycling program that incentivizes households to separate plastic waste for cash.',
            fundingAsk: 'GHS 20,000',
            contactEmail: 'yaw@wastenot.org',
            phone: '+233 59 555 6666'
        }
    ];

    const handleViewClick = (pitch) => {
        setSelectedPitch(pitch);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPitch(null);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
            case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
            case 'Reviewed': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(pitches);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Business Pitches");
        XLSX.writeFile(wb, "Business_Pitches.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Business Pitches Report", 14, 15);

        const tableColumn = ["ID", "Business Name", "Entrepreneur", "Industry", "Status", "Date", "Phone", "Email"];
        const tableRows = [];

        pitches.forEach(pitch => {
            const pitchData = [
                pitch.id,
                pitch.businessName,
                pitch.entrepreneur,
                pitch.industry,
                pitch.status,
                pitch.dateSubmitted,
                pitch.phone,
                pitch.contactEmail
            ];
            tableRows.push(pitchData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("Business_Pitches_Report.pdf");
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Business Pitches</h1>
                    <p className="text-gray-500 mt-1">Review and manage submitted business proposals.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={exportToExcel}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                    >
                        <FileSpreadsheet size={18} />
                        <span className="hidden sm:inline">Export Excel</span>
                    </button>
                    <button
                        onClick={exportToPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                    >
                        <FileText size={18} />
                        <span className="hidden sm:inline">Export PDF</span>
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Pitch ID</th>
                                <th className="px-6 py-4 font-semibold">Business Name</th>
                                <th className="px-6 py-4 font-semibold">Entrepreneur</th>
                                <th className="px-6 py-4 font-semibold">Industry</th>
                                <th className="px-6 py-4 font-semibold text-center">Status</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pitches.map((pitch) => (
                                <tr key={pitch.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{pitch.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{pitch.businessName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{pitch.entrepreneur}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{pitch.industry}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(pitch.status)}`}>
                                            {pitch.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{pitch.dateSubmitted}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleViewClick(pitch)}
                                            className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-[#D95B24] hover:text-white transition-all duration-200 group"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pitch Details Modal */}
            {isModalOpen && selectedPitch && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedPitch.businessName}</h2>
                                <p className="text-sm text-gray-500 mt-1">Submitted by <span className="font-semibold text-[#D95B24]">{selectedPitch.entrepreneur}</span> on {selectedPitch.dateSubmitted}</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="px-8 py-8 space-y-8">

                            {/* Status & ID Badge */}
                            <div className="flex gap-4">
                                <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pitch ID</p>
                                    <p className="text-sm font-bold text-gray-900">{selectedPitch.id}</p>
                                </div>
                                <div className={`px-4 py-2 rounded-lg border flex items-center ${getStatusStyle(selectedPitch.status)}`}>
                                    <span className="text-sm font-bold">{selectedPitch.status}</span>
                                </div>
                            </div>

                            {/* Pitch Description */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-[#D95B24] pl-3">Business Concept</h3>
                                <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    {selectedPitch.description}
                                </p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Industry</p>
                                    <p className="text-base text-gray-900 font-medium">{selectedPitch.industry}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Funding Ask</p>
                                    <p className="text-base text-gray-900 font-bold">{selectedPitch.fundingAsk}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                                    <a href={`mailto:${selectedPitch.contactEmail}`} className="text-base text-[#D95B24] hover:underline font-medium">
                                        {selectedPitch.contactEmail}
                                    </a>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Phone</p>
                                    <p className="text-base text-gray-900 font-medium">{selectedPitch.phone}</p>
                                </div>
                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-gray-50 px-8 py-6 border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl">
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                                <Download size={18} />
                                Download Pitch Deck
                            </button>
                            <button className="px-6 py-2.5 bg-[#D95B24] text-white font-medium rounded-xl hover:bg-[#c04b1f] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                                Contact Entrepreneur
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardBusinessPitches;
