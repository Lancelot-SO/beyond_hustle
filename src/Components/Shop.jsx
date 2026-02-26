/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Shop = ({ isOpen, onClose, workbookTo = "/paystack", mainBookTo = "/main-book", artworkTo = "/excerpts" }) => {

    const products = [
        {
            id: 'bth-book',
            name: 'Beyond The Hustle Book',
            category: 'Book',
            price: 'GHS 250',
            image: '/src/assets/hero/book1.png', // Assuming paths based on context
            description: 'Go beyond the hustle. Build boldly. Lead internationally.',
            link: mainBookTo
        },
        {
            id: 'work-book',
            name: 'BTH Work Book',
            category: 'Workbook',
            price: 'GHS 150',
            image: '/src/assets/hero/book2.png',
            description: 'Practical exercises to help you implement the BTH principles.',
            link: workbookTo
        },
        {
            id: 'art-work',
            name: 'BTH Art Work',
            category: 'Artwork',
            price: 'GHS 100',
            image: '/src/assets/hero/art.png',
            description: 'Beautifully crafted artwork inspired by the BTH principles.',
            link: artworkTo
        }
    ];

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
                    <div className="px-6 py-6 space-y-6">
                        {products.map((product) => (
                            <div key={product.id} className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                        <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-semibold text-sm">{product.name}</p>
                                        <p className="text-gray-500 text-[10px] uppercase tracking-wider">{product.category} • {product.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        to={product.link}
                                        className="px-4 py-2 rounded-lg bg-[#D95B24] text-white text-xs font-bold hover:bg-[#c04e1f] transition-colors"
                                        onClick={onClose}
                                    >
                                        Buy
                                    </Link>
                                </div>
                            </div>
                        ))}
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
