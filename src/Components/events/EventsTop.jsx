/* eslint-disable no-unused-vars */
import React from 'react'
import main from "../../assets/about/main.png"
import { motion } from 'framer-motion';
import { ChevronRight } from "lucide-react"


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
    "Beyond the Hustle: Building Businesses That Endure",
    "Coaching Entrepreneurs for Impact: The Art and Science of Guiding Start-Ups",
    "From Idea to Impact: Turning Concepts into Viable Businesses",
    "Reinvent, Don’t Retreat: Lessons in Resilience from Business Failure",
    "Digital Presence and Storytelling for African SMEs",
    "Systems, Structures, and Strategy: The CEO’s Playbook for Scaling a Small Business",
    "Money Matters: Funding, Financial Discipline, and the Entrepreneur’s Growth Journey",
    "The Future-Ready Entrepreneur: AI, Innovation, and the New Skills of Business Growth",
]

const EventsTop = () => {
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
                        Speaking <span className="text-[#F3732D] font-playfair">Profile</span>
                    </motion.h2>

                    <motion.div
                        className="mt-6 text-base leading-[34px] text-[#4B4B4B] tracking-[-5%]"
                        variants={containerVariants}
                    >
                        <motion.p variants={itemVariants}>

                            Dr. Boahemaa Ntim is an author, speaker, and entrepreneurship coach dedicated to equipping Africa’s next generation of leaders with the tools to build boldly and lead intentionally. She is the author of Beyond the Hustle, a practical roadmap that challenges entrepreneurs to cut through noise and focus on clarity, systems, and purpose-driven growth.

                        </motion.p>

                        <motion.p variants={itemVariants} className="mt-4">
                            Through her speaking engagements, Dr. Boahemaa brings a rare blend of academic insight, entrepreneurial experience, and motivational storytelling. Her keynote themes cover entrepreneurship, leadership, innovation, women in business, and purpose-driven growth. She has spoken at universities, corporate organizations, and entrepreneurial forums, leaving audiences energized with practical strategies and the courage to act.
                            Her mission is simple: to help entrepreneurs go beyond hustle culture and create businesses that truly last.
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


            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
                        <span className="text-[#1C2237]">Key Topics</span>{" "}
                        <span className="text-[#D95B24]">Dr.Boahemaa Ntim </span>Covers
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
            </section>



        </div>
    )
}

export default EventsTop