/* eslint-disable no-unused-vars */
import React from 'react'
import hustle from "../../assets/about/hustle.png"
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

const AboutHustle = () => {
    return (
        <div>
            <section className="flex flex-col md:flex-row">
                <motion.div
                    className="flex-1 flex flex-col items-start justify-center px-6 lg:px-14 py-12 lg:w-[676px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h2
                        className="font-playfair text-4xl font-bold  text-[#D95B24]"
                        variants={itemVariants}
                    >
                        Beyond The Hustle:{' '}
                        <span className="text-[#1C2230] font-playfair">Practical Workbook</span>

                    </motion.h2>

                    <motion.p
                        className="mt-6 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                        variants={itemVariants}
                    >
                        Discover the book that’s helping African entrepreneurs cut the noise, gain clarity and build businesses that actually work.
                    </motion.p>

                    <motion.p
                        className="mt-4 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                        variants={itemVariants}
                    >
                        Synopsis, cover, sample pages (downloadable PDF) and selected reader testimonials.
                        “Workbook” Section:
                    </motion.p>

                    <motion.p
                        className="mt-4 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                        variants={itemVariants}
                    >
                        Get a taste of the guided exercises with sample workbook pages — designed to help you apply the lessons to your own journey.
                    </motion.p>

                    <motion.button
                        className="mt-8 inline-block px-6 py-3 bg-[#D95B24] text-white font-semibold rounded"
                        variants={itemVariants}
                    >
                        Read More
                    </motion.button>
                </motion.div>


                <div className="flex-1">
                    <img
                        src={hustle}
                        alt="Portrait of woman in red lace dress"
                        className="w-full h-auto object-cover"
                        loading='lazy'

                    />
                </div>
            </section>
        </div>
    )
}

export default AboutHustle