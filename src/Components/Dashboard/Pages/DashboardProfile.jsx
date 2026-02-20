import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const DashboardProfile = () => {
    const { user, token, updateUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSubmit = async () => {
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch(`https://api.drboahemaantim.com/api/dashboard/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, email })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            // Update user context and local storage
            const updatedUser = { ...user, name, email };
            updateUser(updatedUser);

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-center sm:text-left">
                    <div className="h-24 w-24 rounded-full bg-[#D95B24] flex items-center justify-center text-white font-bold text-4xl shadow-md">
                        {name ? name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                        <p className="text-gray-500">Administrator</p>
                        <p className="text-gray-500">{email}</p>
                    </div>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D95B24] focus:outline-none bg-gray-50"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D95B24] focus:outline-none bg-gray-50"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <input type="text" defaultValue="Administrator" disabled className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`px-6 py-2 bg-[#D95B24] text-white rounded-lg hover:bg-[#D95B24]/90 transition shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DashboardProfile;
