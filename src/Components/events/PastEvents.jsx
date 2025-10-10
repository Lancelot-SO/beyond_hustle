/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

import t1 from "../../assets/events/past1.png";
import t2 from "../../assets/events/past2.png";
import t3 from "../../assets/events/past3.png";

const talks = [
    {
        n: 1,
        title: "Beyond the Hustle: Building Businesses That Endure",
        blurb:
            "A practical, story-driven session exploring what it really takes to grow from a hustle into a structured, scalable business. Drawing from real African entrepreneur stories, this talk challenges the hustle mindset and offers frameworks for creating systems, teams, and sustainable growth.",
        type: "Keynote / Workshop",
        image: t1,
    },
    {
        n: 2,
        title:
            "Coaching Entrepreneurs for Impact: The Art and Science of Guiding Start-Ups",
        blurb:
            "Designed for mentors, business coaches, and accelerators, this session unpacks what it means to coach, not just teach. It explores coaching psychology, questioning techniques, and frameworks for accountability and transformation in entrepreneurs.",
        type: "Mentor Session",
        image: t2,
    },
    {
        n: 3,
        title: "From Idea to Impact: Turning Concepts into Viable Businesses",
        blurb:
            "A transformative workshop for entrepreneurs at the ideation stage who want to move from ‘dream’ to ‘do.’ It breaks down the essentials of problem validation, customer discovery, prototype testing, and business model design — helping founders build businesses that solve real problems and attract real customers.",
        type: "Hands-on Workshop",
        image: t3,
    },
    {
        n: 4,
        title: "Reinvent, Don’t Retreat: Lessons in Resilience from Business Failure",
        blurb:
            "Based on her upcoming book ‘You Failed, So What?’, this talk helps entrepreneurs reframe failure as a growth strategy. It weaves mindset science, personal stories, and business turnarounds into actionable lessons on how to fail forward.",
        type: "Keynote Talk",
        image: t1,
    },
    {
        n: 5,
        title: "Digital Presence and Storytelling for African SMEs",
        blurb:
            "A powerful workshop for small business owners on how to use digital tools, content, and storytelling to attract customers both online and offline. It includes practical strategies for brand building, lead generation, and social media marketing on a budget.",
        type: "SME Workshop",
        image: t2,
    },
    {
        n: 6,
        title:
            "Systems, Structures, and Strategy: The CEO’s Playbook for Scaling a Small Business",
        blurb:
            "A leadership-focused session for founders ready to move from founder chaos to CEO clarity. It delves into building organizational systems, setting KPIs, delegating effectively, and preparing the business for growth or investment.",
        type: "Leadership Session",
        image: t3,
    },
    {
        n: 7,
        title:
            "Money Matters: Funding, Financial Discipline, and the Entrepreneur’s Growth Journey",
        blurb:
            "An honest and interactive conversation about how entrepreneurs can position themselves for funding — from managing cash flow and credit to building investor-ready businesses. Draws from accelerator finance models, youth funds, and SME loan schemes.",
        type: "Finance Session",
        image: t1,
    },
    {
        n: 8,
        title:
            "The Future-Ready Entrepreneur: AI, Innovation, and the New Skills of Business Growth",
        blurb:
            "A timely session on how generative AI and digital tools are transforming entrepreneurship. Tailored for SMEs and professionals, it demystifies AI and shares practical ways to use it for marketing, operations, HR, and decision-making.",
        type: "Tech & Innovation",
        image: t2,
    },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
};

function Modal({ open, onClose, talk }) {
    if (!open || !talk) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="talk-title"
        >
            {/* Backdrop */}
            <button
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close modal"
            />

            {/* Dialog */}
            <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                    <img
                        src={talk.image}
                        alt={`${talk.title} banner`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                        {talk.type}
                    </span>
                </div>

                {/* Content */}
                <div className="space-y-3 p-5">
                    <h3 id="talk-title" className="text-xl font-semibold text-gray-900">
                        {talk.title}
                    </h3>
                    <p className="text-sm text-gray-700">{talk.blurb}</p>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={onClose}
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            type="button"
                        >
                            Close
                        </button>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-lg bg-[#D95B24] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                        >
                            Proceed to request
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    talk: PropTypes.shape({
        n: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        blurb: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        image: PropTypes.string, // path to static asset
    }),
};

Modal.defaultProps = {
    talk: null,
};

export default function PastEvents() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const onRequest = (t) => {
        setSelected(t);
        setOpen(true);
    };

    return (
        <section className="bg-white py-14 md:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
                {/* Heading */}
                <div className="mb-10 text-center md:mb-14">
                    <h2 className="text-[24px] leading-tight text-[#1C2237] md:text-[40px]">
                        <span className="text-[#D95B24]">Signature</span> Talks & Workshops
                    </h2>
                    <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
                        Curated sessions for founders, accelerators, and SME leaders.
                    </p>
                </div>

                {/* Uniform cards grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {talks.map((t) => (
                        <motion.article
                            key={t.n}
                            variants={item}
                            className="group flex h-[420px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md"
                        >
                            {/* Taller image banner */}
                            <div className="relative h-56 w-full overflow-hidden">
                                {t.image ? (
                                    <img
                                        src={t.image}
                                        alt={`${t.title} banner`}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-between bg-gradient-to-r from-orange-50 via-white to-orange-50 px-4">
                                        <div className="text-[11px] font-semibold uppercase tracking-wide text-[#D95B24] opacity-80">
                                            {t.type}
                                        </div>
                                        <div className="grid h-7 w-7 place-items-center rounded-full bg-[#D95B24] text-xs font-bold text-white">
                                            {t.n}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content area fills remaining height */}
                            <div className="flex flex-1 flex-col p-4">
                                <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
                                    {t.title}
                                </h3>
                                <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                                    {t.blurb}
                                </p>

                                {/* CTA row pinned to bottom */}
                                <div className="mt-auto pt-4">
                                    <button
                                        onClick={() => onRequest(t)}
                                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:border-[#D95B24]/30 hover:text-[#D95B24]"
                                        type="button"
                                        aria-label={`Request this talk: ${t.title}`}
                                    >
                                        Read More
                                        <span aria-hidden>→</span>
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>

            {/* Modal */}
            <Modal open={open} onClose={() => setOpen(false)} talk={selected} />
        </section>
    );
}

PastEvents.propTypes = {};
