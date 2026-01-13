/* eslint-disable no-unused-vars */
// ExcerptsGrid.jsx

import React, { useMemo, useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import bh17 from "../../assets/excerpts/bh17.png";
import bh18 from "../../assets/excerpts/bh18.png";
import bh19 from "../../assets/excerpts/bh19.png";
import bh20 from "../../assets/excerpts/bh20.png";
import bh21 from "../../assets/excerpts/bh21.png";
import bh22 from "../../assets/excerpts/bh22.png";
import bh23 from "../../assets/excerpts/bh23.png";
import bh24 from "../../assets/excerpts/bh24.png";
import bh25 from "../../assets/excerpts/bh25.png";
import bh26 from "../../assets/excerpts/bh26.png";
import bh27 from "../../assets/excerpts/bh27.png";
import bh28 from "../../assets/excerpts/bh28.png";
import bh29 from "../../assets/excerpts/bh29.png";
import bh30 from "../../assets/excerpts/bh30.png";
import bh31 from "../../assets/excerpts/bh31.png";
import bh32 from "../../assets/excerpts/bh32.png";
import bh33 from "../../assets/excerpts/bh33.png";
import bh34 from "../../assets/excerpts/bh34.png";
import bh35 from "../../assets/excerpts/bh35.png";
import bh36 from "../../assets/excerpts/bh36.png";
import bh37 from "../../assets/excerpts/bh37.png";
import bh38 from "../../assets/excerpts/bh38.png";
import bh39 from "../../assets/excerpts/bh39.png";
import bh40 from "../../assets/excerpts/bh40.png";
import bh41 from "../../assets/excerpts/bh41.png";
import bh42 from "../../assets/excerpts/bh42.png";
import bh43 from "../../assets/excerpts/bh43.png";
import bh44 from "../../assets/excerpts/bh44.png";
import bh45 from "../../assets/excerpts/bh45.png";
import bh46 from "../../assets/excerpts/bh46.png";
import bh47 from "../../assets/excerpts/bh47.png";
import bh48 from "../../assets/excerpts/bh48.png";
import bh49 from "../../assets/excerpts/bh49.png";


// --------------------------- CONFIG --------------------------- //
const API_BASE = "https://api.drboahemaantim.com";
const ORDERS_ENDPOINT = `${API_BASE}/api/orders`;
const CONFIRM_ENDPOINT = `${API_BASE}/api/paystack/confirm`;

const PAYSTACK_PUBLIC_KEY_FALLBACK = "pk_test_xxxxxxxxxxxxxxxxxxxxx"; // optional fallback

// Fixed price for all artworks (GHS)
const FIXED_PRICE_GHS = 200;

// Grid settings
const INITIAL_DISPLAY_COUNT = 16;
const IMAGES_PER_LOAD = 16;
const TOTAL_GALLERY_IMAGES = 49;
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
    { id: 17, src: bh17, alt: "bh 17", title: "Artwork #17" },
    { id: 18, src: bh18, alt: "bh 18", title: "Artwork #18" },
    { id: 19, src: bh19, alt: "bh 19", title: "Artwork #19" },
    { id: 20, src: bh20, alt: "bh 20", title: "Artwork #20" },
    { id: 21, src: bh21, alt: "bh 21", title: "Artwork #21" },
    { id: 22, src: bh22, alt: "bh 22", title: "Artwork #22" },
    { id: 23, src: bh23, alt: "bh 23", title: "Artwork #23" },
    { id: 24, src: bh24, alt: "bh 24", title: "Artwork #24" },
    { id: 25, src: bh25, alt: "bh 25", title: "Artwork #25" },
    { id: 26, src: bh26, alt: "bh 26", title: "Artwork #26" },
    { id: 27, src: bh27, alt: "bh 27", title: "Artwork #27" },
    { id: 28, src: bh28, alt: "bh 28", title: "Artwork #28" },
    { id: 29, src: bh29, alt: "bh 29", title: "Artwork #29" },
    { id: 30, src: bh30, alt: "bh 30", title: "Artwork #30" },
    { id: 31, src: bh31, alt: "bh 31", title: "Artwork #31" },
    { id: 32, src: bh32, alt: "bh 32", title: "Artwork #32" },
    { id: 33, src: bh33, alt: "bh 33", title: "Artwork #33" },
    { id: 34, src: bh34, alt: "bh 34", title: "Artwork #34" },
    { id: 35, src: bh35, alt: "bh 35", title: "Artwork #35" },
    { id: 36, src: bh36, alt: "bh 36", title: "Artwork #36" },
    { id: 37, src: bh37, alt: "bh 37", title: "Artwork #37" },
    { id: 38, src: bh38, alt: "bh 38", title: "Artwork #38" },
    { id: 39, src: bh39, alt: "bh 39", title: "Artwork #39" },
    { id: 40, src: bh40, alt: "bh 40", title: "Artwork #40" },
    { id: 41, src: bh41, alt: "bh 41", title: "Artwork #41" },
    { id: 42, src: bh42, alt: "bh 42", title: "Artwork #42" },
    { id: 43, src: bh43, alt: "bh 43", title: "Artwork #43" },
    { id: 44, src: bh44, alt: "bh 44", title: "Artwork #44" },
    { id: 45, src: bh45, alt: "bh 45", title: "Artwork #45" },
    { id: 46, src: bh46, alt: "bh 46", title: "Artwork #46" },
    { id: 47, src: bh47, alt: "bh 47", title: "Artwork #47" },
    { id: 48, src: bh48, alt: "bh 48", title: "Artwork #48" },
    { id: 49, src: bh49, alt: "bh 49", title: "Artwork #49" },


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

// --------------------- Helpers --------------------- //
async function fetchJSON(url, options = {}) {
    const res = await fetch(url, options);
    let payload = null;
    try {
        payload = await res.json();
    } catch {
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

// Ensure absolute URL for email clients / server DB
function toAbsoluteUrl(src) {
    try {
        if (!src) return "";
        // Already absolute http(s)
        if (/^https?:\/\//i.test(src)) return src;

        // data/blobs usually not wanted by API; return empty to avoid saving junk
        if (/^(data:|blob:)/i.test(src)) return "";

        // If it starts with a slash, prefix origin
        if (typeof window !== "undefined" && src.startsWith("/")) {
            return `${window.location.origin}${src}`;
        }

        // Try to resolve relative -> absolute using current page
        if (typeof window !== "undefined") {
            return new URL(src, window.location.href).toString();
        }
        return src;
    } catch {
        return "";
    }
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
        setDisplayedCount((prev) => Math.min(prev + IMAGES_PER_LOAD, TOTAL_GALLERY_IMAGES));

    const handleShowLess = () =>
        setDisplayedCount((prev) => Math.max(prev - IMAGES_PER_LOAD, MIN_DISPLAY_COUNT));

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
        setCurrentIndex((prev) => (prev + visibleImages.length - 1) % visibleImages.length);

    const showNext = () => setCurrentIndex((prev) => (prev + 1) % visibleImages.length);

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
        if (!/^[0-9+\-\s]{7,}$/.test(form.mobile)) return "Please enter a valid phone number.";
        if (!form.address.trim()) return "Please enter your address.";
        return null;
    };

    const handlePaystackAndSubmit = async () => {
        const err = validateForm();
        if (err) {
            toast.error(err);
            return;
        }

        setLoading(true);

        try {
            // Build absolute public URL for the image so it renders in emails / DB
            const absoluteImageUrl = toAbsoluteUrl(selected?.src);

            // 1) Create order on backend
            const orderPayload = {
                product_id: `art-${selected.id}`,
                product_title: selected.title,

                // primary + aliases (so backend can map any)
                product_link: absoluteImageUrl,
                product_url: absoluteImageUrl,
                image_url: absoluteImageUrl,
                url: absoluteImageUrl,

                product_alt: selected.alt, // optional but useful
                amount: Math.max(1, Math.round(FIXED_PRICE_GHS * 100)), // send pesewas
                full_name: form.name,
                email: form.email,
                mobile: form.mobile,
                address: form.address,
            };
            console.log("[orders] payload →", orderPayload);

            const order = await fetchJSON(ORDERS_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload),
            });
            console.log("[orders] response ←", order);

            const {
                reference,
                final_amount, // could be "200" (GHS) or already in pesewas depending on API
                public_key,
                access_code,
                status: orderStatus,
            } = order || {};

            // 2) If backend already marks as paid (e.g., voucher flow)
            if (orderStatus === "paid") {
                toast.success(`✅ Order completed! Ref: ${reference}`);
                closeModal();
                setLoading(false);
                return;
            }

            // 3) Initialize Paystack popup
            const amountPesewas = toPesewas(final_amount ?? FIXED_PRICE_GHS);
            const keyToUse = public_key || PAYSTACK_PUBLIC_KEY_FALLBACK;
            const paystack = new PaystackPop();

            await new Promise((resolve) => {
                paystack.newTransaction({
                    key: keyToUse,
                    email: form.email,
                    amount: amountPesewas,
                    currency: "GHS",
                    reference,
                    ...(access_code ? { access_code } : {}),
                    metadata: {
                        custom_fields: [
                            { display_name: "Buyer", variable_name: "buyer_name", value: form.name },
                            { display_name: "Mobile", variable_name: "buyer_mobile", value: form.mobile },
                            { display_name: "Address", variable_name: "buyer_address", value: form.address },
                            { display_name: "Artwork ID", variable_name: "artwork_id", value: selected.id },
                            { display_name: "Artwork Title", variable_name: "artwork_title", value: selected.title },
                            { display_name: "Image URL", variable_name: "product_link", value: absoluteImageUrl },
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
                            console.log("[confirm] response ←", confirm);

                            if (confirm?.status === "paid") {
                                toast.success("✅ Payment verified! We’ll reach out shortly.");
                            } else {
                                toast.info(
                                    `⚠️ Payment is processing. Keep your ref: ${tx?.reference || reference
                                    } and contact support if you don't receive a receipt soon.`
                                );
                            }
                        } catch (cErr) {
                            console.error("Confirm error:", cErr);
                            toast.info(
                                `We received your payment but couldn't confirm immediately.\nKeep your ref: ${tx?.reference || reference
                                }.`
                            );
                        } finally {
                            resolve();
                        }
                    },
                    onCancel: () => {
                        toast.error("Payment canceled.");
                        resolve();
                    },
                });
            });

            closeModal();
        } catch (e) {
            console.error(e);
            toast.error(e?.message || "Unable to initialize payment at the moment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ------------------------------- UI ------------------------------- //
    return (
        <div className="p-4 lg:px-14 4xl:px-32 flex flex-col items-center">
            <ToastContainer />
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
                                    <div className="space-y-4 max-h-[55vh] overflow-y-auto overscroll-contain pr-1">
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
                                            {loading ? "Processing..." : `Buy • GHS ${Number(FIXED_PRICE_GHS).toLocaleString()}`}
                                        </button>

                                        <button
                                            onClick={() => {
                                                setShowForm(false);
                                                setShowChoice(true);
                                            }}
                                            className="block text-center md:inline-block md:ml-3 text-sm text-black hover:text-gray-800"
                                        >
                                            Go Back
                                        </button>

                                        <p className="text-[11px] text-gray-500">
                                            Payments are processed securely by Paystack. After payment, we’ll verify and email your
                                            receipt.
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
