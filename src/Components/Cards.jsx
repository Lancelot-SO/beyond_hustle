/* eslint-disable no-unused-vars */
import React from 'react';
import gallery2 from "../assets/gallery/gallery2.png"
import gallery3 from "../assets/gallery/gallery4.png"
import gallery4 from "../assets/gallery/gallery3.png"

export default function Cards() {
    const cards = [
        {
            imageSrc: gallery3,
            buttonText: "Podcast",
            linkHref: "/podcastphotos",
        },
        {
            imageSrc: gallery2,
            buttonText: "Speaking & Event",
            linkHref: "/events",
        },
        {
            imageSrc: gallery4,
            buttonText: "Webinar",
            linkHref: "/webinars",
        },
    ];

    return (
        <section className="w-full py-12 md:py-24 lg:py-32  bg-white">
            <div className="container px-4 lg:px-14 4xl:px-32">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-serif font-bold tracking-tight text-[#D95B24] sm:text-4xl">
                        You May Also Like
                    </h2>
                    <a
                        href="/gallery"
                        className="text-[#D95B24] hover:underline text-sm font-medium"
                    >
                        View All
                    </a>
                </div>
                {/* Updated grid: 4 columns on lg to allow 3rd card to span 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => {
                        // Make the third card span 2 columns on large screens
                        const spanClass = index === 2 ? 'lg:col-span-2' : '';
                        return (
                            <div
                                key={index}
                                className={`relative w-full h-80 rounded-xl overflow-hidden group ${spanClass}`}
                            >
                                <img
                                    src={card.imageSrc}
                                    alt='pod'
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading='lazy'

                                />
                                <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                                    <a
                                        href={card.linkHref}
                                        className="bg-[#D95B24] hover:bg-[#D95B24]/90 text-white px-8 py-2 text-lg font-semibold rounded-md"
                                    >
                                        {card.buttonText}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
