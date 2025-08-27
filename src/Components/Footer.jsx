/* eslint-disable no-unused-vars */
// Footer.jsx
import React, { useState, useEffect, useRef } from 'react'
import { Instagram, Twitter, Music, Linkedin, ChevronUp, Star } from 'lucide-react'
import { FaTiktok } from 'react-icons/fa'

export default function Footer() {
    const [showScrollToTop, setShowScrollToTop] = useState(false)
    const instagramRef = useRef(null)
    const twitterRef = useRef(null)
    const tiktokRef = useRef(null)
    const linkedinRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 200)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="w-full">
            {/* Top section */}
            <div className="bg-[#1C2237] text-white py-8 md:py-12 px-4 lg:px-14 4xl:px-32 relative">
                <div className="container mx-auto  flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left section: Name and Star */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center mb-2">
                            <h2 className="text-3xl md:text-4xl font-handwriting leading-[30px]">Dr. Boahemaa Ntim</h2>
                        </div>
                    </div>

                    {/* Right section: Social Icons */}
                    <div className="flex gap-8 mt-2 md:mt-0 justify-center md:justify-end">
                        <a
                            href="https://www.instagram.com/bthustlegh"
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={instagramRef}
                            aria-label="Instagram"
                        >
                            <Instagram className="h-6 w-6 hover:text-vibrant-orange transition-colors hover:text-[#D95B24]" />
                        </a>
                        <a
                            href="https://x.com/bthustlegh"
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={twitterRef}
                            aria-label="Twitter"
                        >
                            <Twitter className="h-6 w-6 hover:text-vibrant-orange transition-colors hover:text-[#D95B24]" />
                        </a>
                        <a
                            href="https://www.tiktok.com/@bthustlegh"
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={tiktokRef}
                            aria-label="TikTok"
                        >
                            <FaTiktok className="h-6 w-6 hover:text-vibrant-orange transition-colors hover:text-[#D95B24]" />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/beyond-the-hustle-gh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={linkedinRef}
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-6 w-6 hover:text-vibrant-orange transition-colors hover:text-[#D95B24]" />
                        </a>
                    </div>
                </div>

                {/* Scroll-to-top */}
                {showScrollToTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-4 right-4 bg-[#D95B24] text-white p-2 rounded-sm shadow-lg hover:bg-gray-800 transition-colors z-50"
                        aria-label="Scroll to top"
                    >
                        <ChevronUp className="h-6 w-6" />
                    </button>
                )}
            </div>

            {/* Bottom section */}
            <div className="bg-[#FCF8F1] text-gray-700 py-4 text-xs text-center px-4 md:px-6">
                <p>
                    ARTFRICA STUDIOS – {new Date().getFullYear()} |{' '}
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Privacy Policy
                    </a>{' '}
                    |{' '}
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Terms & Conditions
                    </a>{' '}
                    | All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}
