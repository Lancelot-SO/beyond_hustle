/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.2 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function AboutBio() {
    return (
        <motion.section
            className="px-4 lg:px-14 4xl:px-32 py-12 bg-white"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <div className="">
                <motion.h2
                    className="font-playfair text-3xl md:text-4xl font-bold text-[#1C2230] mb-6"
                    variants={itemVariants}
                >
                    Bio
                </motion.h2>

                <motion.p
                    className="font-openSans text-[16px] md:text-lg leading-relaxed text-[#4B4B4B] mb-2"
                    variants={itemVariants}
                >
                    She is the author of <span className="italic text-[#D95B24]">Beyond the Hustle</span>, named a best book of the year by Apple’s iBooks. Tara is the creator and teacher of the global Playing Big leadership program for women, and of the Playing Big Facilitators Training for coaches, therapists, managers, and mentors.
                </motion.p>

                <motion.p
                    className="font-openSans text-[16px] md:text-lg leading-relaxed text-[#4B4B4B] mb-2"
                    variants={itemVariants}
                >
                    She is a <span className='text-[#D95B24]'>Co‑Active Training Institute certified coach with an MBA from Stanford University</span> and an undergraduate degree in English literature from Yale. Her work has been featured on national media from the New York Times to Today Show to Harvard Business Review.
                </motion.p>

                <motion.p
                    className="font-openSans text-[16px] md:text-lg leading-relaxed text-[#4B4B4B]"
                    variants={itemVariants}
                >
                    She lives in San Francisco with her husband and three children.
                </motion.p>
            </div>
        </motion.section>
    )
}
