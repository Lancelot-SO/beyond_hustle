/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import contactbg from "../assets/contact/contactbg.png"

const Contact = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        })
    }, [])

    return (
        <div className="">
            {/* adjust top‑margin per screen size */}
            <div className="mt-[80px] md:mt-[100px] lg:mt-[120px]">
                <div className="relative">
                    {/* hero image with responsive height */}
                    <img
                        src={contactbg}
                        alt="Hero Image"
                        className="w-full h-[250px] md:h-[400px] lg:h-full object-cover"
                    />

                    {/* headline container */}
                    <div
                        className="
              absolute
              top-12 md:top-16 lg:top-20
              left-4 md:left-10 lg:left-14 4xl:left-32
              w-full max-w-xs md:max-w-md lg:max-w-lg
              h-auto
            "
                    >
                        <h1
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="
                font-playfair text-white
                text-[24px] md:text-[48px] lg:text-[64px]
                leading-[28px] md:leading-[48px] lg:leading-[72px]
                font-normal tracking-[-5%]
              "
                        >
                            Get In   <span className="text-[#F4E8D3]">Touch</span><br />
                            <span className="text-[#F4E8D3]">With Us</span>
                        </h1>
                    </div>

                    {/* sub‑copy: right‑aligned */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="400"
                        className="
              absolute
              bottom-4 md:bottom-10 lg:bottom-12
              right-4 md:right-10 lg:right-14 xl:right-32
              w-full max-w-xs md:max-w-md lg:max-w-lg
              px-2 lg:px-0
              text-right
            "
                    >
                        <p
                            className="
                text-white italic
                font-normal
                text-[12px] md:text-[16px]
                leading-[16px] md:leading-[28px]
                font-openSans 
              "
                        >
                            We love hearing from our global community of readers, course graduates, and colleagues every day.
                            If you are inquiring about a speaking engagement, interview with Tara, or bringing Playing Big to your organization, we look forward to talking with you. Please fill out the contact form below

                        </p>
                    </div>
                </div>
            </div>

            <section>
                <div className="min-h-screen flex items-center justify-center bg-[#FCF8F1] py-12 px-4 lg:px-8">
                    <div className="w-full lg:w-[800px] space-y-2 text-center px-4">
                        <div className="space-y-2">
                            <h1 className="text-[32px] md:text-[43px] font-playfair text-light leading-[38px] md:leading-[50px]">
                                Contact Dr. Boahemaa & Team
                            </h1>
                            <div className="w-24 h-1 bg-[#D95B24] mx-auto" />
                        </div>
                        <p className="text-muted-foreground text-[14px] md:text-[16px] font-normal leading-[20px] md:leading-[25px] font-openSans">
                            You can reach out to our team via email at{' '}
                            <a
                                href="mailto:Dr.boahemaa&team@gmail.com"
                                className="text-[#D95B24] italic hover:underline"
                            >
                                Dr.boahemaa&team@gmail.com
                            </a>
                            , or use the contact form below.
                        </p>
                        <form className="mt-8 space-y-6 px-2">
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="first-name" className="sr-only">
                                        First Name
                                    </label>
                                    <input
                                        id="first-name"
                                        name="first-name"
                                        type="text"
                                        autoComplete="given-name"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#D95B24] placeholder-muted-foreground text-foreground focus:outline-none focus:ring-[#D95B24] focus:border-[#D95B24] text-sm"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="pt-4">
                                    <label htmlFor="last-name" className="sr-only">
                                        Last Name
                                    </label>
                                    <input
                                        id="last-name"
                                        name="last-name"
                                        type="text"
                                        autoComplete="family-name"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#D95B24] placeholder-muted-foreground text-foreground focus:outline-none focus:ring-[#D95B24] focus:border-[#D95B24] text-sm"
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div className="pt-4">
                                    <label htmlFor="email-address" className="sr-only">
                                        Email
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#D95B24] placeholder-muted-foreground text-foreground focus:outline-none focus:ring-[#D95B24] focus:border-[#D95B24] text-sm"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="pt-4">
                                    <label htmlFor="message" className="sr-only">
                                        Enter Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#D95B24] placeholder-muted-foreground text-foreground focus:outline-none focus:ring-[#D95B24] focus:border-[#D95B24] text-sm resize-y"
                                        placeholder="Enter Your Message"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-[#D95B24] text-sm font-medium text-white bg-[#D95B24] hover:bg-[#D95B24]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D95B24]"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
