/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import application from "../assets/application.jpeg";

const Application = () => {
    const [teamRange, setTeamRange] = useState("");
    const [receiptCount, setReceiptCount] = useState(1);
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

    const addReceiptField = () => setReceiptCount((p) => p + 1);
    const removeReceiptField = () =>
        receiptCount > 1 && setReceiptCount((p) => p - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const formData = new FormData(e.target);

        const receipts = [];
        for (let i = 1; i <= receiptCount; i++) {
            const value = formData.get(`receipt_codes_${i}`);
            if (!value || value.length !== 11) {
                setError("Each receipt code must be exactly 11 characters.");
                setLoading(false);
                return;
            }
            receipts.push(value);
            formData.delete(`receipt_codes_${i}`);
        }

        const count = receipts.length;

        if (teamRange === "single" && count !== 1) {
            setError("You selected 1 team member. Only 1 receipt code is allowed.");
            setLoading(false);
            return;
        }

        if (teamRange === "range" && (count < 2 || count > 5)) {
            setError("For 2–5 team members, receipt codes must be between 2 and 5.");
            setLoading(false);
            return;
        }

        if (teamRange === "large" && count < 6) {
            setError("For 6+ team members, at least 6 receipt codes are required.");
            setLoading(false);
            return;
        }

        receipts.forEach((code) => formData.append("receipt_codes[]", code));
        formData.set("team", count);

        const file = formData.get("national_id");
        if (file && file.size > 5 * 1024 * 1024) {
            setError("National ID must not exceed 5MB.");
            setLoading(false);
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
            setReceiptCount(1);
            setTeamRange("");
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

                    {/* STEP 1: Applicant Info + Team + Receipts */}
                    {step === 1 && (
                        <>
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
                                    <input name="phone" required className={input} />
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
                                    <option>Manufucturing</option>
                                    <option>Maritime & Transport</option>
                                    <option>Education</option>
                                    <option>Infrastructure & Construction</option>



                                </select>
                            </div>

                            {/* TEAM + RECEIPTS */}
                            <div className="space-y-2">
                                <label className={label}>Number of Team Members {required}</label>

                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="team_option"
                                        required
                                        onChange={() => {
                                            setTeamRange("single");
                                            setReceiptCount(1);
                                        }}
                                    />
                                    1 Member
                                </label>

                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="team_option"
                                        onChange={() => {
                                            setTeamRange("range");
                                            setReceiptCount(2);
                                        }}
                                    />
                                    2–5 Members
                                </label>

                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="team_option"
                                        onChange={() => {
                                            setTeamRange("large");
                                            setReceiptCount(6);
                                        }}
                                    />
                                    6+ Members
                                </label>
                            </div>

                            {teamRange && (
                                <div className="space-y-3">
                                    <label className={label}>Receipt Code(s) {required}</label>

                                    {Array.from({ length: receiptCount }).map((_, i) => (
                                        <div key={i} className="flex gap-2">
                                            <input
                                                name={`receipt_codes_${i + 1}`}
                                                maxLength={11}
                                                required
                                                placeholder={`Receipt Code ${i + 1}`}
                                                className={input}
                                            />
                                            {teamRange !== "single" && (
                                                <button
                                                    type="button"
                                                    onClick={removeReceiptField}
                                                    className="text-red-500 text-sm font-medium"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    {teamRange !== "single" && (
                                        <button
                                            type="button"
                                            onClick={addReceiptField}
                                            className="text-[#D95B24] text-sm font-semibold"
                                        >
                                            + Add another receipt
                                        </button>
                                    )}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="w-full bg-[#D95B24] text-white py-3 rounded-xl font-semibold"
                            >
                                Next
                            </button>
                        </>
                    )}

                    {/* STEP 2: Business Fields + Submit */}
                    {step === 2 && (
                        <>
                            <div>
                                <label className={label}> In 150 words or less, describe your business idea {required}</label>
                                <textarea name="business_description" required className={textarea} />
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
                                <label className={label}> Define the specific problem or market gap you are addressing. Why is this a critical issue that needs solving right now? {required}</label>
                                <textarea name="problem_statement" required className={textarea} />
                            </div>

                            <div>
                                <label className={label}>Describe your Ideal Customer Profile. Include demographics, behaviors, and the estimated size of your potential customers.  {required}</label>
                                <textarea name="customer_profile" required className={textarea} />
                            </div>

                            <div>
                                <label className={label}>currently solving this problem in your absence? {required}</label>
                                <textarea name="competitors" required className={textarea} />
                            </div>

                            <div>
                                <label className={label}>Why will customers choose you over existing or future alternatives? {required}</label>
                                <textarea name="capital_required" required className={textarea} />
                            </div>

                            <div>
                                <label className={label}>How much capital is required to start of fund your business? Breakdown how these funds will be used.
                                    {required}</label>
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
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Application;
