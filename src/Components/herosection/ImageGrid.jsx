/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Gal1 from "../../assets/hero/gal1.png"
import Gal2 from "../../assets/hero/gal2.png"
import Gal3 from "../../assets/hero/gal3.png"
import Gal4 from "../../assets/hero/gal4.png"
import Gal5 from "../../assets/hero/gal5.png"
import Gal6 from "../../assets/hero/gal6.png"



export default function ImageGrid() {
    const images = [
        // Top Row
        {
            src: Gal1,
            alt: "Woman with yellow glasses",
            colSpanClass: "lg:col-span-1",
            aspectRatioClass: "pb-[125%]",
        },
        {
            src: Gal2,
            alt: "Woman with large afro",
            colSpanClass: "lg:col-span-1",
            aspectRatioClass: "pb-[125%]",
        },
        {
            src: Gal3,
            alt: "Man and woman in podcast studio",
            colSpanClass: "lg:col-span-2",
            aspectRatioClass: "pb-[75%]",
        },

        // Bottom Row
        {
            src: Gal4,
            alt: "Woman in a large hat",
            colSpanClass: "lg:col-span-1",
            aspectRatioClass: "pb-[125%]",
        },
        {
            src: Gal5,
            alt: "Woman with braided hair reading",
            colSpanClass: "lg:col-span-2",
            aspectRatioClass: "pb-[75%]",
        },
        {
            src: Gal6,
            alt: "Woman in library",
            colSpanClass: "lg:col-span-1",
            aspectRatioClass: "pb-[125%]",
        },
    ];


    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const showPrev = () => {
        setCurrentIndex((idx) => (idx === 0 ? images.length - 1 : idx - 1));
    };

    const showNext = () => {
        setCurrentIndex((idx) => (idx === images.length - 1 ? 0 : idx + 1));
    };

    return (
        <section className="w-full py-12 md:py-16 lg:py-24 bg-[#1C2237] text-gray-200">
            <div className="container mx-auto text-center">
                <div className="text-center flex flex-col items-center justify-center space-y-4 mb-12 md:mb-16">
                    <h2 className="text-[40px] font-playfair font-light leading-[50px] text-white">Moments from the Journey</h2>
                    <div className='h-[2px] w-[100px] bg-[#D95B24] flex justify-center'></div>
                    <p className="text-[15px] text-[#F5F3EF] font-openSans font-normal leading-[25px]">
                        There are plenty of ways to start playing big, sharing your voice, and finding more fulfillment in life and work.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 px-4 lg:px-14 mx-auto">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`relative w-full overflow-hidden rounded-lg cursor-pointer ${image.colSpanClass} ${image.aspectRatioClass}`}
                            onClick={() => openModal(index)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

                <button className="mt-12 px-8 py-3 text-lg bg-[#D95B24] hover:bg-orange-700 text-white shadow-lg">
                    View More
                </button>

                {/* Modal Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                        <div className="relative bg-[#1C2237] rounded-lg overflow-hidden ">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-white text-2xl font-bold focus:outline-none"
                            >
                                ×
                            </button>
                            <img
                                src={images[currentIndex].src}
                                alt={images[currentIndex].alt}
                                className=" object-cover"
                            />
                            {/* Navigation */}
                            <button
                                onClick={showPrev}
                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                            >
                                ‹
                            </button>
                            <button
                                onClick={showNext}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                            >
                                ›
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
