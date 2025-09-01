/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import lines from "../../assets/hero/lines.png";
import hustlebook from "../../assets/contact/hustlebook.png";
import curle from "../../assets/hero/curle.png";
import spiral from "../../assets/hero/spiral.png";
import shine from "../../assets/hero/shine.png";
import { motion } from 'framer-motion';

export default function BookSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.6 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="4xl:h-auto bg-[#1C2237] relative px-4 md:px-0 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-[1%] left-0 hidden md:block">
                <img src={curle} alt="Decorative flourish" loading="lazy" className="object-cover" />
            </div>
            <div className="absolute lg:bottom-48 4xl:bottom-[50%] right-44 hidden md:block">
                <img src={shine} alt="Decorative flourish" loading="lazy" className="object-cover" />
            </div>

            {/* Main content container */}
            <div className="container mx-auto py-12 relative">
                <motion.div
                    className="flex flex-col md:flex-row items-center w-full  mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"       // ← matches containerVariants.show
                >
                    {/* -- Left: Book mockup -- */}
                    <motion.div
                        className="flex-1 flex h-[681px] justify-center mb-8 md:mb-0"
                        variants={itemVariants}
                    >
                        <div className="relative overflow-hidden lg:w-[672px]">
                            <motion.img
                                src={hustlebook}
                                alt="Beyond the Hustle book mockup"
                                loading="lazy"
                                className="object-cover  h-full"
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            />
                        </div>
                    </motion.div>

                    {/* -- Right: Text content -- */}
                    <div className="flex-1 px-0 lg:px-14 4xl:px-32">
                        <motion.h1
                            className="text-2xl md:text-[40px] font-playfair font-semibold leading-tight md:leading-[54px] tracking-[-5%] mb-6"
                            variants={itemVariants}
                        >
                            <span className="text-white">More </span>
                            <span className="text-orange-500">Than Just </span>
                            <span className="text-white">A Book — It's A </span>
                            <span className="text-orange-500">Bold Call </span>
                            <span className="text-white">To Redefine </span>
                            <span className="text-orange-500">Success </span>
                            <span className="text-white">On Your Own Terms.</span>
                        </motion.h1>

                        <motion.div className="flex justify-center mb-8" variants={itemVariants}>
                            <img
                                src={lines}
                                alt="Decorative flourish"
                                loading="lazy"
                                className="object-contain"
                            />
                        </motion.div>


                    </div>
                </motion.div>
            </div>
        </div>
    );
}
