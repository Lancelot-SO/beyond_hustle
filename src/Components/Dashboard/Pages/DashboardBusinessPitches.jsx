import React, { useState, useEffect } from 'react';
import { Eye, X, Download, FileSpreadsheet, FileText, Loader2, AlertCircle, Phone, Mail, CheckCircle2, ChevronDown, Trash2, Search } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuth } from '../../../context/AuthContext';

const DashboardBusinessPitches = () => {
    const { token } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPitch, setSelectedPitch] = useState(null);
    const [pitches, setPitches] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);

    const fetchPitches = async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://api.drboahemaantim.com/api/dashboard/business-pitches', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch business pitches');
            const data = await response.json();

            if (data.data) {
                // Map all API fields comprehensively
                const mappedPitches = data.data.map(pitch => ({
                    id: pitch?.pitch_id || 'N/A',
                    dbId: pitch?.id,
                    businessName: pitch?.company || 'N/A',
                    entrepreneur: pitch?.full_name || 'N/A',
                    age: pitch?.age || 'N/A',
                    email: pitch?.email || 'N/A',
                    phone: pitch?.phone || 'N/A',
                    industry: pitch?.industry || 'N/A',
                    status: pitch?.status ? (pitch.status.charAt(0).toUpperCase() + pitch.status.slice(1).toLowerCase()) : 'Pending',
                    dateSubmitted: pitch?.created_at ? new Date(pitch.created_at).toLocaleDateString() : 'N/A',

                    // Detailed fields
                    institution: pitch?.institution || 'N/A',
                    course: pitch?.course || 'N/A',
                    nationalId: pitch?.national_id || 'N/A',
                    nationalIdUrl: pitch?.national_id
                        ? (pitch.national_id.startsWith('http')
                            ? pitch.national_id
                            : (pitch.national_id.startsWith('national-ids/')
                                ? `https://api.drboahemaantim.com/storage/${pitch.national_id}`
                                : `https://api.drboahemaantim.com/storage/national-ids/${pitch.national_id}`))
                        : null,
                    teamSize: pitch?.team || 'N/A',
                    businessStage: pitch?.business_stage || 'Not Specified',
                    description: pitch?.business_description || 'No description provided.',
                    problemStatement: pitch?.problem_statement || 'No problem statement provided.',
                    customerProfile: pitch?.customer_profile || 'No customer profile provided.',
                    competitors: pitch?.competitors || 'No information provided.',
                    capitalRequired: pitch?.capital_required || 'No budget breakdown provided.',
                    acquisitionChannels: pitch?.acquisition_channels || 'No strategy provided.',
                    teamQualification: pitch?.team_qualification || 'No information provided.',
                    uniqueTeam: pitch?.unique_team || 'No information provided.',
                    receiptCodes: Array.isArray(pitch?.receipt_codes) ? pitch.receipt_codes.join(', ') : (pitch?.receipt_codes || 'None'),

                    // Placeholders if not in API but expected in UI
                    fundingAsk: pitch?.capital_required ? 'Check Budget Info' : 'TBD'
                }));
                setPitches(mappedPitches);
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching pitches:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchPitches();
        }
    }, [token]);

    // Filter pitches based on search query
    const filteredPitches = pitches.filter(pitch => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            (pitch?.businessName || '').toLowerCase().includes(query) ||
            (pitch?.entrepreneur || '').toLowerCase().includes(query) ||
            (pitch?.email || '').toLowerCase().includes(query) ||
            (pitch?.industry || '').toLowerCase().includes(query)
        );
    });

    const handleViewClick = (pitch) => {
        setSelectedPitch(pitch);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPitch(null);
        setStatusMessage(null);
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

    const updatePitchStatus = async (pitchId, newStatus) => {
        setUpdatingStatus(true);
        setStatusMessage(null);
        try {
            const response = await fetch(
                `https://api.drboahemaantim.com/api/dashboard/business-pitches/${pitchId}/update-status`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ status: newStatus.toLowerCase() }),
                }
            );
            if (!response.ok) throw new Error('Failed to update status');

            const formattedStatus = newStatus.charAt(0).toUpperCase() + newStatus.slice(1).toLowerCase();

            // Update local state
            setPitches(prev =>
                prev.map(p =>
                    p.dbId === pitchId ? { ...p, status: formattedStatus } : p
                )
            );
            if (selectedPitch && selectedPitch.dbId === pitchId) {
                setSelectedPitch(prev => ({ ...prev, status: formattedStatus }));
            }
            setStatusMessage({ type: 'success', text: `Status updated to ${formattedStatus}` });
            setTimeout(() => setStatusMessage(null), 3000);
        } catch (err) {
            setStatusMessage({ type: 'error', text: err.message });
        } finally {
            setUpdatingStatus(false);
        }
    };

    const deletePitch = async (pitchId) => {
        if (!window.confirm('Are you sure you want to delete this pitch? This action cannot be undone.')) return;
        try {
            const response = await fetch(
                `https://api.drboahemaantim.com/api/dashboard/business-pitches/${pitchId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (!response.ok) throw new Error('Failed to delete pitch');

            // Remove from local state
            setPitches(prev => prev.filter(p => p.dbId !== pitchId));

            // Close modal if the deleted pitch was being viewed
            if (selectedPitch && selectedPitch.dbId === pitchId) {
                closeModal();
            }
        } catch (err) {
            alert('Error deleting pitch: ' + err.message);
        }
    };

    const getBase64ImageFromURL = async (url) => {
        try {
            const response = await fetch(url, {
                mode: 'cors',
                headers: {
                    'Accept': 'image/*'
                }
            });
            if (!response.ok) throw new Error(`Image fetch failed: ${response.status}`);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error fetching image for PDF:", error);
            throw error;
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
        doc.text("Business Pitches", 14, 15);

        const tableColumn = ["Pitch ID", "Business Name", "Entrepreneur", "Industry", "Status", "Date"];
        const tableRows = pitches.map(pitch => [
            pitch.id,
            pitch.businessName,
            pitch.entrepreneur,
            pitch.industry,
            pitch.status,
            pitch.dateSubmitted
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
        doc.save("Business_Pitches.pdf");
    };

    const exportSinglePitchToExcel = (pitch) => {
        const data = [
            { Section: "Identification", Field: "Pitch ID", Value: pitch.id },
            { Section: "Identification", Field: "Business Name", Value: pitch.businessName },
            { Section: "Identification", Field: "Entrepreneur", Value: pitch.entrepreneur },
            { Section: "Identification", Field: "Status", Value: pitch.status },
            { Section: "Identification", Field: "Date Submitted", Value: pitch.dateSubmitted },
            { Section: "Profile", Field: "Age", Value: pitch.age },
            { Section: "Profile", Field: "Email", Value: pitch.email },
            { Section: "Profile", Field: "Phone", Value: pitch.phone },
            { Section: "Profile", Field: "Institution", Value: pitch.institution },
            { Section: "Profile", Field: "Course", Value: pitch.course },
            { Section: "Business", Field: "Industry", Value: pitch.industry },
            { Section: "Business", Field: "Stage", Value: pitch.businessStage },
            { Section: "Business", Field: "Team Size", Value: pitch.teamSize },
            { Section: "Business", Field: "Problem Statement", Value: pitch.problemStatement },
            { Section: "Business", Field: "Customer Profile", Value: pitch.customerProfile },
            { Section: "Business", Field: "Competitors", Value: pitch.competitors },
            { Section: "Business", Field: "Capital Required", Value: pitch.capitalRequired },
            { Section: "Strategy", Field: "Acquisition Channels", Value: pitch.acquisitionChannels },
            { Section: "Strategy", Field: "Team Qualification", Value: pitch.teamQualification },
            { Section: "Strategy", Field: "Unique Team", Value: pitch.uniqueTeam },
            { Section: "Metadata", Field: "Receipt Codes", Value: pitch.receiptCodes },
            { Section: "Description", Field: "Full Description", Value: pitch.description }
        ];

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Pitch Details");
        XLSX.writeFile(wb, `Pitch_${pitch.id}.xlsx`);
    };

    const exportSinglePitchToPDF = async (pitch) => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Business Pitch Details", 14, 22);

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Pitch ID: ${pitch.id}`, 14, 30);
        doc.text(`Business: ${pitch.businessName}`, 14, 37);
        doc.text(`Submitted by: ${pitch.entrepreneur} on ${pitch.dateSubmitted}`, 14, 44);

        const detailsData = [
            ["Age", pitch.age],
            ["Email", pitch.email],
            ["Phone", pitch.phone],
            ["Institution", pitch.institution],
            ["Course", pitch.course],
            ["Industry", pitch.industry],
            ["Stage", pitch.businessStage],
            ["Team Size", `${pitch.teamSize} Member(s)`],
            ["Status", pitch.status],
            ["Receipt Codes", pitch.receiptCodes]
        ];

        autoTable(doc, {
            head: [['Field', 'Information']],
            body: detailsData,
            startY: 50,
            theme: 'striped',
            headStyles: { fillStyle: '#D95B24' }
        });

        let finalY = doc.lastAutoTable.finalY + 15;

        const sections = [
            { title: "Business Concept", content: pitch.description },
            { title: "Problem Statement", content: pitch.problemStatement },
            { title: "Customer Profile", content: pitch.customerProfile },
            { title: "Competitors", content: pitch.competitors },
            { title: "Capital Breakdown", content: pitch.capitalRequired },
            { title: "Acquisition Channels", content: pitch.acquisitionChannels },
            { title: "Team Qualification", content: pitch.teamQualification }
        ];

        sections.forEach(section => {
            if (finalY > 250) {
                doc.addPage();
                finalY = 20;
            }
            doc.setFontSize(14);
            doc.setTextColor(217, 91, 36); // #D95B24
            doc.text(section.title, 14, finalY);
            finalY += 7;
            doc.setFontSize(10);
            doc.setTextColor(50);

            if (section.title === "Acquisition Channels" && section.content) {
                // Split by common delimiters if present
                const channels = section.content.split(/[,\n]/).map(c => c.trim()).filter(c => c);
                if (channels.length > 1) {
                    channels.forEach(channel => {
                        if (finalY > 280) {
                            doc.addPage();
                            finalY = 20;
                        }
                        doc.text(`• ${channel}`, 18, finalY);
                        finalY += 6;
                    });
                    finalY += 4;
                } else {
                    const splitText = doc.splitTextToSize(section.content, 180);
                    doc.text(splitText, 14, finalY);
                    finalY += (splitText.length * 5) + 10;
                }
            } else {
                const splitText = doc.splitTextToSize(section.content || 'N/A', 180);
                doc.text(splitText, 14, finalY);
                finalY += (splitText.length * 5) + 10;
            }
        });

        // Add National ID Image on a separate page at the end
        if (pitch.nationalIdUrl) {
            try {
                const imgData = await getBase64ImageFromURL(pitch.nationalIdUrl);

                doc.addPage();
                doc.setFontSize(18);
                doc.setTextColor(217, 91, 36);
                doc.text("National Identification Document", 14, 25);

                // Get format from data URL
                const formatMatch = imgData.match(/^data:image\/(\w+);base64/);
                const format = formatMatch ? formatMatch[1].toUpperCase() : 'PNG';
                const validFormat = ['PNG', 'JPEG', 'JPG'].includes(format) ? format : 'PNG';

                // Max width/height for image in PDF (A4 is approx 210x297mm)
                const maxWidth = 180;
                const maxHeight = 240;

                // Add the image centered as much as possible
                doc.addImage(imgData, validFormat, 14, 35, maxWidth, maxHeight, undefined, 'FAST', 0);
            } catch (e) {
                console.error("Could not add image to PDF:", e);
                // If it fails, we at least have the text content already generated
            }
        }

        doc.save(`Pitch_${pitch.id}.pdf`);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Business Pitches</h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">Review and manage submitted business proposals.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search pitches..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D95B24] focus:border-transparent w-full sm:w-64"
                        />
                    </div>
                    <button
                        onClick={exportToExcel}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm justify-center"
                    >
                        <FileSpreadsheet size={18} />
                        <span className="hidden sm:inline">Export Excel</span>
                    </button>
                    <button
                        onClick={exportToPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm justify-center"
                    >
                        <FileText size={18} />
                        <span className="hidden sm:inline">Export PDF</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-sm border border-gray-100">
                    <Loader2 className="h-10 w-10 text-[#D95B24] animate-spin mb-4" />
                    <p className="text-gray-500 font-medium">Loading business pitches...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] bg-red-50 rounded-xl p-8 border border-red-100 shadow-sm">
                    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to load pitches</h3>
                    <p className="text-red-600 text-center max-w-md mb-6">{error}</p>
                    <button
                        onClick={fetchPitches}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-sm"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    {/* Table Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-xs sm:text-sm uppercase tracking-wider">
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold">Pitch ID</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold">Business Name</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold hidden md:table-cell">Entrepreneur</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold hidden lg:table-cell">Industry</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-center">Status</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold hidden sm:table-cell">Date</th>
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredPitches.length > 0 ? (
                                        filteredPitches.slice(0, visibleCount).map((pitch) => (
                                            <tr key={pitch.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">{pitch.id}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 font-semibold">{pitch.businessName}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden md:table-cell">{pitch.entrepreneur}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden lg:table-cell">{pitch.industry}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(pitch.status)}`}>
                                                        {pitch.status}
                                                    </span>
                                                </td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden sm:table-cell">{pitch.dateSubmitted}</td>
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => handleViewClick(pitch)}
                                                            className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-[#D95B24] hover:text-white transition-all duration-200 group"
                                                            title="View Details"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => exportSinglePitchToExcel(pitch)}
                                                            className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200 group"
                                                            title="Download Excel"
                                                        >
                                                            <FileSpreadsheet size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => exportSinglePitchToPDF(pitch)}
                                                            className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 group"
                                                            title="Download PDF"
                                                        >
                                                            <FileText size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => deletePitch(pitch.dbId)}
                                                            className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 group"
                                                            title="Delete Pitch"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-10 text-center text-gray-500 font-medium">
                                                No pitches found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination / Load More */}
                        <div className="px-6 py-6 border-t border-gray-100 bg-gray-50/30 flex justify-center">
                            {visibleCount < pitches.length ? (
                                <button
                                    onClick={() => setVisibleCount(pitches.length)}
                                    className="px-6 py-2.5 bg-white border border-gray-200 text-[#D95B24] font-bold rounded-xl hover:bg-[#D95B24] hover:text-white transition-all duration-300 shadow-sm"
                                >
                                    View All Pitches ({pitches.length})
                                </button>
                            ) : pitches.length > 5 && (
                                <button
                                    onClick={() => setVisibleCount(5)}
                                    className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-sm"
                                >
                                    Show Less
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Pitch Details Modal */}
            {isModalOpen && selectedPitch && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
                    <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100 flex justify-between items-center z-10">
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
                        <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">

                            {/* Section: Entrepreneur Profile */}
                            <section>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="h-px w-8 bg-gray-200"></span>
                                    Entrepreneur Profile
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100 mb-6">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 font-semibold">Age</p>
                                        <p className="text-base text-gray-900 font-medium">{selectedPitch.age}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 font-semibold">Phone</p>
                                        <p className="text-base text-gray-900 font-medium">{selectedPitch.phone}</p>
                                    </div>
                                    <div className="space-y-1 lg:col-span-1">
                                        <p className="text-xs text-gray-500 font-semibold">Email</p>
                                        <a href={`mailto:${selectedPitch.email}`} className="text-base text-[#D95B24] hover:underline font-medium truncate block">
                                            {selectedPitch.email}
                                        </a>
                                    </div>
                                    <div className="space-y-1 sm:col-span-2 lg:col-span-2">
                                        <p className="text-xs text-gray-500 font-semibold">Institution</p>
                                        <p className="text-base text-gray-900 font-medium">{selectedPitch.institution}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 font-semibold">Course</p>
                                        <p className="text-base text-gray-900 font-medium">{selectedPitch.course}</p>
                                    </div>
                                </div>

                                {/* Identification Document */}
                                {selectedPitch.nationalIdUrl && (
                                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                        <h4 className="text-xs font-bold text-[#D95B24] uppercase mb-3 flex items-center gap-2">
                                            <AlertCircle size={14} className="opacity-70" />
                                            National ID / Identification
                                        </h4>
                                        <div className="relative group overflow-hidden rounded-xl border border-gray-100 bg-gray-50 min-h-[220px] flex items-center justify-center">
                                            <img
                                                src={selectedPitch.nationalIdUrl}
                                                alt="National ID"
                                                className="w-full h-auto max-h-[400px] object-contain hover:scale-[1.02] transition-transform duration-500 z-10"
                                                onLoad={(e) => {
                                                    e.target.style.opacity = 1;
                                                }}
                                                onError={(e) => {
                                                    e.target.onerror = null; // Prevent infinite loops
                                                    e.target.src = 'https://via.placeholder.com/800x600?text=Identification+Image+Not+Available';
                                                    e.target.classList.add('opacity-50', 'grayscale');
                                                }}
                                            />

                                            {/* Full Resolution Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex items-end justify-between">
                                                <div className="text-white">
                                                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Verification Doc</p>
                                                    <p className="text-xs font-semibold">National Identification</p>
                                                </div>
                                                <a
                                                    href={selectedPitch.nationalIdUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 bg-white text-gray-900 px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-xl hover:bg-[#D95B24] hover:text-white transition-colors"
                                                >
                                                    <Eye size={12} />
                                                    View Full Resolution
                                                </a>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 shrink-0"></div>
                                            <p className="text-[10px] text-gray-400 italic">This document is encrypted and stored securely for identity verification purposes only.</p>
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Section: Business Logic */}
                            <section className="space-y-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="h-px w-8 bg-gray-200"></span>
                                    Business Proposal
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-[#D95B24]/5 p-4 rounded-xl border border-[#D95B24]/10">
                                        <p className="text-[10px] text-[#D95B24] uppercase font-bold mb-2">Update Status</p>
                                        <div className="relative">
                                            <select
                                                value={selectedPitch.status}
                                                onChange={(e) => updatePitchStatus(selectedPitch.dbId, e.target.value)}
                                                disabled={updatingStatus}
                                                className="w-full appearance-none text-sm font-bold text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D95B24]/30 focus:border-[#D95B24] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Reviewed">Reviewed</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                {updatingStatus ? (
                                                    <Loader2 size={14} className="animate-spin text-[#D95B24]" />
                                                ) : (
                                                    <ChevronDown size={14} className="text-gray-400" />
                                                )}
                                            </div>
                                        </div>
                                        {statusMessage && (
                                            <p className={`text-[11px] mt-1.5 font-medium ${statusMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {statusMessage.type === 'success' && <CheckCircle2 size={12} className="inline mr-1 -mt-0.5" />}
                                                {statusMessage.text}
                                            </p>
                                        )}
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Stage</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedPitch.businessStage}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Team Size</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedPitch.teamSize} Member(s)</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                        <h4 className="text-xs font-bold text-[#D95B24] uppercase mb-2">The Concept</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">{selectedPitch.description}</p>
                                    </div>

                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                        <h4 className="text-xs font-bold text-[#D95B24] uppercase mb-2">Problem Statement</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">{selectedPitch.problemStatement}</p>
                                    </div>

                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                        <h4 className="text-xs font-bold text-[#D95B24] uppercase mb-2">Customer Profile</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">{selectedPitch.customerProfile}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Market & Financials */}
                            <section className="space-y-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="h-px w-8 bg-gray-200"></span>
                                    Market & Investment
                                </h3>

                                <div className="space-y-6">
                                    <div className="bg-indigo-50/30 p-5 rounded-2xl border border-indigo-100">
                                        <h4 className="text-xs font-bold text-indigo-600 uppercase mb-2">Competitors</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">{selectedPitch.competitors}</p>
                                    </div>

                                    <div className="bg-green-50/30 p-5 rounded-2xl border border-green-100">
                                        <h4 className="text-xs font-bold text-green-600 uppercase mb-2">Capital Breakdown</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">{selectedPitch.capitalRequired}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Execution strategy */}
                            <section className="space-y-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="h-px w-8 bg-gray-200"></span>
                                    Execution Strategy
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50/30">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Acquisition Channels</h4>
                                        <p className="text-sm text-gray-700">{selectedPitch.acquisitionChannels}</p>
                                    </div>
                                    <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50/30">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Team Qualification</h4>
                                        <p className="text-sm text-gray-700">{selectedPitch.teamQualification}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Metadata */}
                            <div className="pt-6 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                <span>Receipt: {selectedPitch.receiptCodes}</span>
                                <span>ID: {selectedPitch.id}</span>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-gray-50 px-4 sm:px-8 py-4 sm:py-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-3 rounded-b-2xl">
                            <button
                                onClick={() => deletePitch(selectedPitch.dbId)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all duration-200 border border-red-200"
                            >
                                <Trash2 size={18} />
                                Delete
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => exportSinglePitchToExcel(selectedPitch)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                                >
                                    <FileSpreadsheet size={18} />
                                    Download Excel
                                </button>
                                <button
                                    onClick={() => exportSinglePitchToPDF(selectedPitch)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                                >
                                    <FileText size={18} />
                                    Download PDF
                                </button>
                                <a
                                    href={`tel:${selectedPitch.phone}`}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-green-50 text-green-700 font-bold rounded-xl hover:bg-green-100 hover:shadow-md transition-all duration-200 border border-green-200"
                                >
                                    <Phone size={18} />
                                    Call
                                </a>
                                <a
                                    href={`mailto:${selectedPitch.email}`}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#D95B24] text-white font-bold rounded-xl hover:bg-[#c04b1f] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <Mail size={18} />
                                    Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardBusinessPitches;
