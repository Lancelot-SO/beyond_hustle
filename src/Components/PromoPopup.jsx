import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Gift, MousePointer2, Smartphone, ShoppingBag, Mail, Trophy } from 'lucide-react';

const PromoPopup = ({ isOpen, onClose }) => {
    const steps = [
        {
            icon: <MousePointer2 className="w-5 h-5 text-amber-500" />,
            mobileIcon: <Smartphone className="w-5 h-5 text-amber-500" />,
            text: "Click on shop now button at the top right section of the navbar (for mobile devices click on the hamburger menu at the top right corner)."
        },
        {
            icon: <ShoppingBag className="w-5 h-5 text-amber-500" />,
            text: "Click buy (Purchase work book)"
        },
        {
            icon: <CheckCircle2 className="w-5 h-5 text-amber-500" />,
            text: "Fill out workbook purchasing form and purchase workbook."
        },
        {
            icon: <Mail className="w-5 h-5 text-amber-500" />,
            text: "An email will be sent to you containing both receipt number and link to application form."
        },
        {
            icon: <CheckCircle2 className="w-5 h-5 text-amber-500" />,
            text: "Fill out the application form with the receipt number you received in your email."
        },
        {
            icon: <Trophy className="w-5 h-5 text-amber-500" />,
            text: "Be a lucky business owner to win GHS10,000."
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20"
                    >
                        {/* Header/Banner */}
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <Gift className="w-8 h-8 animate-bounce" />
                                    <span className="text-amber-100 font-medium tracking-wider uppercase text-sm">Special Opportunity</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">5 Businesses will win GHS 10,000!</h2>
                                <p className="text-amber-50/90 text-lg">Follow these steps below to apply and elevate your business.</p>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl" />
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-6">
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                        className="flex gap-4 group"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center font-bold text-amber-600 group-hover:scale-110 transition-transform">
                                            {index + 1}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                {step.icon}
                                                {step.mobileIcon && <span className="text-zinc-400">/</span>}
                                                {step.mobileIcon}
                                            </div>
                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                                                {step.text}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Footer/Actions */}
                        <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <button
                                onClick={onClose}
                                className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium transition-colors order-2 md:order-1"
                            >
                                Maybe later
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full md:w-auto px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg order-1 md:order-2"
                            >
                                Got it, Let's go!
                            </button>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-white transition-colors z-20"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PromoPopup;
