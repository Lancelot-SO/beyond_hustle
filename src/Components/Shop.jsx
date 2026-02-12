/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Shop = ({ isOpen, onClose, workbookTo = "/paystack", mainBookTo = "/main-book", artworkTo = "/excerpts" }) => {
    // Close on ESC
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[70]"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="shop-modal-title"
                className="fixed inset-0 z-[75] flex items-center justify-center p-4"
            >
                <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-black/5">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                        <h2 id="shop-modal-title" className="text-lg font-semibold">
                            Shop
                        </h2>
                        <button
                            onClick={onClose}
                            className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm border hover:bg-gray-50"
                            aria-label="Close shop modal"
                        >
                            Close
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-6 space-y-5">
                        {/* Row 1 */}

                        <div className="flex items-center gap-3">
                            <Link
                                to={mainBookTo}
                                className="px-4 py-2 rounded-lg bg-[#D95B24] text-white hover:bg-[#c04e1f] transition-colors"
                                onClick={onClose}
                            >
                                Buy
                            </Link>
                            <span className="text-gray-800 font-medium">Purchase BTH Book</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                to={workbookTo}
                                className="px-4 py-2 rounded-lg bg-[#D95B24] text-white hover:bg-[#c04e1f] transition-colors"
                                onClick={onClose}
                            >
                                Buy
                            </Link>
                            <span className="text-gray-800 font-medium">Purchase Work Book</span>
                        </div>

                        {/* Row 2 */}
                        <div className="flex items-center gap-3">
                            <Link
                                to={artworkTo}
                                className="px-4 py-2 rounded-lg bg-[#D95B24] text-white hover:bg-[#c04e1f] transition-colors"
                                onClick={onClose}
                            >
                                Buy
                            </Link>
                            <span className="text-gray-800 font-medium">Purchase Art Work</span>
                        </div>
                    </div>

                    {/* Footer (optional) */}
                    <div className="px-6 py-4 border-t text-xs text-gray-500">
                        You’ll be taken to the respective pages to complete your purchase.
                    </div>
                </div>
            </div>
        </>
    );
};

Shop.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    workbookTo: PropTypes.string,
    artworkTo: PropTypes.string,
};

export default Shop;
