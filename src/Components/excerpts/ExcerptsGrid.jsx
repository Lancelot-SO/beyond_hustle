/* eslint-disable no-unused-vars */
// LaunchPhotosWithModal.js

import React, { useState } from 'react';

// Import your first 16 real assets
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
    { id: 1, src: bh1, alt: "launch 1" },
    { id: 2, src: bh2, alt: "bh 2" },
    { id: 3, src: bh3, alt: "bh 3" },
    { id: 4, src: bh4, alt: "bh 4" },
    { id: 5, src: bh5, alt: "bh 5" },
    { id: 6, src: bh6, alt: "bh 6" },
    { id: 7, src: bh7, alt: "bh 7" },
    { id: 8, src: bh8, alt: "bh 8" },
    { id: 9, src: bh9, alt: "bh 9" },
    { id: 10, src: bh10, alt: "bh 10" },
    { id: 11, src: bh11, alt: "bh 11" },
    { id: 12, src: bh12, alt: "bh 12" },
    { id: 13, src: bh13, alt: "bh 13" },
    { id: 14, src: bh14, alt: "bh 14" },
    { id: 15, src: bh15, alt: "bh 15" },
    { id: 16, src: bh16, alt: "bh 16" },
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

export default function ExcerptsGrid() {
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
                    "flex items-center justify-center bg-white rounded font-bold relative " +
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
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[#D95B24] hover:text-white p-2
                            tablet:p-4 rounded-full"
                        >
                            ‹
                        </button>
                        {/* Display current image */}
                        <img
                            src={visibleImages[currentIndex].src}
                            alt={visibleImages[currentIndex].alt}
                            className="w-full h-auto tablet:h-[600px] object-contain"
                        />
                        {/* Next image */}
                        <button
                            onClick={showNext}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[#D95B24] hover:text-white p-2
                            tablet:p-4 rounded-full"
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
