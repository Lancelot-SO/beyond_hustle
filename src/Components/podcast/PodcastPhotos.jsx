/* eslint-disable no-unused-vars */
// LaunchPhotosWithModal.js

import React, { useState } from 'react';

// Import your first 16 real assets
import podcast1 from "../../assets/podcast/podcast1.png";
import podcast2 from "../../assets/podcast/podcast2.png";
import podcast3 from "../../assets/podcast/podcast3.png";
import podcast4 from "../../assets/podcast/podcast4.png";
import podcast5 from "../../assets/podcast/podcast5.png";
import podcast6 from "../../assets/podcast/podcast6.jpg";
import podcast7 from "../../assets/podcast/podcast7.png";
import podcast8 from "../../assets/podcast/podcast8.png";
import podcast9 from "../../assets/podcast/podcast9.png";
import podcast10 from "../../assets/podcast/podcast10.png";
import podcast11 from "../../assets/podcast/podcast11.png";
import podcast12 from "../../assets/podcast/podcast12.png";
import podcast13 from "../../assets/podcast/podcast13.png";
import podcast14 from "../../assets/podcast/podcast14.png";
import podcast15 from "../../assets/podcast/podcast15.jpg";
import podcast16 from "../../assets/podcast/podcast16.png";

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
    { id: 1, src: podcast1, alt: "podcast 1" },
    { id: 2, src: podcast2, alt: "podcast 2" },
    { id: 3, src: podcast3, alt: "podcast 3" },
    { id: 4, src: podcast4, alt: "podcast 4" },
    { id: 5, src: podcast5, alt: "podcast 5" },
    { id: 6, src: podcast6, alt: "podcast 6" },
    { id: 7, src: podcast7, alt: "podcast 7" },
    { id: 8, src: podcast8, alt: "podcast 8" },
    { id: 9, src: podcast9, alt: "podcast 9" },
    { id: 10, src: podcast10, alt: "podcast 10" },
    { id: 11, src: podcast11, alt: "podcast 11" },
    { id: 12, src: podcast12, alt: "podcast 12" },
    { id: 13, src: podcast13, alt: "podcast 13" },
    { id: 14, src: podcast14, alt: "podcast 14" },
    { id: 15, src: podcast15, alt: "podcast 15" },
    { id: 16, src: podcast16, alt: "podcast 16" },
    // Generate placeholders for remaining slots
    ...Array.from({ length: TOTAL_GALLERY_IMAGES - 16 }, (_, idx) => {
        const id = idx + 17;
        return {
            id,
            src: `/placeholder.svg?height=100&width=100&query=img${id}`,
            alt: `podcast ${id}`
        };
    })
];

export default function PodcastPhotos() {
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
