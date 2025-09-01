/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React from 'react'
import main2 from "../../assets/about/main2.png"
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

export default function NextSection() {
    return (
        <section className="flex flex-col md:flex-row items-center">

            {/* Image on the left */}
            <div className="flex-1">
                <img
                    src={main2}
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
                    Vision <span className="text-[#F3732D] font-playfair">Statement</span>
                </motion.h2>

                <motion.p
                    className="mt-6 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                    variants={itemVariants}
                >
                    A new generation of entrepreneurs who innovate with purpose and lead with intention.
                </motion.p>
            </motion.div>
        </section>
    )
}
