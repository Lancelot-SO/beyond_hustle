/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import webinardown from "../../assets/webinar/webinardown.png"

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

const WebinarDown = () => {
    return (
        <div>
            <section className="flex flex-col md:flex-row">
                <motion.div
                    className="flex-1 px-4 lg:px-14 py-12 lg:w-[676px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h2
                        className="font-playfair text-4xl font-bold text-[#1C2230]"
                        variants={itemVariants}
                    >
                        Still Have <span className="text-[#F3732D] font-playfair"> Questions?</span>
                    </motion.h2>

                    <motion.div
                        className="mt-6 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                        variants={containerVariants}
                    >

                        <motion.p variants={itemVariants} className="mt-4">
                            Choosing the right course or webinar can be overwhelming — but you don’t have to figure it out alone. Whether you're new to financial learning or looking to deepen your expertise, our team is here to help you find the program that best aligns with your goals and interests. Feel free to reach out for personalized guidance or more information.
                        </motion.p>

                        <Link to="#" className='w-[154px] h-[48px] flex items-center justify-center text-white bg-[#D95B24] hover:bg-[#d3693f] shadow-lg mt-2'>Read More</Link>

                    </motion.div>
                </motion.div>

                <div className="flex-1">
                    <img
                        src={webinardown}
                        alt="Portrait of woman in red lace dress"
                        className="w-full h-auto object-cover"
                        loading='lazy'

                    />
                </div>
            </section>
        </div>
    )
}

export default WebinarDown