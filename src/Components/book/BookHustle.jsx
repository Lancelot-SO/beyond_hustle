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
                        {['Click to purchase'].map((retailer, i) => (
                            <motion.a
                                key={i}
                                href="https://www.amazon.com/BEYOND-HUSTLE-Mistakes-Business-Start-Up-ebook/dp/B0FN6FV38S/ref=sr_1_1?crid=17O9B5S2EO9H9&dib=eyJ2IjoiMSJ9.bmBUNP_J4QvZ799lAicr2w.G3me5YUZUfk9sZuC2JugnO5D7EQiNZChfUzOb5YMTp8&dib_tag=se&keywords=boahemaa+ntim&qid=1756184338&sprefix=boahemaa+ntim%2Caps%2C302&sr=8-1"
                                target='_blank' rel='noopener noreferrer'
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
                        loading='lazy'

                    />
                </div>
            </section>
        </div>
    )
}

export default BookHustle