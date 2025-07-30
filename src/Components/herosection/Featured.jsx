/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
// Import the single composite logo image
import featured from '../../assets/hero/featured.png';

export default function Featured() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="py-12 md:py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-12">
                    As <span className="text-orange-600">Featured In</span>
                </h2>

                <motion.div
                    className="flex justify-center items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.img
                        src={featured}
                        alt="Featured in logos"
                        loading="lazy"
                        className="object-contain max-w-full h-auto opacity-75 hover:opacity-100 transition-opacity duration-300"
                        variants={itemVariants}
                    />
                </motion.div>
            </div>
        </section>
    );
}
