/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import PropTypes from "prop-types"
import { X } from "lucide-react" // for close icon

export default function RegistrationModal({ open, onOpenChange }) {
    const [formData, setFormData] = useState({
        surname: "",
        firstname: "",
        phone: "",
        email: "",
        age: "",
        gender: "",
        socialMedia: "",
        address: "",
        education: "",
        otherEducation: "",
        areaOfStudy: "",
        coachingTraining: "",
        startedBusiness: "",
        managedBusiness: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Registration submitted:", formData)
        onOpenChange(false)
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    if (!open) return null // hide modal if not open

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => onOpenChange(false)} // close when clicking outside
        >
            <div
                className="bg-white shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
                onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="mb-6 pr-8">
                    <h2 className="text-2xl font-bold text-[#D95B24]">
                        Register for Business Coaching Program
                    </h2>
                    <p className="text-gray-600">
                        Join our 4-week entrepreneurship coaching program and start earning over GHS10K monthly
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="border rounded-lg p-4 space-y-4">
                        <h3 className="font-semibold text-lg">Personal Information</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="font-medium">Surname *</label>
                                <input
                                    value={formData.surname}
                                    onChange={(e) => handleInputChange("surname", e.target.value)}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-medium">First Name *</label>
                                <input
                                    value={formData.firstname}
                                    onChange={(e) => handleInputChange("firstname", e.target.value)}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">Contact Number *</label>
                            <input
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">Email Address *</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="font-medium">Age *</label>
                                <select
                                    value={formData.age}
                                    onChange={(e) => handleInputChange("age", e.target.value)}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="">Select</option>
                                    <option value="below20">Below 20</option>
                                    <option value="21-40">21-40</option>
                                    <option value="above40">Above 40</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="font-medium">Gender *</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => handleInputChange("gender", e.target.value)}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">Social Media Handles</label>
                            <input
                                value={formData.socialMedia}
                                onChange={(e) => handleInputChange("socialMedia", e.target.value)}
                                placeholder="@example"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">Residential Address *</label>
                            <input
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    {/* Educational Background */}
                    <div className="border rounded-lg p-4 space-y-4">
                        <h3 className="font-semibold text-lg">Educational Background</h3>
                        <div className="space-y-2">
                            <label className="font-medium">Educational Level *</label>
                            <div className="space-y-2">
                                {["Diploma", "Graduate", "Post Graduate", "Other"].map((level) => (
                                    <label key={level} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="education"
                                            value={level}
                                            checked={formData.education === level}
                                            onChange={(e) => handleInputChange("education", e.target.value)}
                                            required
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                            {formData.education === "Other" && (
                                <input
                                    type="text"
                                    placeholder="Specify"
                                    value={formData.otherEducation}
                                    onChange={(e) => handleInputChange("otherEducation", e.target.value)}
                                    className="w-full border rounded px-3 py-2 mt-2"
                                />
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">Area of Study *</label>
                            <input
                                value={formData.areaOfStudy}
                                onChange={(e) => handleInputChange("areaOfStudy", e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    {/* Business Background */}
                    <div className="border rounded-lg p-4 space-y-4">
                        <h3 className="font-semibold text-lg">Business Background</h3>

                        <div className="space-y-2">
                            <label className="font-medium">Have you received any coaching training prior? *</label>
                            <select
                                value={formData.coachingTraining}
                                onChange={(e) => handleInputChange("coachingTraining", e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">Have you ever started a business? *</label>
                            <select
                                value={formData.startedBusiness}
                                onChange={(e) => handleInputChange("startedBusiness", e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium">Have you ever managed a business? *</label>
                            <select
                                value={formData.managedBusiness}
                                onChange={(e) => handleInputChange("managedBusiness", e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 border rounded px-4 py-2 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-[#D95B24] text-white rounded px-4 py-2 hover:bg-[#A34115]"
                        >
                            Submit Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

RegistrationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
}
