/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import shine2 from "../../assets/hero/shine2.png"
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function BottomSection() {
    const form = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        emailjs
            .sendForm(
                'service_4xrq8cm',    // from your EmailJS dashboard
                'template_4icxuuv',   // the template that uses {{firstName}}, {{lastName}}, {{email}}, {{message}}
                form.current,
                '4P5dgekPUp0iljE8X'     // or user ID
            )
            .then(
                () => {
                    toast.success('Thanks! Your request has been submitted.')
                    form.current.reset()
                },
                () => {
                    toast.error('Oops — something went wrong. Please try again.')
                }
            )
    }

    return (
        <div className="relative min-h-screen bg-[#FCF8F1] py-2 px-4 lg:px-14 flex  overflow-hidden">
            {/* Decorative */}
            <img
                src={shine2}
                alt="Decorative star shape"
                loading="lazy"
                className="absolute top-8 right-4 md:right-20 opacity-50 w-16 lg:w-auto"
            />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 md:items-center">
                {/* Text */}
                <div className="space-y-4 text-center md:text-left lg:w-[800px]">
                    <div className="relative pb-12">
                        <h1 className="text-3xl md:text-[64px] font-playfair font-semibold text-[#D95B24] leading-snug">
                            Get tips, updates,<br className='hidden md:block' /> & <br />exclusive content
                        </h1>
                        <p className="absolute md:top-28 top-24 left-4 md:left-20 text-[16px] md:text-[24px] font-playfair tracking-[2%]">
                            Join And Get A Free Guide To Purpose-Driven Leadership.
                        </p>
                    </div>
                    <p className="text-base text-secondary-text max-w-md mx-auto md:mx-0">
                        You’ll receive articles & resources to support your wellbeing and your playing big. Plus you’ll be the first to know about our upcoming events and programs.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-[#F3CCBB]">
                    <form ref={form} onSubmit={handleSubmit} className="grid gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            required
                            className="w-full h-12 border-b-2 border-b-[#F3CCBB] focus:outline-none focus:border-b-[#D95B24] px-4"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            required
                            className="w-full h-12 border-b-2 border-b-[#F3CCBB] focus:outline-none focus:border-b-[#D95B24] px-4"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="w-full h-12 border-b-2 border-b-[#F3CCBB] focus:outline-none focus:border-b-[#D95B24] px-4"
                        />
                        <textarea
                            name="message"
                            placeholder="Your message"
                            rows={4}
                            className="w-full h-24 border-b-2 border-b-[#F3CCBB] focus:outline-none focus:border-b-[#D95B24] px-4 resize-none"
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

            {/* Toasts */}
            <ToastContainer position="bottom-right" />
        </div>
    )
}
