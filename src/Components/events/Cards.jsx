/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ease = [0.22, 1, 0.36, 1];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

export default function Cards() {
    const cards = [
        {
            title: "The Power Of Breakthrough Thinking",
            accent: "from-[#FFE8D6] via-[#FFF8EE] to-[#F5E4C4]",
            shadow: "shadow-[0_12px_30px_rgba(217,91,36,0.10)]",
        },
        {
            title: "Built To Belong: Community Over Competition",
            accent: "from-[#EAF0FF] via-white to-[#F5E4C4]",
            shadow: "shadow-[0_12px_30px_rgba(28,34,55,0.10)]",
        },
        {
            title: "Bold And Boundless Courage",
            accent: "from-[#FFF1E9] via-[#FFE2CF] to-[#F5E4C4]",
            shadow: "shadow-[0_12px_30px_rgba(217,91,36,0.16)]",
            wide: true, // 60% wider on desktop
        },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6 md:flex-row md:gap-8"
        >
            {cards.map((c, i) => (
                <motion.article
                    key={i}
                    variants={item}
                    className={[
                        "group relative isolate overflow-hidden rounded-2xl border border-black/5",
                        "bg-[#F5E4C4]/30 backdrop-blur-[1px]",
                        "transition-[transform,box-shadow] duration-300",
                        "hover:-translate-y-0.5",
                        c.shadow,
                        "focus-within:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[#D95B24]/30",
                        "w-full md:h-[407px] flex items-center justify-center px-6 md:px-12",
                        c.wide ? "md:flex-[1.6]" : "md:flex-1",
                    ].join(" ")}
                    tabIndex={0}
                    aria-label={c.title}
                >
                    {/* decorative blobs/gradients */}
                    <div
                        className={[
                            "pointer-events-none absolute inset-0 opacity-80",
                            "bg-gradient-to-br", c.accent,
                        ].join(" ")}
                    />
                    <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-[#D95B24]/10 blur-3xl" />

                    {/* subtle grid overlay */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background:radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* content */}
                    <h3
                        className="relative z-10 max-w-[20ch] text-center font-playfair font-semibold text-[#1C2237]
                       text-[18px] leading-tight md:text-[24px]"
                    >
                        {c.title}
                    </h3>

                    {/* chip + arrow on hover/focus */}
                    <div
                        className="pointer-events-none absolute bottom-4 left-0 right-0 mx-auto flex w-full max-w-[90%]
                       items-center justify-center gap-2 opacity-0 transition-opacity duration-300
                       group-hover:opacity-100 group-focus-within:opacity-100"
                    >
                        <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur">
                            Featured
                        </span>
                        <span className="text-xs text-gray-600">Explore</span>
                        <span className="text-sm" aria-hidden>
                            →
                        </span>
                    </div>

                    {/* focus ring for keyboard users */}
                    <span className="absolute inset-0 rounded-2xl ring-0 ring-[#D95B24]/20 transition-[ring,transform] duration-300 group-hover:ring-2 group-focus-within:ring-2" />
                </motion.article>
            ))}
        </motion.div>
    );
}

Cards.propTypes = {};
