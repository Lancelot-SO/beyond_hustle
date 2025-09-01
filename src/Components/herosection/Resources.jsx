/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { motion } from 'framer-motion';
import shine from "../../assets/hero/shine.png"
import resource1 from "../../assets/hero/resource1.png"
import resource2 from "../../assets/hero/resource2.png"
import resource3 from "../../assets/hero/resource3.png"
import { Link } from 'react-router-dom';


export default function Resources() {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative bg-[#1C2237] py-16 md:py-16 lg:py-20 px-4 lg:px-14 4xl:px-32 overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute top-0 right-0">
                <img
                    src={shine}
                    alt="Decorative background pattern"
                    className="absolute top-0 right-0 w-full h-full object-contain"
                />
            </div>

            <div className="container relative z-10">
                <div className="text-center flex flex-col items-center justify-center space-y-4 mb-12 md:mb-16">
                    <h2 className="text-[40px] font-playfair font-light leading-[50px] text-white">More Resources</h2>
                    <div className='h-[2px] w-[100px] bg-[#D95B24] flex justify-center'></div>
                    <p className="text-[15px] text-[#F5F3EF] font-openSans font-normal leading-[25px]">
                        There are plenty of ways to start playing big, sharing your voice, and finding more fulfillment in life and
                        work.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Speaking Overview Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="bg-white p-6 h-[700px] flex flex-col items-center text-center shadow-lg">
                            <div className="pb-4">
                                <h3 className="text-[#D95B24] text-[32px] font-playfair font-medium tracking-[-2%]">Speaking & Coaching</h3>
                            </div>
                            <div className="flex flex-col items-center space-y-6 flex-grow">
                                <p className="text-[#4B4B4B] text-left text-base leading-relaxed">
                                    Inspiring keynotes and tailored masterclasses for institutions and corporate teams.
                                </p>
                                <img
                                    src={resource1}
                                    alt="Professional headshot of a woman smiling"
                                    width={300}
                                    height={300}
                                    className="rounded-lg object-cover w-full max-w-[300px] h-auto"
                                />
                                <p className="text-[#4B4B4B] text-left text-base italic leading-relaxed">
                                    "At last this very important book has been written, encouraging women to take up all the
                                    creative space they deserve in the world."
                                    <br />
                                    <span className="font-semibold">- Elizabeth Gilbert</span>
                                    <br />
                                    <span className="text-sm text-[#D95B24]">Author, Big Magic & Eat Pray Love</span>
                                </p>
                                <Link to="/events" className="bg-[#D95B24] hover:bg-[#D95B24]/90 text-white px-6 py-3 rounded-md text-base font-medium">
                                    View More
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Webinar & Courses Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}

                    >
                        <div className="bg-white p-6 h-[700px] flex flex-col items-center text-center shadow-lg">
                            <div className="pb-4">
                                <h3 className="text-[#D95B24] text-[32px] font-playfair font-medium tracking-[-2%]">Ideas Bootcamps</h3>
                            </div>
                            <div className="flex flex-col items-center space-y-6 flex-grow">
                                <p className="text-[#4B4B4B] text-left text-base leading-relaxed">
                                    A stimulating environment to generate business ideas, finetune ideas and seek support to scale a start-up
                                </p>
                                <p className="text-[#4B4B4B] text-left text-base italic leading-relaxed">
                                    "At last this very important book has been written, encouraging women to take up all the
                                    creative space they deserve in the world."
                                    <br />
                                    <span className="font-semibold">- Elizabeth Gilbert</span>
                                    <br />
                                    <span className="text-sm text-[#D95B24]">Author, Big Magic & Eat Pray Love</span>
                                </p>
                                <Link to='/webinars' className="bg-[#D95B24] hover:bg-[#D95B24]/90 text-white px-6 py-3 rounded-md text-base font-medium">
                                    View More
                                </Link>
                                <img
                                    src={resource2}
                                    alt="Open book titled Playing Big on a wooden surface"
                                    width={300}
                                    height={200}
                                    className="rounded-lg object-cover w-full max-w-[300px] h-auto"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Blogs & Resources Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}

                    >
                        <div className="bg-white p-6 h-[700px] flex flex-col items-center text-center shadow-lg">
                            <div className="pb-4">
                                <h3 className="text-[#D95B24] text-[32px] font-playfair font-medium tracking-[-2%]">The Hustle fund</h3>
                            </div>
                            <div className="flex flex-col items-center space-y-6 flex-grow">
                                <p className="text-[#4B4B4B] text-left text-base leading-relaxed">
                                    An angel investment fund to provide seed capital for young entrepreneurs to develop their business prototypes and prepare their businesses for investment
                                </p>
                                <img
                                    src={resource3}
                                    alt="Tablet and notebook on a desk with glasses and a plant"
                                    width={300}
                                    height={200}
                                    className="rounded-lg object-cover w-full max-w-[300px] h-auto"
                                />
                                <p className="text-[#4B4B4B]  text-left text-base leading-relaxed">
                                    We offer online courses and workshops to ignite your playing big journey. Upcoming programs include:
                                </p>
                                <ul className="list-disc list-inside text-left text-[#4B4B4B] space-y-1 w-full px-4">
                                    <li>Playing Big</li>
                                    <li>Playing Big Facilitators Training</li>
                                    <li>The Coaching Way</li>
                                </ul>
                                <Link to="/blog" className="bg-[#D95B24] hover:bg-[#D95B24]/90 text-white px-6 py-3 rounded-md text-base font-medium">
                                    View More
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
