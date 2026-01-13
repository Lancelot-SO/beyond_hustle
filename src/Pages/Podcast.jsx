/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import podcastbg from "../assets/podcast/podcastbg.png"
import AOS from 'aos'
import 'aos/dist/aos.css'
import PodcastTop from '../Components/podcast/PodcastTop'
import MainPodcast from '../Components/podcast/MainPodcast'
import LessonsGrid from '../Components/LessonsGrid'
import PodcastStream from '../Components/podcast/PodcastStream'
import BottomSection from '../Components/herosection/BottomSection'

const Podcast = () => {
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
            <div className="mt-[150px] md:mt-[80px] lg:mt-[100px]">
                <div className="relative">
                    {/* hero image shrinks height on smaller breakpoints */}
                    <img
                        src={podcastbg}
                        alt="Hero Image"
                        className="w-full h-[300px] lg:h-full object-cover"
                    />

                    {/* headline container */}
                    <div
                        className="
                                              absolute
                                              top-[50%] md:top-16 lg:top-48
                                              left-4 lg:left-14 4xl:left-32
                                              w-[340px] md:w-[500px] lg:w-[665px]
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
                            <span className='text-[#F4E8D3] font-playfair'>Beyond The Hustle</span> podcast
                        </h1>
                    </div>


                </div>
            </div>

            <PodcastTop />
            <MainPodcast />
            <LessonsGrid />
            <PodcastStream />
            <BottomSection />
        </div>
    )
}

export default Podcast