/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import top from "../../assets/contact/contactbg.png"

const TopSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        })
    }, [])

    return (
        <div>
            {/* adjust top‑margin per screen size */}
            <div className="mt-[150px] md:mt-[80px] lg:mt-[100px]">
                <div className="relative">
                    {/* hero image shrinks height on smaller breakpoints */}
                    <img
                        src={top}
                        alt="Hero Image"
                        className="w-full h-[300px] lg:h-full object-cover"
                        loading='lazy'
                    />

                    {/* headline container */}
                    <div
                        className="
              absolute
              top-12 md:top-16 lg:top-24
              left-4 lg:left-14 4xl:left-32
              w-[340px] md:w-[500px] lg:w-[685px]
              h-auto md:h-auto lg:h-[216px]
            "
                    >
                        <h1
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="
                font-playfair text-white
                text-[32px] md:text-[48px] lg:text-[64px]
                leading-[24px] md:leading-[36px] lg:leading-[72px]
                font-normal tracking-[-5%]
              "
                        >
                            Beyond the hustle is More <br />
                            than just a Book

                        </h1>
                    </div>

                    {/* sub‑copy: right‑aligned */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="400"
                        className="
              absolute
              bottom-4 md:bottom-6 lg:bottom-10
              right-4 lg:right-14 4xl:right-32
              w-full lg:w-[607px]
              px-6 lg:px-0
              text-right
              h-auto md:h-auto lg:h-[112px]
            "
                    >
                        <p
                            className="
                text-white italic
                font-normal
                text-[12px] md:text-[16px]
                leading-[14px] md:leading-[28px]
                font-openSans
              "
                        >
                            We love hearing from our global community of readers, course graduates, and colleagues every day.
                            If you are inquiring about a speaking engagement, interview with Tara, or bringing Playing Big to your organization, we look forward to talking with you. Please fill out the contact form below

                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopSection
