/* eslint-disable no-unused-vars */
import React from 'react'
import mailbg from "../assets/contact/mailbg.png"

export default function MailContact() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background image */}
            <img
                src={mailbg}
                alt="Conference background"
                className="absolute inset-0 w-full h-full object-cover"
                loading='lazy'

            />



            {/* Form container */}
            <div className="relative z-10 w-full max-w-3xl p-6 md:p-8 lg:p-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-playfair text-[#F4E8D3] mb-4">
                    Book A Session With Us
                    <span className="block w-24 h-1 bg-[#D95B24] mx-auto mt-2" />
                </h1>
                <p className="text-gray-200 mb-8 text-lg">
                    You can reach out to our team via email at{' '}
                    <a
                        href="mailto:Dr.boahemaa&team@gmail.com"
                        className="text-[#D95B24] hover:underline"
                    >
                        Dr.boahemaa&team@gmail.com
                    </a>
                    , or use the contact form below.
                </p>

                <form className="bg-transparent p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="h-12 text-base w-full px-4 border"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="h-12 text-base w-full px-4 border"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="h-12 text-base w-full px-4 border"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            required
                            className="h-12 text-base w-full px-4 border"
                        />
                    </div>

                    <textarea
                        name="message"
                        placeholder="Message (Required)"
                        required
                        className="min-h-[120px] text-base w-full px-4 py-2 border resize-none"
                    />

                    <div className="flex items-center justify-center md:justify-start space-x-2">
                        <input
                            type="checkbox"
                            id="newsletter"
                            name="newsletter"
                            className="border-[#D95B24] rounded text-[#D95B24] focus:ring-[#D95B24]"
                        />
                        <label
                            htmlFor="newsletter"
                            className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                            Agree To Receive Our <span className="text-[#D95B24]">Weekly Newsletters</span> From Us
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold bg-[#D95B24] text-white rounded hover:bg-[#D95B24]/90"
                    >
                        Lets Connect
                    </button>
                </form>
            </div>
        </div>
    )
}
