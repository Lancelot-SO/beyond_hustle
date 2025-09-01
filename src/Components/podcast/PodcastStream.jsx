/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React from 'react'
import streambg from "../../assets/podcast/streambg.png"
import stream1 from "../../assets/podcast/stream1.png"
import stream2 from "../../assets/podcast/stream2.png"
import stream3 from "../../assets/podcast/stream3.png"
import lines from "../../assets/book/lines2.png"

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'


const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const PodcastStream = () => {
    return (
        <div>
            <section
                className="relative bg-cover bg-center"
                style={{ backgroundImage: `url(${streambg})` }}
            >
                <motion.div
                    className="relative z-10 max-w-3xl lg:h-[434px] mx-auto px-6 py-16 md:py-32 text-center"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <div className='flex flex-col items-center justify-center gap-4 mb-10'>
                        <motion.h3 className='font-playfair font-semibold text-[40px] leading-[54px] tracking-[-5%] text-white'>Listen On Your<span className='text-[#D95B24] font-playfair'> Favorite Podcast</span> App:</motion.h3>
                        <motion.img
                            src={lines}
                            alt="Featured in logos"
                            loading="lazy"
                            className="object-cover hover:opacity-100 transition-opacity duration-300"
                            variants={itemVariants}
                        />

                    </div>

                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 place-items-center">
                            <Link
                                to="https://open.spotify.com/show/2cpDkr2fWys1kTJtjhCLst?si=nof6mz0lS1-3nLgimdNmWA"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <motion.img
                                    src={stream1}
                                    alt="Spotify"
                                    loading="lazy"
                                    className="object-cover hover:opacity-100 transition-opacity duration-300 w-28 md:w-32"
                                    variants={itemVariants}
                                />
                            </Link>

                            <Link to="https://bthustlegh.substack.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <motion.img
                                    src={stream2}
                                    alt="Apple Podcasts"
                                    loading="lazy"
                                    className="object-cover hover:opacity-100 transition-opacity duration-300 w-28 md:w-32"
                                    variants={itemVariants}
                                />
                            </Link>


                            <Link
                                to="https://www.youtube.com/@bthustlegh"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <motion.img
                                    src={stream3}
                                    alt="Google Podcasts"
                                    loading="lazy"
                                    className="object-cover hover:opacity-100 transition-opacity duration-300 w-28 md:w-32"
                                    variants={itemVariants}
                                />
                            </Link>
                        </div>
                    </div>


                </motion.div>
            </section>
        </div>
    )
}

export default PodcastStream