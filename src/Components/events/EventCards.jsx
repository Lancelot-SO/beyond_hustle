/* eslint-disable no-unused-vars */
import React from 'react';

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
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="w-full md:flex-1 bg-[#F5E4C4] px-6 md:px-12 py-8 md:h-[407px] flex items-center justify-center">
                    <h3 className="font-playfair font-semibold text-[#1C2237] text-[18px] md:text-[24px] text-center">
                        The Power Of Breakthrough Thinking
                    </h3>
                </div>
                <div className="w-full md:flex-1 bg-[#F5E4C4] px-6 md:px-12 py-8 md:h-[407px] flex items-center justify-center">
                    <h3 className="font-playfair font-semibold text-[#1C2237] text-[18px] md:text-[24px] text-center">
                        Built To Belong: Community Over Competition
                    </h3>
                </div>
                <div className="w-full md:flex-[1.6] bg-[#F5E4C4] px-6 md:px-12 py-8 md:h-[407px] flex items-center justify-center">
                    <h3 className="font-playfair font-semibold text-[#1C2237] text-[18px] md:text-[24px] text-center">
                        Bold And Boundless Courage
                    </h3>
                </div>
            </div>
        </section>
    );
}
