import React from 'react';

const DashboardProfile = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center gap-6 mb-8">
                    <div className="h-24 w-24 rounded-full bg-[#D95B24] flex items-center justify-center text-white font-bold text-4xl shadow-md">
                        D
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Dr. Boahemaa</h2>
                        <p className="text-gray-500">Administrator</p>
                        <p className="text-gray-500">admin@beyondhustle.com</p>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input type="text" defaultValue="Dr" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D95B24] focus:outline-none bg-gray-50 from-neutral-300" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input type="text" defaultValue="Boahemaa" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D95B24] focus:outline-none bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" defaultValue="admin@beyondhustle.com" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D95B24] focus:outline-none bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <input type="text" defaultValue="Administrator" disabled className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button type="button" className="px-6 py-2 bg-[#D95B24] text-white rounded-lg hover:bg-[#D95B24]/90 transition shadow-md">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DashboardProfile;
