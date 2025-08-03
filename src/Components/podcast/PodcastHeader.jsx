/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'

import gallerybg from "../../assets/gallery/gallerybg.png"
import PodcastPhotos from './PodcastPhotos'
import NewCard from '../NewCard'
import BottomSection from '../herosection/BottomSection'

const PodcastHeader = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        })
    }, [])
    return (
        <div>
            <div className="mt-[100px] md:mt-[80px] lg:mt-[100px]">
                <div className="relative">
                    {/* hero image shrinks height on smaller breakpoints */}
                    <img
                        src={gallerybg}
                        alt="Hero Image"
                        className="w-full h-[300px] lg:h-full object-cover"
                        loading='lazy'
                    />

                    {/* headline container */}
                    <div
                        className="
                                              absolute
                                              top-[50%] md:top-16 lg:top-48
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
                            Podcast Gallery
                        </h1>
                    </div>


                </div>
            </div>
            {/* Title with flanking lines */}
            <div className="flex items-center justify-center my-12 px-4 lg:px-14 4xl:px-32">
                <div className="flex-1 h-px bg-[#B7AE9E]" />
                <h2 className="px-6 font-playfair text-2xl font-semibold">
                    <span className="text-[#D95B24] font-playfair">Podcast</span> Collection
                </h2>
                <div className="flex-1 h-px bg-[#B7AE9E]" />
            </div>

            <PodcastPhotos />
            <NewCard />
            <BottomSection />
        </div>
    )
}

export default PodcastHeader