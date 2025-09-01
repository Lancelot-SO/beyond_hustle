/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import lines from "../../assets/hero/lines.png"
import gatsby from "../../assets/hero/gatsby.png"
import spon1 from "../../assets/hero/spon1.png"
// import spon2 from "../../assets/hero/spon2.png"
// import spon3 from "../../assets/hero/spon3.png"
// import spon4 from "../../assets/hero/spon4.png"

import curle from "../../assets/hero/curle.png"
import spiral from "../../assets/hero/spiral.png"
import shine from "../../assets/hero/shine.png"

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PurpleSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.6 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen 4xl:h-auto  bg-[#1C2237] relative px-4 md:px-0 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute lg:bottom-48 4xl:bottom-[50%] right-44 hidden md:block">
                <img src={shine} alt="Decorative flourish" loading="lazy" className="object-cover" />
            </div>

            {/* Main content container */}
            <div className="container mx-auto py-12 relative">
                <motion.div
                    className="w-full lg:w-[967px] mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Headline */}
                    <motion.div className="text-center mb-8 h-auto" variants={itemVariants}>
                        <h1 className="text-2xl md:text-[40px] font-playfair font-semibold leading-tight md:leading-[54px] tracking-[-5%]">
                            <span className="text-white">"More </span>
                            <span className="text-orange-500">Than Just </span>
                            <span className="text-white">A </span>
                            <span className="text-white">Book — It's A </span>
                            <span className="text-orange-500">Bold Call </span>
                            <span className="text-white">To Redefine</span>
                            <br />
                            <span className="text-orange-500">Success </span>
                            <span className="text-white">On Your Own Terms."</span>
                        </h1>
                    </motion.div>

                    {/* Description */}
                    <motion.div className="text-center px-0 md:px-4 lg:px-0 mb-12 w-full lg:w-[904px] mx-auto h-auto" variants={itemVariants}>
                        <p className="text-white text-base lg:text-[16px] font-openSans font-semibold leading-relaxed lg:leading-[32px]">
                            In Beyond the Hustle, Dr. Boahemaa Ntim challenges the glorified culture of constant grind and burnout, offering a refreshing blueprint for leading with clarity, purpose, and impact. Packed with real-world insights and practical tools, this book empowers young African entrepreneurs, students, and professionals to embrace leadership that is both intentional and sustainable.Inspiring keynotes and tailored masterclasses for
                            institutions and corporate teams.
                        </p>
                    </motion.div>

                    {/* Decorative flourish */}
                    <motion.div className="flex justify-center mb-12" variants={itemVariants}>
                        <img src={lines} alt="Decorative flourish" loading="lazy" className="object-cover" />
                    </motion.div>

                    {/* Book mockup */}
                    <motion.div className="flex justify-center mb-12" variants={itemVariants}>
                        <div className="relative overflow-hidden">
                            <motion.img
                                src={gatsby}
                                alt="Beyond the Hustle book mockup with mobile app and circular element"
                                loading="lazy"
                                className="object-cover w-full h-full"
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            />
                        </div>
                    </motion.div>

                    {/* Call to action buttons */}
                    <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" variants={itemVariants}>
                        <Link to="https://www.amazon.com/BEYOND-HUSTLE-Mistakes-Business-Start-Up-ebook/dp/B0FN6FV38S/ref=sr_1_1?crid=17O9B5S2EO9H9&dib=eyJ2IjoiMSJ9.bmBUNP_J4QvZ799lAicr2w.G3me5YUZUfk9sZuC2JugnO5D7EQiNZChfUzOb5YMTp8&dib_tag=se&keywords=boahemaa+ntim&qid=1756184338&sprefix=boahemaa+ntim%2Caps%2C302&sr=8-1"
                            target='_blank' rel='noopener noreferrer'
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold">
                            Order Your Copy
                        </Link>
                        <Link to="/paystack" className="border-2 border-[#F4E8D3] text-white hover:bg-white hover:text-slate-800 px-8 py-3 text-lg font-semibold bg-transparent">
                            Get Workbook
                        </Link>
                    </motion.div>

                    {/* Publisher logos */}
                    <motion.div className="flex justify-center items-center gap-8 mb-8 flex-wrap overflow-hidden" variants={itemVariants}>
                        <Link to="https://www.amazon.com/BEYOND-HUSTLE-Mistakes-Business-Start-Up-ebook/dp/B0FN6FV38S/ref=sr_1_1?crid=17O9B5S2EO9H9&dib=eyJ2IjoiMSJ9.bmBUNP_J4QvZ799lAicr2w.G3me5YUZUfk9sZuC2JugnO5D7EQiNZChfUzOb5YMTp8&dib_tag=se&keywords=boahemaa+ntim&qid=1756184338&sprefix=boahemaa+ntim%2Caps%2C302&sr=8-1"
                            target='_blank' rel='noopener noreferrer'
                        >
                            <img src={spon1} alt="Amazon" className="object-cover filter brightness-0 invert transition-transform duration-500 ease-in-out hover:scale-105" loading="lazy" />

                        </Link>
                        {/* <img src={spon2} alt="BAM!" className="object-cover filter brightness-0 invert transition-transform duration-500 ease-in-out hover:scale-105" loading="lazy" />
                        <img src={spon3} alt="Barnes & Noble" className="object-cover filter brightness-0 invert transition-transform duration-500 ease-in-out hover:scale-105" loading="lazy" />
                        <img src={spon4} alt="IndieBound" className="object-cover filter brightness-0 invert transition-transform duration-500 ease-in-out hover:scale-105" loading="lazy" /> */}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
