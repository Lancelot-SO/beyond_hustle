/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

import img1 from "../../assets/events/past1.png";
import img2 from "../../assets/events/past2.png";
import img3 from "../../assets/events/past3.png";

const engagements = [
    {
        image: img1,
        title: 'Africa UX Conference 2024',
        role: 'Panelist',
        talk: 'The Future Of Human-Centered AI',
    },
    {
        image: img2,
        title: 'Product Ghana Meetup',
        role: 'Guest Speaker',
        talk: 'Making Products That Stick',
    },
    {
        image: img3,
        title: 'Central University Tech Week',
        role: 'Keynote',
        talk: 'Designing For Purpose, Not Just Pixels',
    },
];

// Variants for container and items
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PastEvents() {
    return (
        <section className="px-4 lg:px-14 4xl:px-32 py-16 bg-white">
            {/* Heading */}
            <div className="flex items-center justify-center mb-12">
                <div className="flex-grow border-t border-gray-300 mx-4" />
                <h2 className="text-[24px] md:text-[40px] leading-[28px] md:leading-[54px] tracking-[-5%] font-semibold font-playfair text-[#D95B24]">
                    Past Speaking
                    <span className="text-[#1C2237]"> Engagements</span>
                </h2>
                <div className="flex-grow border-t border-gray-300 mx-4" />
            </div>

            {/* Animated Flex Container */}
            <motion.div
                className="flex flex-col md:flex-row gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
            >
                {engagements.map((e, idx) => {
                    const isLast = idx === engagements.length - 1;
                    return (
                        <motion.div
                            key={idx}
                            className="flex flex-col"
                            variants={itemVariants}
                            style={{ flex: isLast ? 1.6 : 1 }} // third card slightly wider
                        >
                            {/* Image */}
                            <div className="h-[479px] shadow-md overflow-hidden">
                                <img
                                    src={e.image}
                                    alt={`${e.title} speaker`}
                                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                                    loading='lazy'

                                />
                            </div>

                            {/* Caption */}
                            <h3 className="mt-4 text-lg font-medium text-gray-800 flex-1">
                                {e.title} – <span className="font-normal">{e.role},</span>{' '}
                                <span className="text-orange-600">“{e.talk}”</span>
                            </h3>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
