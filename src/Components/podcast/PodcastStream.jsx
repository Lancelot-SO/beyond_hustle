/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React from 'react'
import streambg from "../../assets/podcast/streambg.png"
import stream1 from "../../assets/podcast/stream1.png"
import stream2 from "../../assets/podcast/stream2.png"
import stream3 from "../../assets/podcast/stream3.png"
import stream4 from "../../assets/podcast/stream4.png"
import lines from "../../assets/book/lines2.png"

import { motion } from 'framer-motion';


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

                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <motion.img
                            src={stream1}
                            alt="Featured in logos"
                            loading="lazy"
                            className="object-cover hover:opacity-100 transition-opacity duration-300"
                            variants={itemVariants}
                        />
                        <motion.img
                            src={stream2}
                            alt="Featured in logos"
                            loading="lazy"
                            className="object-cover hover:opacity-100 transition-opacity duration-300"
                            variants={itemVariants}
                        />
                        <motion.img
                            src={stream3}
                            alt="Featured in logos"
                            loading="lazy"
                            className="object-cover hover:opacity-100 transition-opacity duration-300"
                            variants={itemVariants}
                        />
                        <motion.img
                            src={stream4}
                            alt="Featured in logos"
                            loading="lazy"
                            className="object-cover hover:opacity-100 transition-opacity duration-300"
                            variants={itemVariants}
                        />
                    </div>

                </motion.div>
            </section>
        </div>
    )
}

export default PodcastStream