/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import mailbg from "../assets/contact/mailbg.png"

export default function MailContact() {
    const form = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        // Populate the hidden field based on the checkbox
        const newsletterChecked = form.current.newsletter.checked
        form.current.newsletterAgreement.value = newsletterChecked
            ? "I agree to weekly newsletter"
            : ""

        emailjs
            .sendForm(
                'service_50j5zce',
                'template_us60peo',
                form.current,
                'od2vIhbdFel9_otjO'
            )
            .then(
                (result) => {
                    toast.success('Thanks! Your message has been sent.')
                    form.current.reset()
                },
                (error) => {
                    toast.error('Oops — something went wrong. Please try again.')
                }
            )
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <img
                src={mailbg}
                alt="Conference background"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
            />

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

                <form
                    ref={form}
                    onSubmit={handleSubmit}
                    className="bg-transparent p-6 md:p-8 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="h-12 text-base w-full px-4 border"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="h-12 text-base w-full px-4 border"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="h-12 text-base w-full px-4 border"
                            required
                        />
                        <input
                            type="tel"
                            name="telephone"
                            placeholder="Phone Number"
                            className="h-12 text-base w-full px-4 border"
                            required
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
                            className="text-sm font-medium text-white cursor-pointer"
                        >
                            Agree To Receive Our{' '}
                            <span className="text-[#D95B24]">Weekly Newsletters</span> From Us
                        </label>
                    </div>

                    {/* hidden field for the agreement message */}
                    <input type="hidden" name="newsletterAgreement" />

                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold bg-[#D95B24] text-white rounded hover:bg-[#D95B24]/90"
                    >
                        Let’s Connect
                    </button>
                </form>

                <ToastContainer position="bottom-right" />
            </div>
        </div>
    )
}
