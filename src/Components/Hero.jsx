/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import herobg from "../assets/hero/herobg.png"

const Hero = () => {
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
            <div className="mt-[100px] md:mt-[80px] lg:mt-[100px]">
                <div className="relative">
                    {/* hero image shrinks height on smaller breakpoints */}
                    <img
                        src={herobg}
                        alt="Hero Image"
                        className="w-full h-[300px] lg:h-full object-cover"
                    />

                    {/* headline container */}
                    <div
                        className="
              absolute
              top-12 md:top-16 lg:top-24 tablet:top-12 tablet:left-10
              left-4 lg:left-14 4xl:left-32
              w-[340px] md:w-[500px] lg:w-[615px]
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
                            Go <span className="text-[#F4E8D3]">Beyond</span> the Hustle.<br />
                            <span className="text-[#F4E8D3]">Build Boldly.</span> Lead<br />
                            Intentionally.
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
              w-full lg:w-[607px] tablet:w-[450px]
              px-4 lg:px-0
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
                            Consider what your life would look like if you lived more loyal to your dreams … and less influenced by your fears.
                            What started as a book has grown to a global community and a meaningful movement.
                            Dig in to explore how to begin playing bigger in the ways that matter most to you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
