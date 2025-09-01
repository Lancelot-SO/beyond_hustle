/* eslint-disable no-unused-vars */
import React from 'react'
import bgImage from "../../assets/about/bgImage.png"
import { motion } from 'framer-motion';


const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const AboutSection = () => {
    return (
        <div>
            <section
                className="relative bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <motion.div
                    className="relative z-10 max-w-3xl mx-auto px-6 py-16 md:py-32 text-left"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h2
                        className="font-playfair text-[32px] md:text-[48px] leading-[24px] md:leading-[58px] tracking-[-5%] font-bold text-[#F4E8D3]"
                        variants={item}
                    >
                        Mission  <span className="text-[#F5EAD7] font-playfair">Statement</span>
                    </motion.h2>

                    <motion.p
                        className="mt-2 md:mt-8 text-[16px] font-openSans leading-[34px] tracking-[-5%] text-[#EDEDED]"
                        variants={item}
                    >
                        To equip African founders with the knowledge, mindset and tools to build businesses that last.
                    </motion.p>
                </motion.div>
            </section>
        </div>
    )
}

export default AboutSection