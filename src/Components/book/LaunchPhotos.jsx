/* eslint-disable no-unused-vars */
// LaunchPhotosWithModal.js

import React, { useState } from 'react';

// Import your first 16 real assets
import launch1 from "../../assets/launch/launch1.png";
import launch2 from "../../assets/launch/launch2.png";
import launch3 from "../../assets/launch/launch3.png";
import launch4 from "../../assets/launch/launch4.png";
import launch5 from "../../assets/launch/launch5.png";
import launch6 from "../../assets/launch/launch6.png";
import launch7 from "../../assets/launch/launch7.png";
import launch8 from "../../assets/launch/launch8.png";
import launch9 from "../../assets/launch/launch9.png";
import launch10 from "../../assets/launch/launch10.png";
import launch11 from "../../assets/launch/launch11.png";
import launch12 from "../../assets/launch/launch12.png";
import launch13 from "../../assets/launch/launch13.png";
import launch14 from "../../assets/launch/launch14.png";
import launch15 from "../../assets/launch/launch15.png";
import launch16 from "../../assets/launch/launch16.png";

// Constants for initial display and gallery settings
const INITIAL_DISPLAY_COUNT = 16;
const IMAGES_PER_LOAD = 16;
const TOTAL_GALLERY_IMAGES = 52;
const MIN_DISPLAY_COUNT = INITIAL_DISPLAY_COUNT;
const ROWS_PER_BLOCK = 7;

// Layout definitions for a 16-item block pattern
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

// Master array: first 16 assets followed by placeholders up to total count
const galleryImages = [
    { id: 1, src: launch1, alt: "launch 1" },
    { id: 2, src: launch2, alt: "launch 2" },
    { id: 3, src: launch3, alt: "launch 3" },
    { id: 4, src: launch4, alt: "launch 4" },
    { id: 5, src: launch5, alt: "launch 5" },
    { id: 6, src: launch6, alt: "launch 6" },
    { id: 7, src: launch7, alt: "launch 7" },
    { id: 8, src: launch8, alt: "launch 8" },
    { id: 9, src: launch9, alt: "launch 9" },
    { id: 10, src: launch10, alt: "launch 10" },
    { id: 11, src: launch11, alt: "launch 11" },
    { id: 12, src: launch12, alt: "launch 12" },
    { id: 13, src: launch13, alt: "launch 13" },
    { id: 14, src: launch14, alt: "launch 14" },
    { id: 15, src: launch15, alt: "launch 15" },
    { id: 16, src: launch16, alt: "launch 16" },
    // Generate placeholders for remaining slots
    ...Array.from({ length: TOTAL_GALLERY_IMAGES - 16 }, (_, idx) => {
        const id = idx + 17;
        return {
            id,
            src: `/placeholder.svg?height=100&width=100&query=img${id}`,
            alt: `launch ${id}`
        };
    })
];

export default function LaunchPhotos() {
    // State: how many images to display
    const [displayedCount, setDisplayedCount] = useState(INITIAL_DISPLAY_COUNT);
    // State: modal open/close
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State: currently viewed index in modal
    const [currentIndex, setCurrentIndex] = useState(0);

    /**
     * Increases displayedCount by IMAGES_PER_LOAD up to the total limit
     */
    const handleLoadMore = () =>
        setDisplayedCount(prev => Math.min(prev + IMAGES_PER_LOAD, TOTAL_GALLERY_IMAGES));

    /**
     * Decreases displayedCount by IMAGES_PER_LOAD down to the minimum
     */
    const handleShowLess = () =>
        setDisplayedCount(prev => Math.max(prev - IMAGES_PER_LOAD, MIN_DISPLAY_COUNT));

    // Slice the gallery to only show the required number of images
    const visibleImages = galleryImages.slice(0, displayedCount);

    /**
     * Opens the modal and sets the current image index
     * @param {number} index - Index of clicked image
     */
    const openModal = (index) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    /**
     * Closes the modal
     */
    const closeModal = () => setIsModalOpen(false);

    /**
     * Navigate to the previous image in the modal (wraps around)
     */
    const showPrev = () =>
        setCurrentIndex((currentIndex + visibleImages.length - 1) % visibleImages.length);

    /**
     * Navigate to the next image in the modal (wraps around)
     */
    const showNext = () =>
        setCurrentIndex((currentIndex + 1) % visibleImages.length);

    // Map visible images to grid items with click handler
    const imagesToRender = visibleImages.map((img, i) => {
        const blockIndex = Math.floor(i / IMAGES_PER_LOAD);
        const layout = itemLayouts[i % IMAGES_PER_LOAD];
        const rowStart = layout.rowStart + blockIndex * ROWS_PER_BLOCK;

        return (
            <div
                key={img.id}
                onClick={() => openModal(i)}
                className={
                    "flex items-center justify-center bg-gray-200 rounded font-bold relative " +
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
                    className="h-full w-full object-cover"
                    loading='lazy'

                />
                {/* <span className="absolute z-10 text-sm text-gray-600">
                    {img.id}
                </span> */}
            </div>
        );
    });

    // Calculate total rows needed for CSS grid
    const totalRows = Math.ceil(displayedCount / IMAGES_PER_LOAD) * ROWS_PER_BLOCK;

    return (
        <div className="p-4 lg:px-14 4xl:px-32 flex flex-col items-center">
            {/* Grid container for images */}
            <div className="grid w-full grid-cols-3 gap-8 mb-4 auto-rows-auto">
                {imagesToRender}
            </div>

            {/* Controls: Load More / Show Less buttons */}
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
                        className="px-4 py-2 bg-[#D95B24] text-white shadow-lg"
                    >
                        Load More
                    </button>
                )}
            </div>

            {/* Modal overlay for image preview */}
            {isModalOpen && (
                // Overlay: click outside inner container closes modal
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    {/* Close button at top-right of overlay */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-white text-3xl z-60"
                    >
                        ×
                    </button>
                    {/* Inner container: stop propagation to prevent closing when clicking inside */}
                    <div
                        className="relative max-w-3xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Previous image */}
                        <button
                            onClick={showPrev}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[#D95B24] hover:text-white p-2 rounded"
                        >
                            ‹
                        </button>
                        {/* Display current image */}
                        <img
                            src={visibleImages[currentIndex].src}
                            alt={visibleImages[currentIndex].alt}
                            className="w-full h-auto object-contain"
                        />
                        {/* Next image */}
                        <button
                            onClick={showNext}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[#D95B24] hover:text-white p-2 rounded"
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
