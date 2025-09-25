/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import PaystackPop from "@paystack/inline-js";
import hustle from "../assets/about/hustle.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// === API BASES ===
const API_BASE = "https://api.drboahemaantim.com";
const ORDER_URL = `${API_BASE}/api/workbook-orders`;
const CONFIRM_URL = `${API_BASE}/api/paystack/workbook/confirm`;

// Optional: move to .env in production (e.g., import.meta.env.VITE_PAYSTACK_PUBKEY)
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const PaystackForm = () => {
    // form state
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [voucher, setVoucher] = useState("");
    const [amount, setAmount] = useState("85"); // GHS (display only)
    const [loading, setLoading] = useState(false);

    // UI behavior: switch button label when voucher field is focused/clicked
    const [voucherIntent, setVoucherIntent] = useState(false);

    // refs for validation focus/scroll
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const mobileRef = useRef(null);
    const addressRef = useRef(null);
    const voucherRef = useRef(null);

    // --- helpers ---
    const postJSON = async (url, body) => {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        let data = null;
        try {
            data = await res.json();
        } catch (_e) {
            //ignore
        }
        if (!res.ok) {
            const msg = data?.message || data || (await res.text().catch(() => "No body"));
            throw new Error(`${res.status} ${typeof msg === "string" ? msg : JSON.stringify(msg)}`);
        }
        return data;
    };

    const getOrderIdentifier = (obj) =>
        obj?.order_id ||
        obj?.id ||
        obj?.data?.order_id ||
        obj?.data?.id ||
        obj?.result?.order_id ||
        obj?.result?.id ||
        obj?.reference ||
        obj?.data?.reference;

    const isValidEmail = (val) => /\S+@\S+\.\S+/.test(val);

    const validateForm = () => {
        const fields = [
            { name: "first name", value: first_name, ref: firstNameRef },
            { name: "last name", value: last_name, ref: lastNameRef },
            { name: "email", value: email, ref: emailRef },
            { name: "mobile", value: mobile, ref: mobileRef },
            { name: "address", value: address, ref: addressRef },
        ];

        for (const f of fields) {
            if (!String(f.value || "").trim()) {
                return {
                    valid: false,
                    message: `Please enter your ${f.name}. You must complete all details before applying a voucher or making payment.`,
                    ref: f.ref,
                };
            }
        }

        if (!isValidEmail(email)) {
            return {
                valid: false,
                message:
                    "Please enter a valid email address. You must complete all details before applying a voucher or making payment.",
                ref: emailRef,
            };
        }

        return { valid: true };
    };

    // --- submit handler ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Always validate first (blocks voucher + paystack)
        const check = validateForm();
        if (!check.valid) {
            toast.error(check.message);
            check.ref?.current?.focus();
            check.ref?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        // Amount guard
        const amountNumber = Number(amount);
        if (Number.isNaN(amountNumber) || amountNumber <= 0) {
            toast.error("Amount must be a valid number greater than 0.");
            return;
        }
        const amountPesewas = Math.round(amountNumber * 100);

        setLoading(true);

        try {
            // 1) Create the order (includes optional voucher_code)
            const orderPayload = {
                amount: amountPesewas, // pesewas
                first_name,
                last_name,
                email,
                mobile,
                address,
                ...(voucher ? { voucher_code: voucher.trim() } : {}),
            };

            const orderResp = await postJSON(ORDER_URL, orderPayload);
            const orderIdentifier = getOrderIdentifier(orderResp);

            // helper to confirm
            const confirm = async ({
                payment_method,
                paystack_reference = null,
                voucher_code = null,
            }) => {
                const confirmPayload = {
                    first_name,
                    last_name,
                    email,
                    mobile,
                    address,
                    amount: amountPesewas,
                    payment_method, // "voucher" | "paystack"
                    ...(orderIdentifier ? { order_id: orderIdentifier } : {}),
                    ...(paystack_reference ? { paystack_reference } : {}),
                    ...(voucher_code ? { voucher_code } : {}),
                };
                return await postJSON(CONFIRM_URL, confirmPayload);
            };

            // 2) If voucher present, confirm via voucher (skip Paystack)
            if (voucher.trim()) {
                try {
                    await confirm({
                        payment_method: "voucher",
                        voucher_code: voucher.trim(),
                    });

                    toast.success("Voucher accepted. Your order has been confirmed!");
                    // reset
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setMobile("");
                    setAddress("");
                    setVoucher("");
                    setVoucherIntent(false);
                    setAmount(String(amountNumber));
                    setLoading(false);
                    return;
                } catch (err) {
                    console.error("Voucher confirm error:", err);
                    throw new Error(
                        "The voucher could not be applied or confirmed. Please verify the code or try without a voucher."
                    );
                }
            }

            // 3) Otherwise, run Paystack inline and confirm on success
            const paystack = new PaystackPop();
            paystack.newTransaction({
                key: PAYSTACK_PUBLIC_KEY,
                amount: amountPesewas,
                email,
                phone: mobile,
                firstName: first_name,
                lastName: last_name,
                onSuccess: async (trx) => {
                    try {
                        await confirm({
                            payment_method: "paystack",
                            paystack_reference: trx.reference,
                        });
                        toast.success("Payment successful! Your order has been confirmed.");
                        // reset
                        setFirstName("");
                        setLastName("");
                        setEmail("");
                        setMobile("");
                        setAddress("");
                        setVoucher("");
                        setVoucherIntent(false);
                        setAmount(String(amountNumber));
                    } catch (err) {
                        console.error("Confirm error:", err);
                        toast.error(
                            "Payment succeeded, but confirmation failed. Please contact support."
                        );
                    } finally {
                        setLoading(false);
                    }
                },
                onCancel: () => {
                    setLoading(false);
                    toast.error("Transaction was cancelled.");
                },
            });
        } catch (err) {
            console.error("Order flow error:", err);
            toast.error(err.message || "Something went wrong creating your order.");
            setLoading(false);
        }
    };

    // Button label: switch on focus OR when a voucher value exists
    const showVoucherLabel = voucherIntent || !!voucher.trim();
    const submitLabel = showVoucherLabel ? "Pay with Voucher" : `Pay Now (GHS ${amount})`;

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-gray-100 mt-[70px]">
            <div className="hidden md:flex flex-col items-center justify-center bg-[#1C2237]">
                <h2 className="text-3xl font-bold font-openSans mb-6 text-center text-[#D95B24]">
                    Make Payment for your workbook.
                </h2>
                <img
                    src={hustle}
                    alt="Pay with Paystack"
                    className="max-w-md w-full object-contain p-6"
                />
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
                                onFocus={() => setVoucherIntent(true)}
                                onBlur={() => setVoucherIntent(!!voucher.trim())}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                A valid voucher will skip Paystack and confirm your order directly.
                            </p>
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
                            aria-live="polite"
                        >
                            {loading ? "Processing..." : submitLabel}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaystackForm;
