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

const BookHustle = () => {
    return (
        <div>
            <section className="flex flex-col md:flex-row">
                <motion.div
                    className="flex-1 px-6 lg:px-14 py-12 lg:w-[676px] flex flex-col items-start justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h2
                        className="font-playfair text-4xl font-bold"
                        variants={itemVariants}
                    >
                        <span className="text-[#D95B24]">Grab</span>{' '}
                        <span className="text-[#1C2230]">Your</span>{' '}
                        <span className="text-[#D95B24]">Copy</span>
                    </motion.h2>

                    <motion.p
                        className="mt-6 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                        variants={itemVariants}
                    >
                        Playing Big is available at all your favorite retailers.
                    </motion.p>

                    <motion.p
                        className="mt-4 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                        variants={itemVariants}
                    >
                        Click below to order today!
                    </motion.p>

                    <motion.div
                        className="mt-8 flex flex-wrap gap-6"
                        variants={containerVariants}
                    >
                        {['Barnes & Noble', 'Barnes & Noble', 'Barnes & Noble', 'Barnes & Noble'].map((retailer, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                className="text-[#D95B24] underline font-semibold"
                                variants={itemVariants}
                            >
                                {retailer}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>



                <div className="flex-1">
                    <img
                        src={hustle}
                        alt="Portrait of woman in red lace dress"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </section>
        </div>
    )
}

export default BookHustle