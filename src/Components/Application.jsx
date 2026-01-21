/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import application from "../assets/application.jpeg";

const Application = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-[150px] md:mt-[80px] lg:mt-[100px]">

            {/* Left Image Section */}
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden md:block h-full w-full"
            >
                <img
                    src={application}
                    alt="Application visual"
                    className="h-full w-full object-cover object-center"
                />
            </motion.div>

            {/* Right Form Section */}
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="flex items-center justify-center bg-gray-50 px-6 py-12"
            >
                <motion.form
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-5"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Applicant Information
                    </h2>

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            className="mt-1 w-full rounded-lg border-gray-300 py-2 px-2 border-2 focus:border-[#D95B24] focus:ring-[#D95B24]"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Age <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="age"
                            className="mt-1 w-full rounded-lg border-gray-300 border-2 py-2 px-2 focus:border-[#D95B24] focus:ring-[#D95B24]"
                            placeholder="Your age"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 w-full rounded-lg border-gray-300 border-2 py-2 px-2 focus:border-[#D95B24] focus:ring-[#D95B24]"
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            className="mt-1 w-full rounded-lg border-gray-300 border-2 py-2 px-2 focus:border-[#D95B24] focus:ring-[#D95B24]"
                            placeholder="+233..."
                            required
                        />
                    </div>

                    {/* Upload ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Upload National ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            name="national_id"
                            className="mt-1 w-full text-sm text-gray-600
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:bg-orange-50 file:text-[#D95B24]
                            hover:file:bg-orange-100"
                            required
                        />
                    </div>

                    {/* Institution */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Institution of Study
                        </label>
                        <input
                            type="text"
                            name="institution"
                            placeholder="e.g., KNUST"
                            className="mt-1 w-full rounded-lg border-gray-300 border-2 py-2 px-2 focus:border-[#D95B24] focus:ring-[#D95B24]"
                        />
                    </div>

                    {/* Course */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Course of Study
                        </label>
                        <input
                            type="text"
                            name="course"
                            placeholder="e.g., Computer Science"
                            className="mt-1 w-full rounded-lg border-gray-300 border-2 py-2 px-2 focus:border-[#D95B24] focus:ring-[#D95B24]"
                        />
                    </div>

                    {/* Organization */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Organization / Company
                        </label>
                        <input
                            type="text"
                            name="company"
                            placeholder="e.g., Google, Microsoft"
                            className="mt-1 w-full rounded-lg border-gray-300 border-2 py-2 px-2 focus:border-[#D95B24] focus:ring-[#D95B24]"
                        />
                    </div>

                    {/* Industry */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Business Industry <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="mt-1 w-full rounded-lg border-gray-300 border-2 py-2 px-2 focus:border-[#D95B24] focus:ring-[#D95B24]"
                            required
                            name="industry"
                        >
                            <option value="">Choose</option>
                            <option>Technology</option>
                            <option>Finance</option>
                            <option>Creative</option>
                            <option>Education</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Team Size */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Number of Team Members <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {["1", "2", "3", "4", "5", "6+"].map((num) => (
                                <label key={num} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="team"
                                        className="text-[#D95B24] focus:ring-[#D95B24]"
                                    />
                                    {num}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Receipt */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Receipt Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="receipt"
                            className="mt-1 w-full rounded-lg border-gray-300 border-2 py-2 px-2 focus:border-[#D95B24] focus:ring-[#D95B24]"
                            placeholder="Enter receipt number(s)"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-[#D95B24] text-white py-3 rounded-xl font-semibold hover:bg-[#993911] transition"
                    >
                        Next
                    </button>
                </motion.form>
            </motion.div>
        </div>
    );
};

export default Application;
