/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.2 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function AboutBio() {
    return (
        <motion.section
            className="px-4 lg:px-14 4xl:px-32 py-12 bg-white"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <div className="">
                <motion.h2
                    className="font-playfair text-3xl md:text-4xl font-bold text-[#1C2230] mb-6"
                    variants={itemVariants}
                >
                    Bio
                </motion.h2>

                <motion.p
                    className="font-openSans text-[16px] md:text-lg leading-relaxed text-[#4B4B4B] mb-2"
                    variants={itemVariants}
                >
                    Dr. Boahemaa Ntim is an author, speaker, and entrepreneurial coach passionate about shaping Africa’s next generation of innovators and leaders.
                    Her debut book, Beyond the Hustle, is a blueprint for young African entrepreneurs navigating the realities of business. The book blends hard-won lessons, practical exercises, and stories that challenge readers to think bigger, build smarter, and lead with intention.
                    Beyond writing, Dr. Boahemaa hosts the Beyond the Hustle Podcast, where she engages with seasoned entrepreneurs and thought leaders across Africa to unpack real stories of struggle, resilience, and growth.

                </motion.p>

                <motion.div
                    className="font-openSans text-[16px] md:text-lg leading-relaxed text-[#4B4B4B] mb-2 space-y-4"
                    variants={itemVariants}
                >
                    <p>
                        As a dynamic speaker, she has addressed audiences at universities,
                        corporate organizations, and international forums, delivering keynotes and
                        workshops on themes such as:
                    </p>

                    <ul className="list-disc list-inside space-y-1">
                        <li>Purpose-Driven Entrepreneurship</li>
                        <li>Building Systems That Scale</li>
                        <li>Leadership for Young Professionals</li>
                        <li>Women in Innovation and Business</li>
                    </ul>

                    <p>
                        Her work is guided by three core values:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Excellence</li>
                        <li>Innovation</li>
                        <li>Community</li>
                    </ul>

                    <p>
                        She believes entrepreneurship is not just about building businesses,
                        but about creating meaningful impact, lifting others, and leading
                        intentionally.
                    </p>

                    <p>
                        <strong>Dr. Boahemaa Ntim’s mission is clear:</strong> to equip Africa’s next
                        generation with the knowledge, mindset, and resources to build boldly and
                        create businesses that last.
                    </p>
                </motion.div>



            </div>
        </motion.section>
    )
}
