/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'


import AOS from 'aos'
import 'aos/dist/aos.css'
import gallerybg from "../assets/gallery/gallerybg.png"
import gallery1 from "../assets/gallery/gallery1.png"
import gallery2 from "../assets/gallery/gallery2.png"
import gallery3 from "../assets/gallery/gallery3.png"
import gallery4 from "../assets/gallery/gallery4.png"
import gallery5 from "../assets/gallery/gallery5.png"

import { Link } from 'react-router-dom'
import BottomSection from '../Components/herosection/BottomSection'
import { useContent } from '../lib/useContent'
import { storageUrl } from '../lib/cmsClient'
import { useScrollToHash } from '../lib/useScrollToHash'

const MotionLink = motion(Link)


// Static fallback shown until the CMS responds (or if it is unreachable).
const fallbackItems = [
    { title: 'Book Launch', image: gallery1, link: '/launch' },
    { title: 'Speaking & Event', image: gallery2, link: '/events' },
    { title: 'Webinar', image: gallery3, link: '/webinars' },
    { title: 'Podcast', image: gallery4, link: '/podcastphotos' },
    { title: 'Excerpts from Beyond The Hustle', image: gallery5, link: '/excerpts', span: 2 },
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
    const apiItems = useContent('gallery', null)

    const items = apiItems
        ? apiItems.map((item, index) => ({
            title: item.title,
            link: item.link || '#',
            span: item.is_wide ? 2 : undefined,
            // Uploaded image wins; otherwise reuse the bundled image that
            // matches this slot, if there is one.
            image: storageUrl(item.image_path) || fallbackItems[index]?.image || null,
        }))
        : fallbackItems

    useScrollToHash('gallery-grid')

    // Scroll to top when component mounts (unless a section anchor is targeted)
    useEffect(() => {
        if (window.location.hash) return;
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
                        src={gallerybg}
                        alt="Hero Image"
                        className="w-full h-[300px] lg:h-full object-cover"
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
                            Media & Gallery
                        </h1>
                    </div>


                </div>
            </div>

            <section id="gallery-grid" className="py-16 bg-[#ffffff] scroll-mt-[110px]">
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
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {items.map((item, idx) => (
                            <MotionLink
                                key={idx}
                                to={item.link}
                                className={`relative overflow-hidden ${item.span === 2 ? 'md:col-span-2' : ''} h-[479px]`}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03 }}
                            >
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[#1C2237] to-[#D95B24]" />
                                )}
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
