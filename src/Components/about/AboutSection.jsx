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
                        Dreams <span className="text-[#F5EAD7] font-playfair">&</span> Oatmeal
                    </motion.h2>

                    <motion.p
                        className="mt-2 md:mt-8 text-[16px] font-openSans leading-[34px] tracking-[-5%] text-[#EDEDED]"
                        variants={item}
                    >
                        I had an unusual childhood. I was seven years old before I learned that not all children analyzed their dreams each
                        morning at the breakfast table with mom and dad, diagramming the archetypes on a yellow pad, next to the bowl of
                        oatmeal. When I came home with a typical childhood complaint like “Johnny teased me at recess,” I was usually met
                        with, “What do you think is going on at home for Johnny that would cause him to tease other kids?”
                    </motion.p>

                    <motion.p
                        className="mt-2 md:mt-6 text-[16px] font-openSans leading-[34px] tracking-[-5%] text-[#EDEDED]"
                        variants={item}
                    >
                        My parents weren’t psychotherapists, religious fanatics, or even hippies. They were regular people who believed that
                        understanding oneself and others was an essential part of living a happy life. From an early age, I was encouraged to
                        learn about psychology and spirituality and apply tools from both arenas to my daily life. Our house was full of
                        books on those subjects and I grew up reading them.
                    </motion.p>

                    <motion.p
                        className="mt-2 md:mt-6 text-[16px] font-openSans leading-[34px] tracking-[-5%] text-[#EDEDED]"
                        variants={item}
                    >
                        I have never tired of asking the question: how can our inner lives shift our outer lives? Emotional awareness,
                        creativity, spiritual practice: these are the enduring center of my daily life.
                    </motion.p>
                </motion.div>
            </section>
        </div>
    )
}

export default AboutSection