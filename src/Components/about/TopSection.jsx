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
                    className="flex-1 px-4 lg:px-14 py-12 lg:w-[676px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h2
                        className="font-playfair text-4xl font-bold text-[#1C2230]"
                        variants={itemVariants}
                    >
                        Dreams <span className="text-[#F3732D] font-playfair">&</span> Oatmeal
                    </motion.h2>

                    <motion.div
                        className="mt-6 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                        variants={containerVariants}
                    >
                        <motion.p variants={itemVariants}>
                            I had an unusual childhood. I was seven years old before I learned that not all
                            children analyzed their dreams each morning at the breakfast table with mom and
                            dad, diagramming the archetypes on a yellow pad, next to the bowl of oatmeal.
                            When I came home with a typical childhood complaint like “Johnny teased me at
                            recess,” I was usually met with, “What do you think is going on at home for Johnny
                            that would cause him to tease other kids?”
                        </motion.p>

                        <motion.p variants={itemVariants} className="mt-4">
                            My parents weren’t psychotherapists, religious fanatics, or even hippies. They
                            were regular people who believed that understanding oneself and others was an
                            essential part of living a happy life. From an early age, I was encouraged to
                            learn about psychology and spirituality and apply tools from both arenas to my
                            daily life. Our house was full of books on those subjects and I grew up reading
                            them.
                        </motion.p>

                        <motion.p variants={itemVariants} className="mt-4">
                            I have never tired of asking the question: how can our inner lives shift our
                            outer lives? Emotional awareness, creativity, spiritual practice: these are the
                            enduring center of my daily life.
                        </motion.p>
                    </motion.div>
                </motion.div>

                <div className="flex-1">
                    <img
                        src={main}
                        alt="Portrait of woman in red lace dress"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </section>
        </div>
    )
}

export default TopSection