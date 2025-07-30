/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import vector from "../../assets/hero/vector.png"
import vector2 from "../../assets/hero/vector2.png"
import sparkle from "../../assets/hero/Sparkle.png"

import img1 from "../../assets/hero/img1.png"
import img2 from "../../assets/hero/img2.png"

// Container variant now slows down the stagger
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.6, // increase delay between each child
        }
    }
}

// Item variant now has a longer duration
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeInOut' }
    }
}

const MainSection = () => {
    return (
        <motion.div
            className="relative flex flex-col lg:flex-row pb-8 lg:pb-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Decorative shapes hidden on mobile */}
            <div className='absolute top-0 md:top-5 right-0  md:block'>
                <img src={vector} alt='vector' loading='lazy' />
            </div>

            <div className='absolute bottom-16 lg:left-[22.5%] left-1/4 hidden md:block'>
                <img src={vector2} alt='vector2' loading='lazy' />
            </div>

            <div className='absolute lg:top-[185px] top-[830px] left-0 lg:left-[63.5%] hidden md:block'>
                <img src={sparkle} alt='sparkle' loading='lazy' />
            </div>

            {/* Text + image column */}
            <div className='w-full lg:w-[990px] h-auto lg:h-[1050px] flex flex-col pl-4 lg:pl-14 4xl:pl-32 pt-10 md:pt-[70px]'>
                <div className="space-y-6 w-full lg:w-[967px] h-auto lg:h-[424px]">
                    {/* Heading */}
                    <motion.h1
                        className="w-full lg:w-[950px] h-auto lg:h-[174px] font-playfair text-[24px] md:text-32 lg:text-[38px] font-semibold text-gray-900 leading-[32px] lg:leading-[58px] tracking-[-5%]"
                        variants={itemVariants}
                    >
                        Get To Know The Voice Behind <span className="text-orange-600">"Beyond The Hustle"</span>— Author, Speaker,
                        And Purpose-Driven Leader <span className="text-orange-600">Changing The Narrative</span> For African{' '}
                        <span className="text-orange-600">Entrepreneurs</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="w-full lg:w-[840px] h-auto lg:h-[170px] text-[#4B4B4B] text-[14px] md:text-[15px] leading-[22px] md:leading-[34px] tracking-[-5%] font-openSans font-normal"
                        variants={itemVariants}
                    >
                        Dr. Boahemaa Ntim is an author, speaker, and purpose-driven entrepreneur committed to empowering Africa's next
                        generation of leaders. With a bold vision rooted in clarity, integrity, and intentional growth, she helps
                        individuals and institutions break free from burnout culture and embrace leadership that is meaningful,
                        impactful, and sustainable. Whether through her bestselling book, powerful keynote talks, or transformative
                        coaching programs, Dr. Boahemaa brings insight, inspiration, and strategy to every space she enters.
                    </motion.p>

                    {/* Read More Button */}
                    <motion.button
                        className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 transition-colors"
                        variants={itemVariants}
                    >
                        Read More
                    </motion.button>
                </div>

                {/* Secondary image: centered on mobile, right-aligned on desktop */}
                <motion.div className='flex justify-center md:justify-end mt-6' variants={itemVariants}>
                    <img src={img1} alt='img1' loading='lazy' className='w-full md:w-auto' />
                </motion.div>
            </div>

            {/* Portrait column */}
            <motion.div className='w-full lg:w-[524px] h-auto flex items-center justify-start lg:justify-center pt-10 lg:pt-52 pl-4 lg:pl-0 ' variants={itemVariants}>
                <div>
                    <img src={img2} alt='img2' loading='lazy' className='w-full md:w-auto' />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default MainSection
