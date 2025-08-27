/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import contactbg from "../assets/contact/contactbg.png"

const Contact = () => {
    const form = useRef(null)

    // Scroll & AOS
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        AOS.init({ duration: 800, once: true, easing: 'ease-in-out' })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        emailjs
            .sendForm(
                'service_4xrq8cm',
                'template_4icxuuv',
                form.current,
                '4P5dgekPUp0iljE8X'
            )
            .then(
                () => {
                    toast.success('Your message has been sent!')
                    form.current.reset()
                },
                () => {
                    toast.error('Something went wrong. Please try again.')
                }
            )
    }

    return (
        <div>
            {/* Hero */}
            <div className="mt-[80px] md:mt-[100px] lg:mt-[120px] relative">
                <img
                    src={contactbg}
                    alt="Hero"
                    className="w-full h-[250px] md:h-[400px] lg:h-full object-cover"
                />
                <div className="absolute top-12 md:top-16 lg:top-20 left-4 md:left-10 lg:left-14 w-full max-w-lg">
                    <h1
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="font-playfair text-white text-[24px] md:text-[48px] lg:text-[64px] leading-tight tracking-[-5%]"
                    >
                        Get In <span className="text-[#F4E8D3]">Touch</span><br />
                        <span className="text-[#F4E8D3]">With Us</span>
                    </h1>
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-delay="400"
                    className="absolute bottom-4 md:bottom-10 lg:bottom-12 right-4 md:right-10 lg:right-14 text-right max-w-lg"
                >
                    <p className="text-white italic text-[12px] md:text-[16px] font-openSans">
                        We love hearing from our global community…<br />
                        If you’re inquiring about speaking, an interview, or hosting a Playing Big event, please fill out the form below.
                    </p>
                </div>
            </div>

            {/* Form */}
            <section className="min-h-screen flex items-center justify-center bg-[#FCF8F1] py-12 px-4 lg:px-8">
                <div className="w-full lg:w-[800px] space-y-2 text-center px-4">
                    <div className="space-y-2">
                        <h1 className="text-[32px] md:text-[43px] font-playfair text-light">
                            Contact Dr. Boahemaa & Team
                        </h1>
                        <div className="w-24 h-1 bg-[#D95B24] mx-auto" />
                    </div>
                    <p className="text-muted-foreground text-[14px] md:text-[16px] font-openSans">
                        Or email us at{' '}
                        <a href="mailto:Dr.boahemaa&team@gmail.com" className="text-[#D95B24] italic hover:underline">
                            Dr.boahemaa&team@gmail.com
                        </a>
                    </p>

                    <form ref={form} onSubmit={handleSubmit} className="mt-8 space-y-6 px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="firstName"
                                type="text"
                                required
                                placeholder="First Name"
                                className="block w-full px-3 py-2 border border-[#D95B24] placeholder-muted-foreground text-sm focus:ring-[#D95B24] focus:border-[#D95B24]"
                            />
                            <input
                                name="lastName"
                                type="text"
                                required
                                placeholder="Last Name"
                                className="block w-full px-3 py-2 border border-[#D95B24] placeholder-muted-foreground text-sm focus:ring-[#D95B24] focus:border-[#D95B24]"
                            />
                        </div>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="Email Address"
                            className="block w-full px-3 py-2 border border-[#D95B24] placeholder-muted-foreground text-sm focus:ring-[#D95B24] focus:border-[#D95B24]"
                        />
                        <textarea
                            name="message"
                            rows={6}
                            required
                            placeholder="Your Message"
                            className="block w-full px-3 py-2 border border-[#D95B24] placeholder-muted-foreground text-sm focus:ring-[#D95B24] focus:border-[#D95B24]"
                        />

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-[#D95B24] text-white font-medium hover:bg-[#D95B24]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D95B24]"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default Contact
