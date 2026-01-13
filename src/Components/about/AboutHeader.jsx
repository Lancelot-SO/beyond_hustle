/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import aboutbg from "../../assets/about/aboutbg.png"
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
            <div className="mt-[150px] md:mt-[80px] lg:mt-[100px]">
                <div className="relative">
                    {/* hero image shrinks height on smaller breakpoints */}
                    <img
                        src={aboutbg}
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
              w-[340px] md:w-[500px] lg:w-[775px]
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
                            Let’s create a more sane and compassionate world throughwomen’s leadership.

                        </h1>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Hero
