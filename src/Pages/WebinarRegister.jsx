// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaRegShareSquare } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WebinarRegister = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // VALIDATION FUNCTIONS
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phoneNumber) => /^(\+?\d{10,15})$/.test(phoneNumber);

    // SUBMIT HANDLER WITH REAL API + TOASTS + ERROR DETAIL
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            toast.error("Invalid email format");
            return;
        }

        if (!validatePhone(formData.phoneNumber)) {
            toast.error("Phone number must be 10–15 digits (e.g., +233501234567)");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "https://api.drboahemaantim.com/api/webinar-registrations",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                const errorMsg = data?.message || "Failed to register";
                throw new Error(errorMsg);
            }

            toast.success("🎉 Registration successful!");

            // Clear form
            setFormData({
                fullName: "",
                email: "",
                phoneNumber: "",
                message: "",
            });

        } catch (error) {
            console.error("Error:", error);
            toast.error(`❌ ${error.message || "Something went wrong"}`);
        } finally {
            setLoading(false);
        }
    };

    // SHARE HANDLER
    const handleShare = async () => {
        const shareData = {
            title: "Business Masterminds Webinar",
            text: "Join this powerful free business webinar!",
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Share cancelled", err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied! Share it with your friends.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#03172E] to-[#040E1D] text-white p-6 flex justify-center items-center">
            <ToastContainer position="top-center" />
            <div className="w-full max-w-xl bg-[#07203A] p-8 rounded-xl shadow-lg border border-[#1C3554] my-16">

                <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
                    Discover the power of <span className="text-[#D95B24]">business masterminds!</span>
                </h1>

                <p className="text-center text-sm mt-3 text-gray-300">
                    Turn your business dreams into reality and create multiple streams of income.
                </p>

                <p className="text-center text-sm mt-2 text-[#D95B24] font-semibold">
                    Zoom Link will be sent to your email a few days before the webinar.
                </p>

                <div className="mt-6 text-center bg-[#0087AB]/20 p-3 rounded-lg border border-[#00E8FF]/30">
                    <p className="font-semibold text-[#D95B24]">EXCLUSIVE FREE WEBINAR</p>
                    <p className="mt-1">Friday • 5th December • 11am</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    {/* NAME */}
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

                    {/* EMAIL */}
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

                    {/* PHONE */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter phone number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded border border-gray-600 bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* MESSAGE */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">What do you hope to learn?</label>
                        <textarea
                            name="message"
                            rows="3"
                            placeholder="What you hope to learn..."
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded border border-gray-600 bg-transparent focus:outline-none"
                        ></textarea>
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gradient-to-r from-[#FF9E9E] to-[#FFD5A5] text-black font-semibold py-3 rounded-md transition ${loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
                            }`}
                    >
                        {loading ? "Submitting..." : "Click to Register"}
                    </button>

                    {/* SHARE */}
                    <button
                        type="button"
                        onClick={handleShare}
                        className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition mt-2 flex items-center justify-center gap-4"
                    >
                        Share with Friends
                        <FaRegShareSquare size={20} className="inline-block ml-2" />
                    </button>

                </form>
            </div >
        </div >
    );
};

export default WebinarRegister;
