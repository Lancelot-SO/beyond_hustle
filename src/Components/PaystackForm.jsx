/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import hustle from "../assets/about/hustle.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

/**
 * OPTION 2 (Legacy Inline, reference-only):
 * 1) POST /api/workbook-orders -> { public_key, reference, access_code, final_amount } OR { ok:true, status:'paid', download_url, expires_at }
 * 2) window.PaystackPop.setup({... ref: init.reference, access_code ...})
 * 3) POST /api/paystack/workbook/confirm -> { ok:true, status:'paid', download_url, expires_at }
 */

const API_ORDERS_URL = "https://api.drboahemaantim.com/api/workbook-orders";
const API_CONFIRM_URL = "https://api.drboahemaantim.com/api/paystack/workbook/confirm";

export default function PaystackForm({
    productId = "workbook-001",
    productTitle = "Dr. Boahemaa Ntim Workbook",
    amountPesewas = 8500, // GHS * 100
}) {
    // Form state
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [voucher, setVoucher] = useState("");

    // UI state
    const [loading, setLoading] = useState(false);
    const [paystackReady, setPaystackReady] = useState(false);

    // Refs
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const mobileRef = useRef(null);
    const addressRef = useRef(null);
    const voucherRef = useRef(null);

    const amountGHS = useMemo(() => (amountPesewas / 100).toFixed(2), [amountPesewas]);

    // Load Paystack v1 script and await readiness once
    useEffect(() => {
        const src = "https://js.paystack.co/v1/inline.js";
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
            const t = setInterval(() => {
                if (window.PaystackPop) {
                    clearInterval(t);
                    setPaystackReady(true);
                }
            }, 50);
            return () => clearInterval(t);
        }
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => setPaystackReady(true);
        s.onerror = () => {
            console.error("Failed to load Paystack inline.js");
            toast.error("Failed to load payment library. Please refresh and try again.");
        };
        document.body.appendChild(s);
    }, []);

    // Uniform fetch helper (JSON in/out)
    const fetchJSON = async (url, body) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify(body),
        });
        let data = null;
        try { data = await res.json(); } catch {
            //ignore
        }
        if (!res.ok) {
            const msg = data?.message || data?.error || `Request failed (${res.status})`;
            throw new Error(msg);
        }
        return data;
    };

    // Payload for /workbook-orders
    const buildOrderPayload = () => ({
        amount: amountPesewas, // pesewas
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        address: address.trim(),
        ...(voucher.trim() ? { voucher_code: voucher.trim() } : {}),
        // Uncomment if required by backend:
        // product_id: productId,
        // product_title: productTitle,
    });

    // API calls
    const initOrder = (payload) => fetchJSON(API_ORDERS_URL, payload);
    const confirmServer = (reference) => fetchJSON(API_CONFIRM_URL, { reference });

    // Legacy inline Paystack popup
    const openLegacyInline = ({ public_key, email, amount, reference, access_code, firstname }) =>
        new Promise((resolve, reject) => {
            if (!window.PaystackPop) return reject(new Error("Payment library not ready. Please retry."));
            const handler = window.PaystackPop.setup({
                key: public_key,
                email,
                amount: Number(amount), // pesewas
                ref: reference,         // server-generated reference
                access_code,
                currency: "GHS",
                firstname,
                callback: (resp) => resolve(resp?.reference), // callback ref (not used for confirm)
                onClose: () => reject(new Error("Payment window closed")),
            });
            handler.openIframe();
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validations
        if (!first_name.trim()) { toast.error("Please enter your first name"); firstNameRef.current?.focus(); return; }
        if (!last_name.trim()) { toast.error("Please enter your last name"); lastNameRef.current?.focus(); return; }
        if (!email.trim()) { toast.error("Please enter a valid email"); emailRef.current?.focus(); return; }
        if (!mobile.trim()) { toast.error("Please enter your mobile number"); mobileRef.current?.focus(); return; }
        if (!address.trim()) { toast.error("Please enter your address"); addressRef.current?.focus(); return; }

        if (!paystackReady) {
            toast.error("Payment library still loading. Please wait a moment and try again.");
            return;
        }

        setLoading(true);
        try {
            // 1) Initialize order (voucher applied server-side)
            const init = await initOrder(buildOrderPayload());
            console.log("ORDER INIT:", init);

            // If voucher fully covers it, backend returns the final JSON immediately
            if (init?.status === "paid" && init?.ok) {
                toast.success("✅ Order completed!");
                if (init?.download_url) {
                    // You can redirect or display link here
                    console.log("Download URL:", init.download_url, "expires:", init.expires_at);
                }
                resetForm();
                return;
            }

            // 2) Otherwise, open Paystack with server-provided values
            const payAmount = Number(init?.final_amount ?? amountPesewas);
            const callbackRef = await openLegacyInline({
                public_key: init?.public_key,
                email: email.trim(),
                amount: payAmount,
                reference: init?.reference,   // MUST match server-side reference
                access_code: init?.access_code, // legacy inline requirement
                firstname: first_name.trim(),
            });

            // (Optional) sanity log; callbackRef should match init.reference
            console.log("Refs -> init:", init?.reference, "callback:", callbackRef);
            toast.info("Verifying payment…");

            // 3) Confirm using the **server-generated reference**
            const verified = await confirmServer(init?.reference);
            console.log("CONFIRM RESPONSE:", verified);

            if (verified?.status === "paid" && verified?.ok) {
                toast.success("Payment verified and order confirmed!");
                if (verified?.download_url) {
                    console.log("Download URL:", verified.download_url, "expires:", verified.expires_at);
                }
                resetForm();
            } else {
                throw new Error(verified?.message || verified?.error || "Could not verify payment.");
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFirstName(""); setLastName(""); setEmail(""); setMobile("");
        setAddress(""); setVoucher("");
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-gray-100 mt-[150px] md:mt-[100px]">
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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <ToastContainer position="top-center" />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">First Name</label>
                                <input
                                    ref={firstNameRef}
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
                                    ref={lastNameRef}
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
                                ref={emailRef}
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
                                ref={mobileRef}
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
                                ref={addressRef}
                                className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-[#D95B24]"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Voucher (optional)</label>
                            <input
                                ref={voucherRef}
                                type="text"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#D95B24]"
                                placeholder="Enter voucher code if you have one"
                                value={voucher}
                                onChange={(e) => setVoucher(e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                If valid, we’ll auto-apply it on the server; if partial, you’ll pay the discounted balance.
                            </p>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Amount</label>
                            <p className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">
                                GHS {amountGHS}
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !paystackReady}
                            className="w-full bg-[#D95B24] text-white py-3 rounded-lg hover:bg-[#D95B24]/80 transition shadow-md disabled:opacity-60"
                            aria-live="polite"
                        >
                            {loading ? "Processing..." : "Pay with Paystack"}
                        </button>

                        {!paystackReady && (
                            <p className="text-xs text-center text-gray-400 mt-2">
                                Loading payment library…
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

PaystackForm.propTypes = {
    productId: PropTypes.string,
    productTitle: PropTypes.string,
    amountPesewas: PropTypes.number,
};

PaystackForm.defaultProps = {
    productId: "workbook-001",
    productTitle: "Dr. Boahemaa Ntim Workbook",
    amountPesewas: 8500,
};
