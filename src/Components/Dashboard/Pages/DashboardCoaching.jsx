import { useState, useEffect, useCallback } from 'react';
import { Loader2, AlertCircle, CheckCircle2, Save, ExternalLink } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { cmsGetCoaching, cmsUpdateCoaching } from '../../../lib/cmsClient';

const FIELDS = [
    { name: 'headline', label: 'Hero Headline', placeholder: 'EARN EXTRA INCOME OF OVER GHS10K A MONTH!' },
    { name: 'registration_fee', label: 'Registration Fee', placeholder: 'GHS 250' },
    { name: 'tuition_fee', label: 'Tuition Fee', placeholder: 'GHS 2,500' },
    { name: 'cohort_label', label: 'Next Cohort', placeholder: 'Next Cohort Begins Sept 17, 2025' },
    { name: 'tuition_mode', label: 'Mode of Tuition', placeholder: 'Hybrid (Virtual & In-Person)' },
    { name: 'contact_phone', label: 'Contact Phone (Call / WhatsApp)', placeholder: '0244978933' },
];

const DashboardCoaching = () => {
    const { token } = useAuth();
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    const load = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const data = await cmsGetCoaching(token);
            const initial = {};
            FIELDS.forEach((field) => { initial[field.name] = data?.[field.name] ?? ''; });
            setValues(initial);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => { load(); }, [load]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setMessage(null);
        try {
            await cmsUpdateCoaching(token, values);
            setMessage({ type: 'success', text: 'Coaching program details updated. Changes are live on the website.' });
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(null), 4000);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-sm border border-gray-100">
                <Loader2 className="h-10 w-10 text-[#D95B24] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading coaching settings...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-red-50 rounded-xl p-8 border border-red-100">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to load settings</h3>
                <p className="text-red-600 text-center max-w-md mb-6">{error}</p>
                <button
                    onClick={load}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Coaching Program</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    Update the fees, cohort date and contact details shown on the public Coaching page.
                </p>
                <a
                    href="/coaching"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-[#D95B24] hover:underline"
                >
                    <ExternalLink size={14} />
                    View this section on the website
                </a>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 max-w-3xl space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {FIELDS.map((field) => (
                        <div key={field.name} className={field.name === 'headline' ? 'sm:col-span-2' : ''}>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                {field.label}
                            </label>
                            <input
                                type="text"
                                value={values[field.name] ?? ''}
                                placeholder={field.placeholder}
                                onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D95B24] focus:border-transparent text-sm"
                            />
                        </div>
                    ))}
                </div>

                {message && (
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border ${message.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                        }`}>
                        {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        {message.text}
                    </div>
                )}

                <div className="flex justify-end pt-2 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#D95B24] text-white font-bold rounded-xl hover:bg-[#c04b1f] transition-colors disabled:opacity-60"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DashboardCoaching;
