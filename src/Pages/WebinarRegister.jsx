// WebinarRegister.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const WebinarRegister = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can connect this to an API, Google Sheet, Firebase etc.
        console.log("Form Submitted:", formData);
        alert("Thank you for registering!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#03172E] to-[#040E1D] text-white p-6 flex justify-center items-center">
            <div className="w-full max-w-xl bg-[#07203A] p-8 rounded-xl shadow-lg border border-[#1C3554] my-16">

                {/* HEADER SECTION */}
                <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
                    Discover the power of <span className="text-[#D95B24]">business masterminds!</span>
                </h1>

                <p className="text-center text-sm mt-3 text-gray-300">
                    Turn your business dreams into reality and create multiple streams of income.
                </p>

                <p className="text-center text-sm mt-2 text-[#D95B24] font-semibold">
                    Zoom Link will be sent to your email few days to the webinar after registration.
                </p>

                {/* EVENT DETAILS */}
                <div className="mt-6 text-center bg-[#0087AB]/20 p-3 rounded-lg border border-[#00E8FF]/30">
                    <p className="font-semibold text-[#D95B24]">EXCLUSIVE FREE WEBINAR</p>
                    <p className="mt-1">Friday • 5th December • 11am</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded border border-gray-600 bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded border border-gray-600 bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded border border-gray-600 bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Business Idea */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            What do you hope to learn from this webinar?
                        </label>
                        <textarea
                            name="message"
                            rows="3"
                            placeholder="What you hope to learn..."
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded border border-gray-600 bg-transparent focus:outline-none"
                        ></textarea>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#FF9E9E] to-[#FFD5A5] text-black font-semibold py-3 rounded-md hover:opacity-90 transition"
                    >
                        Click to Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WebinarRegister;
