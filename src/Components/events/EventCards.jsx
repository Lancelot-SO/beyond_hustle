/* eslint-disable no-unused-vars */
import React from 'react';
import Cards from './Cards';

export default function EventCard() {
    return (
        <section className="py-16 px-4 lg:px-14 4xl:px-32 bg-white">
            {/* Heading */}
            <div className="flex items-center justify-center mb-12">
                <div className="flex-grow border-t border-gray-300 mx-4"></div>
                <h2 className="font-playfair font-semibold text-[#1C2237] text-[20px] md:text-[40px]">
                    Signature <span className="text-[#D95B24]">Talks &</span> Events
                </h2>
                <div className="flex-grow border-t border-gray-300 mx-4"></div>
            </div>

            {/* Cards with third 60% wider */}
            <Cards />
        </section>
    );
}
