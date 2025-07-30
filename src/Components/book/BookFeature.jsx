/* eslint-disable no-unused-vars */
import React from 'react'
import bgImage from "../../assets/book/bookfeaturebg.png"
import featured from '../../assets/book/bookfeature.png';

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

const BookFeature = () => {
    return (
        <div>
            <section
                className="relative bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <motion.div
                    className="relative z-10 max-w-3xl lg:h-[634px] mx-auto px-6 py-16 md:py-32 text-center"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h2 className='text-white text-[40px] font-semibold font-playfair leading-[50px] tracking-[-5%]'>
                        As <span className='text-[#D95B24]'>Featured</span> In
                    </motion.h2>
                    <motion.img
                        src={featured}
                        alt="Featured in logos"
                        loading="lazy"
                        className="object-cover hover:opacity-100 transition-opacity duration-300"
                        variants={itemVariants}
                    />

                </motion.div>
            </section>
        </div>
    )
}

export default BookFeature