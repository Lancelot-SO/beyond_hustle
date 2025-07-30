/* eslint-disable no-unused-vars */
import React from 'react'
import shine2 from "../../assets/hero/shine2.png"

export default function BottomSection() {
    return (
        <div className="relative min-h-screen bg-[#FCF8F1] py-2 px-4 md:px-8 lg:px-16 flex items-center md:justify-center overflow-hidden">
            {/* Decorative elements */}
            <img
                src={shine2}
                alt="Decorative star shape"
                loading='lazy'
                className="absolute top-8 right-4 md:right-20 opacity-50 w-16 lg:w-auto"
            />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 md:items-center">
                {/* Left Column: Text Content */}
                <div className="space-y-4 text-center md:text-left w-full md:w-[850px] h-auto">
                    <div className="relative pb-12">
                        <h1 className="text-3xl md:text-[64px] w-full md:w-[510px] font-playfair font-semibold text-[#D95B24] leading-snug md:leading-[74px]">
                            Get tips, updates, & <br />exclusive content
                        </h1>

                        <p className="absolute top-24 left-4 md:left-20 md:text-[24px] text-[16px] font-playfair font-normal md:leading-[34px] tracking-[2%]">
                            Join And Get A Free Guide To Purpose-Driven Leadership.
                        </p>
                    </div>

                    <p className="text-base text-secondary-text max-w-md mx-auto md:mx-0">
                        You&apos;ll receive articles &amp; resources to support your wellbeing and your playing big. Plus you&apos;ll be
                        the first to know about our upcoming events and programs.
                    </p>
                </div>

                {/* Right Column: Form */}
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-[#F3CCBB] w-full md:mx-0">
                    <form className="grid gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="w-full h-12 border-b-2 border-b-[#F3CCBB] focus:outline-none focus:border-b-[#D95B24] px-4 rounded-none"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="w-full h-12 border-b-2 border-b-[#F3CCBB] focus:outline-none focus:border-b-[#D95B24] px-4 rounded-none"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full h-12 border-b-2 border-b-[#F3CCBB] focus:outline-none focus:border-b-[#D95B24] px-4 rounded-none"
                        />
                        <textarea
                            name="message"
                            placeholder="Your message"
                            rows={4}
                            className="w-full h-24 border-b-2 border-b-[#F3CCBB] focus:outline-none focus:border-b-[#D95B24] px-4 rounded-none resize-none"
                        />
                        <button
                            type="submit"
                            className="w-full h-12 bg-[#D95B24] text-white hover:bg-[#D95B24]/90 rounded"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
