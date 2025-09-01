/* eslint-disable no-unused-vars */
import React from 'react'
import main from "../../assets/about/main.png"
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

const TopSection = () => {
    return (
        <div>
            <section className="flex flex-col md:flex-row">
                <motion.div
                    className="flex-1 flex flex-col items-start justify-center px-4 lg:px-14 py-12 lg:w-[676px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h2
                        className="font-playfair text-4xl font-bold text-[#1C2230]"
                        variants={itemVariants}
                    >
                        Who  is <span className="text-[#F3732D] font-playfair">Dr.Boahemaa ?</span>
                    </motion.h2>

                    <motion.div
                        className="mt-6 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                        variants={containerVariants}
                    >
                        <motion.p variants={itemVariants}>
                            Dr. Boahemaa Ntim is an author, entrepreneur, business coach, and passionate advocate for innovation across Africa. Drawing from years of experience in business, education, and leadership,
                            she empowers young founders, students and institutions to build boldly and lead intentionally.
                            Her work is grounded in three core values: excellence, innovation and , and community
                        </motion.p>
                    </motion.div>
                </motion.div>

                <div className="flex-1">
                    <img
                        src={main}
                        alt="Portrait of woman in red lace dress"
                        className="w-full h-auto object-cover"
                        loading='lazy'

                    />
                </div>
            </section>
        </div>
    )
}

export default TopSection