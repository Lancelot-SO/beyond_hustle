/* eslint-disable react/no-unescaped-entities */
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


// const topics = [
//     "Designing for Impact: UX in Emerging Markets",
//     "Product Thinking for Startups",
//     "The Role of Design in Digital Innovation",
//     "Bridging Product and Business Strategy",
//     "Women in Tech & Leadership",
//     "Tailored for individuals and professionals",
// ]

const WebinarTop = () => {
    return (
        <div>
            <section className="flex flex-col md:flex-row">
                <motion.div
                    className="flex-1 flex flex-col items-start justify-center px-4 lg:px-14 py-12 lg:w-[676px]"
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
                            Expand your knowledge and stay ahead with our carefully curated webinars and courses. Whether you're looking to deepen your financial understanding, sharpen your professional skills, or explore new opportunities, our programs are designed to empower you with practical insights, expert guidance, and real-world applications.
                        </motion.p>

                        <motion.p variants={itemVariants} className="mt-4">
                            Each session is led by experienced professionals and tailored to meet the needs of individuals at every stage of their learning journey. From foundational topics to advanced strategies, we provide the tools and support you need to thrive. Join a vibrant community of learners and take the next step toward lasting growth, confidence, and financial stability.
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


            {/* <section className="py-12 md:py-20 relative">
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
            </section> */}



        </div>
    )
}

export default WebinarTop