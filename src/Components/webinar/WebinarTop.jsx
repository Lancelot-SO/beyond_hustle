/* eslint-disable no-unused-vars */
import React from 'react'
import main from "../../assets/about/main.png"
import { motion } from 'framer-motion';
import { ChevronRight } from "lucide-react"
import WebinarCard from './WebinarCard';
import vector from "../../assets/webinar/vector.png"


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


const topics = [
    "Designing for Impact: UX in Emerging Markets",
    "Product Thinking for Startups",
    "The Role of Design in Digital Innovation",
    "Bridging Product and Business Strategy",
    "Women in Tech & Leadership",
    "Tailored for individuals and professionals",
]

const WebinarTop = () => {
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
                        <span className='text-[#F3732D] font-playfair'>Unlock</span> Your<span className="text-[#F3732D] font-playfair"> Potential</span> Through<span className='text-[#F3732D] font-playfair'> Expert-Led</span> Learning
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
                        loading='lazy'

                    />
                </div>
            </section>

            <section>
                <WebinarCard />
            </section>


            <section className="py-12 md:py-20 relative">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
                        <span className="text-[#1C2237]">Why </span>{" "}
                        <span className="text-[#D95B24]">Join </span>Our
                        <span className="text-[#D95B24]"> Programs?</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {topics.map((topic, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D95B24] flex-shrink-0">
                                    <ChevronRight className="w-4 h-4 text-white" />
                                    <ChevronRight className="w-4 h-4 text-white -ml-2" />
                                    <ChevronRight className="w-4 h-4 text-white -ml-2" />
                                </div>
                                <p className="text-[17px] leading-[25px] font-openSans text-[#1C2237]">{topic}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <img
                    src={vector}
                    alt="The Power Of Breakthrough Thinking"
                    className="absolute bottom-0 right-0 w-[356px] h-[334px] object-cover"
                    loading='lazy'
                />
            </section>



        </div>
    )
}

export default WebinarTop