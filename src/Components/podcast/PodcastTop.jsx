/* eslint-disable no-unused-vars */
import React from 'react'
import top from "../../assets/podcast/podcasttop.png"
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const PodcastTop = () => {
    return (
        <div>
            <section className="flex flex-col md:flex-row items-center">

                {/* Image on the left */}
                <div className="flex-1">
                    <img
                        src={top}
                        alt="Portrait of woman in red lace dress"
                        className="w-full h-auto object-cover"
                        loading='lazy'

                    />
                </div>

                {/* Animated text on the right */}
                <motion.div
                    className="flex-1 px-6 lg:px-14 py-12 lg:w-[676px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h2
                        className="font-playfair text-4xl font-bold text-[#1C2230]"
                        variants={itemVariants}
                    >
                        Podcast <span className="text-[#F3732D] font-playfair">Overview</span>?
                    </motion.h2>

                    <motion.p
                        className="mt-6 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                        variants={itemVariants}
                    >
                        Real founders. Real failures. Real fuel for your journey.
                    </motion.p>
                    <motion.p
                        className="mt-1 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                        variants={itemVariants}
                    >
                        Every episode features unfiltered conversations on the realities of building in Africa — and the mindset required to stay in the game.
                    </motion.p>

                </motion.div>
            </section>
        </div>
    )
}

export default PodcastTop