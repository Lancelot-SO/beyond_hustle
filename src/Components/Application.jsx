/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import application from "../assets/application.jpeg";

const Application = () => {
    const [teamCount, setTeamCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [step, setStep] = useState(1);

    const label = "block text-sm font-semibold text-gray-700";
    const input =
        "w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#D95B24]";
    const textarea =
        "w-full border-2 border-gray-200 rounded-lg p-3 min-h-[120px] focus:outline-none focus:border-[#D95B24]";
    const required = <span className="text-red-500">*</span>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const formData = new FormData(e.target);

        const receipts = [];
        for (let i = 1; i <= teamCount; i++) {
            const value = formData.get(`receipt_codes_${i}`);
            if (!value || value.length !== 11) {
                setError("Each receipt code must be exactly 11 characters.");
                setLoading(false);
                setStep(1); // Go back to step 1 to fix errors
                return;
            }
            receipts.push(value);
            formData.delete(`receipt_codes_${i}`);
        }

        receipts.forEach((code) => formData.append("receipt_codes[]", code));
        formData.set("team", teamCount);

        const file = formData.get("national_id");
        if (file && file.size > 5 * 1024 * 1024) {
            setError("National ID must not exceed 5MB.");
            setLoading(false);
            setStep(1);
            return;
        }

        try {
            const response = await fetch(
                "https://api.drboahemaantim.com/api/business-pitch",
                { method: "POST", body: formData }
            );

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            setSuccess(result.message || "Application submitted successfully!");
            e.target.reset();
            setTeamCount(1);
            setStep(1);
        } catch (err) {
            setError(err.message || "Submission failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-[150px]">
            <motion.div className="hidden md:block">
                <img src={application} alt="Application" className="h-full w-full" />
            </motion.div>

            <div className="flex justify-center bg-gray-50 px-6 py-12">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 space-y-6"
                >
                    {/* Progress */}
                    <div className="flex justify-between text-sm font-semibold text-gray-500">
                        <span className={step === 1 ? "text-[#D95B24]" : ""}>Applicant & Team</span>
                        <span className={step === 2 ? "text-[#D95B24]" : ""}>Business</span>
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-sm">{success}</p>}

                    {/* Use visibility instead of conditional rendering to keep inputs in DOM */}
                    <div className={step === 1 ? "space-y-6" : "hidden"}>
                        <div>
                            <label className={label}>Full Name {required}</label>
                            <input name="full_name" required className={input} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={label}>Age {required}</label>
                                <input type="number" name="age" required className={input} />
                            </div>
                            <div>
                                <label className={label}>Phone Number {required}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    pattern="[0-9]{10}"
                                    title="Please enter a 10-digit phone number (e.g., 0244123456)"
                                    className={input}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={label}>Email Address {required}</label>
                            <input type="email" name="email" required className={input} />
                        </div>

                        <div>
                            <label className={label}>Upload National ID {required}</label>
                            <input
                                type="file"
                                name="national_id"
                                required
                                accept=".jpg,.png,.pdf"
                                className="w-full text-sm"
                            />
                        </div>

                        <div>
                            <label className={label}>Institution</label>
                            <input name="institution" className={input} />
                        </div>

                        <div>
                            <label className={label}>Course of Study</label>
                            <input name="course" className={input} />
                        </div>

                        <div>
                            <label className={label}>Organization / Company</label>
                            <input name="company" className={input} />
                        </div>

                        <div>
                            <label className={label}>Business Industry {required}</label>
                            <select name="industry" required className={input}>
                                <option value="">Select</option>
                                <option>IT & Technology</option>
                                <option>Finance</option>
                                <option>Mining & Energy</option>
                                <option>Education</option>
                                <option>Agriculture, Food & Forestry</option>
                                <option>Manufacturing</option>
                                <option>Maritime & Transport</option>
                                <option>Infrastructure & Construction</option>
                            </select>
                        </div>

                        <div>
                            <label className={label}>Number of Team Members {required}</label>
                            <input
                                type="number"
                                name="team_count_input"
                                min="1"
                                value={teamCount}
                                onChange={(e) => setTeamCount(Math.max(1, parseInt(e.target.value) || 1))}
                                className={input}
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className={label}>Receipt Code(s) {required}</label>
                            {Array.from({ length: teamCount }).map((_, i) => (
                                <div key={i}>
                                    <input
                                        name={`receipt_codes_${i + 1}`}
                                        maxLength={11}
                                        required
                                        pattern="BTHBP[0-9]{6}"
                                        title="Please enter a valid receipt code starting with BTHBP followed by 6 digits (e.g., BTHBP123456)"
                                        placeholder={`Receipt Code ${i + 1}`}
                                        className={input}
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                const step1Inputs = e.currentTarget.closest('.space-y-6').querySelectorAll('input, select');
                                let isValid = true;
                                step1Inputs.forEach(input => {
                                    if (!input.checkValidity()) {
                                        input.reportValidity();
                                        isValid = false;
                                    }
                                });
                                if (isValid) setStep(2);
                            }}
                            className="w-full bg-[#D95B24] text-white py-3 rounded-xl font-semibold"
                        >
                            Next
                        </button>
                    </div>

                    <div className={step === 2 ? "space-y-6" : "hidden"}>
                        <div>
                            <label className={label}>In 150 words or less, describe your business idea {required}</label>
                            <textarea name="business_description" className={textarea} />
                        </div>

                        <div>
                            <label className={label}>What stage is your business currently at? {required}</label>
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="business_stage" value="n/a" required />
                                    n/a
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="business_stage" value="Ideation" required />
                                    Ideation
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="business_stage" value="Pilot" required />
                                    Pilot
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="business_stage" value="Fully Operational" required />
                                    Fully Operational
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="business_stage" value="Other" required />
                                    Other
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className={label}>Define the specific problem or market gap you are addressing. Why is this a critical issue that needs solving right now? {required}</label>
                            <textarea name="problem_statement" required className={textarea} />
                        </div>

                        <div>
                            <label className={label}>Describe your Ideal Customer Profile. Include demographics, behaviors, and the estimated size of your potential customers. {required}</label>
                            <textarea name="customer_profile" required className={textarea} />
                        </div>

                        <div>
                            <label className={label}>Who is currently solving this problem in your absence? {required}</label>
                            <textarea name="competitors" required className={textarea} />
                        </div>

                        <div>
                            <label className={label}>Why will customers choose you over existing or future alternatives? {required}</label>
                            <textarea name="capital_required" required className={textarea} />
                        </div>

                        <div>
                            <label className={label}>How much capital is required to start or fund your business? Breakdown how these funds will be used. {required}</label>
                            <textarea name="acquisition_channels" required className={textarea} />
                        </div>

                        <div>
                            <label className={label}>Which specific channels (digital, physical, partnerships) will you use to acquire and retain customers? {required}</label>
                            <textarea name="team_qualification" required className={textarea} />
                        </div>

                        <div>
                            <label className={label}>Why is your founding team uniquely qualified to execute this specific business model? {required}</label>
                            <textarea name="unique_team" required className={textarea} />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="ml-auto bg-[#D95B24] text-white px-6 py-2 rounded-lg"
                            >
                                {loading ? "Submitting..." : "Submit Application"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Application;
