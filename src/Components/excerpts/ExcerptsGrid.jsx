/* eslint-disable no-unused-vars */
// ExcerptsGrid.jsx

import React, { useMemo, useState } from "react";
import PaystackPop from "@paystack/inline-js";

// --------------------- ASSETS (first 16 real images) --------------------- //
import bh1 from "../../assets/excerpts/bh1.png";
import bh2 from "../../assets/excerpts/bh2.png";
import bh3 from "../../assets/excerpts/bh3.png";
import bh4 from "../../assets/excerpts/bh4.png";
import bh5 from "../../assets/excerpts/bh5.png";
import bh6 from "../../assets/excerpts/bh6.png";
import bh7 from "../../assets/excerpts/bh7.png";
import bh8 from "../../assets/excerpts/bh8.png";
import bh9 from "../../assets/excerpts/bh9.png";
import bh10 from "../../assets/excerpts/bh10.png";
import bh11 from "../../assets/excerpts/bh11.png";
import bh12 from "../../assets/excerpts/bh12.png";
import bh13 from "../../assets/excerpts/bh13.png";
import bh14 from "../../assets/excerpts/bh14.png";
import bh15 from "../../assets/excerpts/bh15.png";
import bh16 from "../../assets/excerpts/bh16.png";

// --------------------------- CONFIG --------------------------- //
const API_BASE = "https://api.drboahemaantim.com";
const ORDERS_ENDPOINT = `${API_BASE}/api/orders`;
const CONFIRM_ENDPOINT = `${API_BASE}/api/paystack/confirm`;

// Optional fallback if backend doesn't return a public key
const PAYSTACK_PUBLIC_KEY_FALLBACK = "pk_test_xxxxxxxxxxxxxxxxxxxxx";

// Fixed price for all artworks (GHS)
const FIXED_PRICE_GHS = 200;

// Grid settings
const INITIAL_DISPLAY_COUNT = 16;
const IMAGES_PER_LOAD = 16;
const TOTAL_GALLERY_IMAGES = 52;
const MIN_DISPLAY_COUNT = INITIAL_DISPLAY_COUNT;
const ROWS_PER_BLOCK = 7;

// Layout for each 16-item block
const itemLayouts = [
    { colStart: 1, colSpan: 1, rowStart: 1 },
    { colStart: 2, colSpan: 1, rowStart: 1 },
    { colStart: 3, colSpan: 1, rowStart: 1 },
    { colStart: 1, colSpan: 1, rowStart: 2 },
    { colStart: 2, colSpan: 2, rowStart: 2 },
    { colStart: 1, colSpan: 1, rowStart: 3 },
    { colStart: 2, colSpan: 1, rowStart: 3 },
    { colStart: 3, colSpan: 1, rowStart: 3 },
    { colStart: 1, colSpan: 1, rowStart: 4 },
    { colStart: 2, colSpan: 2, rowStart: 4 },
    { colStart: 1, colSpan: 1, rowStart: 5 },
    { colStart: 2, colSpan: 1, rowStart: 5 },
    { colStart: 3, colSpan: 1, rowStart: 5 },
    { colStart: 1, colSpan: 2, rowStart: 6 },
    { colStart: 3, colSpan: 1, rowStart: 6 },
    { colStart: 1, colSpan: 3, rowStart: 7 },
];

// Master gallery: 16 real assets + placeholders
const galleryImages = [
    { id: 1, src: bh1, alt: "launch 1", title: "Artwork #1" },
    { id: 2, src: bh2, alt: "bh 2", title: "Artwork #2" },
    { id: 3, src: bh3, alt: "bh 3", title: "Artwork #3" },
    { id: 4, src: bh4, alt: "bh 4", title: "Artwork #4" },
    { id: 5, src: bh5, alt: "bh 5", title: "Artwork #5" },
    { id: 6, src: bh6, alt: "bh 6", title: "Artwork #6" },
    { id: 7, src: bh7, alt: "bh 7", title: "Artwork #7" },
    { id: 8, src: bh8, alt: "bh 8", title: "Artwork #8" },
    { id: 9, src: bh9, alt: "bh 9", title: "Artwork #9" },
    { id: 10, src: bh10, alt: "bh 10", title: "Artwork #10" },
    { id: 11, src: bh11, alt: "bh 11", title: "Artwork #11" },
    { id: 12, src: bh12, alt: "bh 12", title: "Artwork #12" },
    { id: 13, src: bh13, alt: "bh 13", title: "Artwork #13" },
    { id: 14, src: bh14, alt: "bh 14", title: "Artwork #14" },
    { id: 15, src: bh15, alt: "bh 15", title: "Artwork #15" },
    { id: 16, src: bh16, alt: "bh 16", title: "Artwork #16" },
    ...Array.from({ length: TOTAL_GALLERY_IMAGES - 16 }, (_, idx) => {
        const id = idx + 17;
        return {
            id,
            src: `/placeholder.svg?height=100&width=100&query=img${id}`,
            alt: `launch ${id}`,
            title: `Artwork #${id}`,
        };
    }),
];

// --------------------- Helpers (no abort; fix units) --------------------- //
async function fetchJSON(url, options = {}) {
    const res = await fetch(url, options);
    let payload = null;
    try { payload = await res.json(); } catch {
        // Ignore JSON parse errors (payload remains null)
    }
    if (!res.ok) {
        const message = (payload && (payload.message || payload.error)) || `HTTP ${res.status}`;
        throw new Error(message);
    }
    return payload;
}

// Convert GHS to pesewas if needed. If value already looks like pesewas (>=1000) keep it.
function toPesewas(val) {
    const n = Number(val);
    if (!Number.isFinite(n)) return 0;
    return n < 1000 ? Math.round(n * 100) : Math.round(n);
}

// ===================================================================== //
//                              COMPONENT                                //
// ===================================================================== //
export default function ExcerptsGrid() {
    // Grid state
    const [displayedCount, setDisplayedCount] = useState(INITIAL_DISPLAY_COUNT);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Purchase flow state
    const [showChoice, setShowChoice] = useState(false); // view vs purchase
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
    });

    const visibleImages = useMemo(
        () => galleryImages.slice(0, displayedCount),
        [displayedCount]
    );

    const selected = visibleImages[currentIndex] || galleryImages[0];

    const handleLoadMore = () =>
        setDisplayedCount((prev) =>
            Math.min(prev + IMAGES_PER_LOAD, TOTAL_GALLERY_IMAGES)
        );

    const handleShowLess = () =>
        setDisplayedCount((prev) =>
            Math.max(prev - IMAGES_PER_LOAD, MIN_DISPLAY_COUNT)
        );

    const openModal = (index) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
        setShowChoice(true);
        setShowForm(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setShowChoice(false);
        setShowForm(false);
    };

    const showPrev = () =>
        setCurrentIndex(
            (prev) => (prev + visibleImages.length - 1) % visibleImages.length
        );

    const showNext = () =>
        setCurrentIndex((prev) => (prev + 1) % visibleImages.length);

    const totalRows = Math.ceil(displayedCount / IMAGES_PER_LOAD) * ROWS_PER_BLOCK;

    const imagesToRender = visibleImages.map((img, i) => {
        const blockIndex = Math.floor(i / IMAGES_PER_LOAD);
        const layout = itemLayouts[i % IMAGES_PER_LOAD];
        const rowStart = layout.rowStart + blockIndex * ROWS_PER_BLOCK;

        return (
            <div
                key={img.id}
                onClick={() => openModal(i)}
                className={
                    "flex items-center justify-center bg-white rounded relative " +
                    "overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                }
                style={{
                    gridColumn: `${layout.colStart} / span ${layout.colSpan}`,
                    gridRowStart: rowStart,
                }}
            >
                <img
                    src={img.src}
                    alt={img.alt}
                    className="md:h-[479px] h-auto w-full object-cover"
                    loading="lazy"
                />
            </div>
        );
    });

    // ----------------------- Form + Payment Logic ----------------------- //
    const handleStartPurchase = () => {
        setShowChoice(false);
        setShowForm(true);
    };

    const handleViewFullSize = () => {
        window.open(selected.src, "_blank", "noopener,noreferrer");
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const validateForm = () => {
        if (!form.name.trim()) return "Please enter your full name.";
        if (!/\S+@\S+\.\S+/.test(form.email)) return "Please enter a valid email.";
        if (!/^[0-9+\-\s]{7,}$/.test(form.mobile))
            return "Please enter a valid phone number.";
        if (!form.address.trim()) return "Please enter your address.";
        return null;
    };

    /**
     * Flow:
     * 1) POST /api/orders -> { reference, access_code, public_key, final_amount, status }
     * 2) If status === 'paid' (voucher made it free) => success
     * 3) Else open Paystack inline with newTransaction({ key, email, amount, reference, access_code })
     * 4) On success => POST /api/paystack/confirm { reference } to verify, save to DB, and email
     */
    const handlePaystackAndSubmit = async () => {
        const err = validateForm();
        if (err) {
            alert(err);
            return;
        }

        setLoading(true);

        try {
            // 1) Create order on backend
            const orderPayload = {
                product_id: `art-${selected.id}`,
                product_title: selected.title,
                amount: Math.max(1, Math.round(FIXED_PRICE_GHS * 100)), // prefer sending pesewas
                full_name: form.name,
                email: form.email,
                mobile: form.mobile,
                address: form.address,
                voucher_code: "", // optional
            };

            const order = await fetchJSON(ORDERS_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload),
            });

            const {
                reference,
                final_amount,   // looks like GHS string from your API (e.g. "200")
                public_key,
                access_code,
                status: orderStatus,
            } = order || {};

            // 2) Free via voucher?
            if (orderStatus === "paid") {
                alert(`✅ Order completed with voucher! Ref: ${reference}`);
                closeModal();
                setLoading(false);
                return;
            }

            // 3) Initialize Paystack popup (convert to pesewas defensively)
            const amountPesewas = toPesewas(final_amount ?? FIXED_PRICE_GHS);
            const keyToUse = public_key || PAYSTACK_PUBLIC_KEY_FALLBACK;

            const paystack = new PaystackPop();

            await new Promise((resolve) => {
                paystack.newTransaction({
                    key: keyToUse,
                    email: form.email,
                    amount: amountPesewas,
                    currency: "GHS",
                    reference, // keep YOUR reference
                    ...(access_code ? { access_code } : {}),
                    metadata: {
                        custom_fields: [
                            { display_name: "Buyer", variable_name: "buyer_name", value: form.name },
                            { display_name: "Mobile", variable_name: "buyer_mobile", value: form.mobile },
                            { display_name: "Address", variable_name: "buyer_address", value: form.address },
                            { display_name: "Artwork ID", variable_name: "artwork_id", value: selected.id },
                            { display_name: "Artwork Title", variable_name: "artwork_title", value: selected.title },
                            { display_name: "Unit Price (GHS)", variable_name: "price", value: FIXED_PRICE_GHS },
                        ],
                    },
                    onSuccess: async (tx) => {
                        try {
                            // 4) Confirm on server (verify with Paystack, save DB, send email)
                            const confirm = await fetchJSON(CONFIRM_ENDPOINT, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ reference: tx?.reference || reference }),
                            });

                            if (confirm?.status === "paid") {
                                alert("✅ Payment verified! We’ll reach out shortly.");
                            } else {
                                alert(
                                    `⚠️ Payment is processing. Keep your ref: ${tx?.reference || reference} and contact support if you don't receive a receipt soon.`
                                );
                            }
                        } catch (cErr) {
                            console.error("Confirm error:", cErr);
                            alert(
                                `We received your payment but couldn't confirm immediately.\nKeep your ref: ${tx?.reference || reference}.`
                            );
                        } finally {
                            resolve();
                        }
                    },
                    onCancel: () => {
                        alert("Payment canceled.");
                        resolve();
                    },
                });
            });

            closeModal();
        } catch (e) {
            console.error(e);
            alert(
                e?.message ||
                "Unable to initialize payment at the moment. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // ------------------------------- UI ------------------------------- //
    return (
        <div className="p-4 lg:px-14 4xl:px-32 flex flex-col items-center">
            {/* Grid container for images */}
            <div
                className="grid w-full grid-cols-3 gap-8 mb-4 auto-rows-auto"
                style={{
                    gridAutoRows: "minmax(100px, auto)",
                    gridTemplateRows: `repeat(${totalRows}, auto)`,
                }}
            >
                {imagesToRender}
            </div>

            {/* Controls */}
            <div className="flex gap-4 mt-4">
                {displayedCount > MIN_DISPLAY_COUNT && (
                    <button
                        onClick={handleShowLess}
                        className="px-4 py-2 border rounded hover:bg-[#D95B24] hover:text-white"
                    >
                        Show Less
                    </button>
                )}
                {displayedCount < TOTAL_GALLERY_IMAGES && (
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 bg-[#D95B24] text-white shadow-lg rounded"
                    >
                        Load More
                    </button>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-white text-3xl z-60"
                        aria-label="Close"
                    >
                        ×
                    </button>

                    <div
                        className="relative w-[95%] max-w-5xl bg-white rounded-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b">
                            <div className="font-semibold">
                                {selected.title} <span className="text-gray-500">#{selected.id}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                GHS {Number(FIXED_PRICE_GHS).toLocaleString()}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            {/* Image preview with prev/next */}
                            <div className="relative bg-black">
                                <button
                                    onClick={showPrev}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-[#D95B24] hover:text-white p-2 md:p-3 rounded-full z-10"
                                    aria-label="Previous image"
                                >
                                    ‹
                                </button>

                                <img
                                    src={selected.src}
                                    alt={selected.alt}
                                    className="w-full h-[320px] md:h-[520px] object-contain"
                                />

                                <button
                                    onClick={showNext}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-[#D95B24] hover:text-white p-2 md:p-3 rounded-full z-10"
                                    aria-label="Next image"
                                >
                                    ›
                                </button>
                            </div>

                            {/* Right column: choice or form */}
                            <div className="p-4 md:p-6">
                                {showChoice && (
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-700">
                                            What would you like to do with{" "}
                                            <span className="font-medium">{selected.title}</span>?
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button
                                                onClick={handleViewFullSize}
                                                className="w-full sm:w-auto px-4 py-2 border rounded hover:bg-gray-100"
                                            >
                                                View Full Size
                                            </button>
                                            <button
                                                onClick={handleStartPurchase}
                                                className="w-full sm:w-auto px-4 py-2 bg-[#D95B24] text-white rounded shadow hover:opacity-90"
                                            >
                                                Purchase Artwork
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            You’ll be asked to complete a secure Paystack payment.
                                        </p>
                                    </div>
                                )}

                                {showForm && (
                                    <div className="space-y-4">
                                        <div className="text-sm text-gray-700">
                                            Enter your details to purchase{" "}
                                            <span className="font-medium">{selected.title}</span>.
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            <div>
                                                <label className="block text-sm mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleFormChange}
                                                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#D95B24]"
                                                    placeholder="e.g., Ama Mensah"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleFormChange}
                                                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#D95B24]"
                                                    placeholder="you@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm mb-1">Mobile</label>
                                                <input
                                                    type="tel"
                                                    name="mobile"
                                                    value={form.mobile}
                                                    onChange={handleFormChange}
                                                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#D95B24]"
                                                    placeholder="+233 54 180 4792"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm mb-1">Address</label>
                                                <textarea
                                                    name="address"
                                                    value={form.address}
                                                    onChange={handleFormChange}
                                                    rows={3}
                                                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#D95B24]"
                                                    placeholder="Street, City, Region"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handlePaystackAndSubmit}
                                            disabled={loading}
                                            className="w-full md:w-auto px-5 py-2 bg-[#D95B24] text-white rounded shadow hover:opacity-90 disabled:opacity-60"
                                        >
                                            {loading
                                                ? "Processing..."
                                                : `Buy • GHS ${Number(FIXED_PRICE_GHS).toLocaleString()}`}
                                        </button>

                                        <button
                                            onClick={() => {
                                                setShowForm(false);
                                                setShowChoice(true);
                                            }}
                                            className="block text-center md:inline-block md:ml-3 text-sm text-gray-600 hover:text-gray-800"
                                        >
                                            Back
                                        </button>

                                        <p className="text-[11px] text-gray-500">
                                            Payments are processed securely by Paystack. After
                                            payment, we’ll verify and email your receipt.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
