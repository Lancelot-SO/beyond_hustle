/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import emailjs from "@emailjs/browser";
import hustle from "../assets/about/hustle.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE = "https://boahemaa-be.artfricastudio.com";
const REGISTER_PATH = "/files/register";
const LINKS_PATH = "/files/links";

const PaystackForm = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [amount] = useState("0.50"); // display value
    const [loading, setLoading] = useState(false);

    // --- Helpers: Extract File ID and Token ---
    const extractFileId = (obj) => {
        if (!obj) return undefined;
        return (
            obj.id ??
            obj.file_id ??
            obj.fileId ??
            obj.data?.id ??
            obj.data?.file_id ??
            obj.data?.fileId ??
            obj.result?.id ??
            obj.result?.file_id
        );
    };

    const extractTokenOrUrl = (obj) => {
        if (!obj) return {};
        const token =
            obj.token ??
            obj.data?.token ??
            obj.result?.token ??
            obj.linkToken ??
            obj.download_token;
        const url =
            obj.url ??
            obj.download_url ??
            obj.data?.url ??
            obj.data?.download_url ??
            obj.downloadUrl ??
            obj.link ??
            obj.data?.link;
        return { token, url };
    };

    // --- File Registration (cache id in localStorage) ---
    const registerFileOnce = async () => {
        const cached = localStorage.getItem("workbook_file_id");
        if (cached) return cached;

        const payload = { path: "workbook.pdf", name: "workbook.pdf" };

        const res = await fetch(`${BASE}${REGISTER_PATH}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const json = await res.json().catch(() => null);
        console.log("register response:", res.status, json);

        if (!res.ok) {
            const text = json ?? (await res.text().catch(() => "no-body"));
            throw new Error(`Register failed: ${res.status} ${JSON.stringify(text)}`);
        }

        const fileId = extractFileId(json);
        if (!fileId) throw new Error("No file id found in register response");

        localStorage.setItem("workbook_file_id", String(fileId));
        return fileId;
    };

    // --- Create secure download link ---
    const createLinkForFile = async (fileId) => {
        const res = await fetch(`${BASE}${LINKS_PATH}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file_id: fileId }),
        });

        const json = await res.json().catch(() => null);
        console.log("create link response:", res.status, json);

        if (!res.ok) {
            const text = json ?? (await res.text().catch(() => "no-body"));
            throw new Error(`Create link failed: ${res.status} ${JSON.stringify(text)}`);
        }

        const { token, url } = extractTokenOrUrl(json);

        if (!token && !url) throw new Error("No token or url returned from link creation");

        // Always prepend BASE no matter what
        if (token) return `${BASE}/files/download/${token}`;

        return url.startsWith("http") ? url : `${BASE}${url}`;
    };

    // --- Handle Paystack flow ---
    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);

        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: "pk_live_aad13529938aed530bd3b49a813cd2b16a4b9cc7",
            amount: 50, // pesewas (0.50 GHS)
            email,
            phone: mobile,
            firstName: first_name,
            lastName: last_name,
            onSuccess: async (transaction) => {
                try {
                    // 1. Register file (or fetch cached id)
                    const fileId = await registerFileOnce();

                    // 2. Create secure link with token
                    const downloadLink = await createLinkForFile(fileId);

                    // 3. Notify admin (NO link shared)
                    emailjs
                        .send(
                            "service_5ht8tnz",
                            "template_q3xk0wn",
                            {
                                first_name,
                                last_name,
                                email,
                                mobile,
                                address,
                                amount,
                                reference: transaction.reference,
                            },
                            "qSj6aEZypD-snH-28"
                        )
                        .catch((err) => console.error("Admin EmailJS Error:", err));

                    // 4. Send customer email WITH link
                    emailjs
                        .send(
                            "service_qbm994w",
                            "template_5pgxpeh",
                            {
                                download_link: downloadLink,
                                download_button: `<a href="${downloadLink}" target="_blank" style="background:#D95B24;color:#fff;padding:10px 16px;text-decoration:none;border-radius:6px;">Download Workbook</a>`,
                                customer_email: email,
                            },
                            "4P5dgekPUp0iljE8X"
                        )
                        .then(() => {
                            toast.success("Payment successful! Secure download link sent to your email.");
                        })
                        .catch((err) => {
                            console.error("Customer EmailJS Error:", err);
                            toast.error("Payment succeeded but sending email failed.");
                        });
                } catch (err) {
                    console.error("Download link generation error:", err);
                    toast.error("Payment succeeded, but failed to generate download link.");
                } finally {
                    setLoading(false);
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setMobile("");
                    setAddress("");
                }
            },
            onCancel: () => {
                setLoading(false);
                toast.error("Transaction was cancelled.");
            },
        });
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-gray-100 mt-[70px]">
            <div className="hidden md:flex flex-col items-center justify-center bg-[#1C2237]">
                <h2 className="text-3xl font-bold font-openSans mb-6 text-center text-[#D95B24]">
                    Make Payment for your workbook.
                </h2>
                <img src={hustle} alt="Pay with Paystack" className="max-w-md w-full object-contain p-6" />
            </div>

            <div className="flex items-center justify-center p-8 bg-white shadow-lg">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold font-openSans mb-6 text-center text-[#D95B24]">
                        Kindly fill in your details
                    </h2>
                    <form onSubmit={handlePayment} className="space-y-4">
                        <ToastContainer position="top-center" />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">First Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D95B24]"
                                    placeholder="Enter first name"
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D95B24]"
                                    placeholder="Enter last name"
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D95B24]"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Mobile Number</label>
                            <input
                                type="tel"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D95B24]"
                                placeholder="Enter your mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Address</label>
                            <textarea
                                className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-[#D95B24]"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Amount</label>
                            <p className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">
                                GHS {amount} (fixed)
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#D95B24] text-white py-3 rounded-lg hover:bg-[#D95B24]/80 transition shadow-md disabled:opacity-60"
                        >
                            {loading ? "Processing..." : `Pay Now (GHS ${amount})`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaystackForm;
