import React, { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Calendar, Phone, MessageCircle, GraduationCap, Briefcase } from "lucide-react"
import RegistrationModal from "../Components/RegistrationModal"
import { useContent } from "../lib/useContent"

// Static fallback values, shown until the CMS responds (or if it is unreachable).
const DEFAULTS = {
    headline: 'EARN EXTRA INCOME OF OVER GHS10K A MONTH!',
    registration_fee: 'GHS 250',
    tuition_fee: 'GHS 2,500',
    cohort_label: 'Next Cohort Begins Sept 17, 2025',
    tuition_mode: 'Hybrid (Virtual & In-Person)',
    contact_phone: '0244978933',
}

// Renders the headline with any "GHS..." amount highlighted in brand orange.
const renderHeadline = (text) =>
    text.split(' ').map((word, i) => (
        <React.Fragment key={i}>
            {word.toUpperCase().includes('GHS')
                ? <span className="text-[#D95B24]">{word}</span>
                : word}
            {' '}
        </React.Fragment>
    ))

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const apiSettings = useContent('coaching', null)
    const settings = {
        ...DEFAULTS,
        ...Object.fromEntries(
            Object.entries(apiSettings || {}).filter(([, value]) => value !== null && value !== '')
        ),
    }

    const fadeInUp = {
        initial: { y: 60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    }

    const fadeInDown = {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] },
    }

    const scaleIn = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] },
    }

    const slideInLeft = {
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    }

    const staggerContainer = {
        animate: { transition: { staggerChildren: 0.1 } },
    }

    const heroStagger = {
        animate: { transition: { staggerChildren: 0.2 } },
    }

    return (
        <div className="md:mt-[110px] mt-[160px] 4xl:px-32 bg-gray-50">
            {/* Header */}
            <motion.header className="border-b bg-white" {...fadeInDown}>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-[#D95B24] rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">BA</span>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">Blacksmith Africa</h1>
                            <p className="text-sm text-gray-500">Consulting</p>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="py-16 bg-[#1C2237]">
                <motion.div
                    className="container mx-auto px-4 text-center"
                    variants={heroStagger}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div variants={scaleIn}>
                        <span className="inline-block mb-6 px-4 py-2 rounded-full bg-[#D95B24] text-white text-sm font-medium">
                            Limited Seats Available
                        </span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                        variants={fadeInUp}
                    >
                        {renderHeadline(settings.headline)}
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-white mb-4"
                        variants={fadeInUp}
                    >
                        Train as an entrepreneurship/business coach.
                    </motion.p>
                    <motion.p
                        className="text-xl md:text-2xl text-white mb-8"
                        variants={fadeInUp}
                    >
                        Sign up for the 4-week program and become a coach.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex justify-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#D95B24] hover:bg-[#A34115] flex items-center justify-center text-white px-8 py-4 text-lg rounded-lg transition-transform transform hover:scale-105 active:scale-95"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Register Now
                        </button>
                    </motion.div>

                </motion.div>
            </section>

            {/* Benefits Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                    >
                        <div className="bg-[#D95B24] text-white max-w-4xl mx-auto rounded-lg shadow-lg p-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="w-6 h-6 mt-1" />
                                    <p className="text-lg">
                                        Instant engagement on the Beyond the Hustle program to coach entrepreneurs
                                    </p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="w-6 h-6 mt-1" />
                                    <p className="text-lg">Freelance to support other businesses</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Requirements and Fees */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Requirements */}
                        <motion.div variants={slideInLeft}>
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-2xl text-[#D95B24] font-bold flex items-center gap-2 mb-4">
                                    <GraduationCap className="w-6 h-6" />
                                    Requirements
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-[#D95B24] mt-1" />
                                        <p>Minimum tertiary education</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-[#D95B24] mt-1" />
                                        <p>Prior entrepreneurial experience is a plus</p>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Fees */}
                        <motion.div variants={slideInLeft}>
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-2xl text-[#D95B24] font-bold flex items-center gap-2 mb-4">
                                    <Briefcase className="w-6 h-6" />
                                    Fees
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span>Registration</span>
                                        <span className="font-semibold text-[#D95B24]">{settings.registration_fee}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Tuition</span>
                                        <span className="font-semibold text-[#D95B24]">{settings.tuition_fee}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Program Details */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                    >
                        <div className="bg-[#D95B24] text-white max-w-4xl mx-auto rounded-lg shadow-lg p-8 text-center">
                            <h3 className="text-2xl font-bold mb-4">Mode of Tuition</h3>
                            <p className="text-xl mb-6">{settings.tuition_mode}</p>
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <Calendar className="w-5 h-5" />
                                <p className="text-lg">{settings.cohort_label}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-[#1C2237]">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.h2 className="text-3xl font-bold text-white mb-8" variants={fadeInUp}>
                            Ready to Start Your Coaching Journey?
                        </motion.h2>
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
                            variants={fadeInUp}
                        >
                            <div className="flex items-center gap-2 text-lg">
                                <Phone className="w-5 h-5 text-[#D95B24]" />
                                <span className="text-white">Call or WhatsApp</span>
                                <a href={`tel:${settings.contact_phone}`} className="font-bold text-[#D95B24] hover:underline">
                                    {settings.contact_phone}
                                </a>
                            </div>
                            <span className="hidden sm:inline text-gray-400">|</span>
                            <p className="text-lg font-semibold text-[#D95B24]">Limited Seats Available!</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="flex justify-center">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#D95B24] hover:bg-[#A34115] flex items-center justify-center text-white px-8 py-4 text-lg rounded-lg transition-transform transform hover:scale-105 active:scale-95"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Register Now
                            </button>
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <motion.footer
                className="bg-white border-t py-8"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-4">
                        <div className="w-12 h-12 mx-auto mb-2 bg-[#D95B24] rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-white">BA</span>
                        </div>
                        <h3 className="font-bold text-white">Blacksmith Africa Consulting</h3>
                    </div>
                    <p className="text-gray-500">
                        Empowering entrepreneurs across Africa through professional coaching and business development.
                    </p>
                </div>
            </motion.footer>

            <RegistrationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </div>
    )
}
