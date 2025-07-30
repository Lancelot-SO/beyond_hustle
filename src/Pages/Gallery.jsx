/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'


import AOS from 'aos'
import 'aos/dist/aos.css'
import gallerybg from "../assets/gallery/gallerybg.png"
import { Link } from 'react-router-dom'
import BottomSection from '../Components/herosection/BottomSection'

const MotionLink = motion(Link)


const items = [
    { title: 'Book Launch', image: gallerybg, link: '/books' },
    { title: 'Speaking & Event', image: gallerybg, link: '/gallery' },
    { title: 'Webinar', image: gallerybg, link: '/gallery' },
    { title: 'Podcast', image: gallerybg, link: '/gallery' },
    { title: 'Image', image: gallerybg, link: '/gallery', span: 2 },
]

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}


export default function Gallery() {
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
                    />

                    {/* headline container */}
                    <div
                        className="
                          absolute
                          top-[50%] md:top-16 lg:top-24
                          left-4 lg:left-14 4xl:left-32
                          w-[340px] md:w-[500px] lg:w-[415px]
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
                            Media & Gallery
                        </h1>
                    </div>


                </div>
            </div>

            <section className="py-16 bg-[#ffffff]">
                <div className=" mx-auto px-4 lg:px-14 4xl:px-32">
                    {/* Title with flanking lines */}
                    <div className="flex items-center justify-center mb-12">
                        <div className="flex-1 h-px bg-[#B7AE9E]" />
                        <h2 className="px-6 font-playfair text-2xl font-semibold">
                            <span className="text-[#D95B24]">Explore</span> Our <span className="text-[#D95B24]">Gallery</span> Collection
                        </h2>
                        <div className="flex-1 h-px bg-[#B7AE9E]" />
                    </div>

                    {/* Animated grid of links */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {items.map((item, idx) => (
                            <MotionLink
                                key={idx}
                                to={item.link}
                                className={`relative overflow-hidden ${item.span === 2 ? 'md:col-span-2' : ''} h-64`}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03 }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-[#D95B24] text-white px-6 py-2 font-semibold">
                                        {item.title}
                                    </span>
                                </div>
                            </MotionLink>
                        ))}
                    </motion.div>
                </div>
            </section>

            <BottomSection />
        </div>
    );
}
