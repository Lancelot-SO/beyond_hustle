/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { BsSoundwave } from "react-icons/bs"
import { HiMenu, HiX } from "react-icons/hi"
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeLink, setActiveLink] = useState("/")

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    // mark clicked link active, and close mobile menu if open
    const handleLinkClick = (path) => {
        setActiveLink(path)
        if (isMenuOpen) setIsMenuOpen(false)
    }

    // helper to build classes
    const linkClass = (path) =>
        `${activeLink === path
            ? "text-[#D95B24] border-b-2 border-[#D95B24]"
            : "text-gray-700 border-b-2 border-transparent hover:text-[#D95B24] hover:border-[#D95B24]"
        } pb-1 transition-colors`

    return (
        <>
            {/* Fixed Navbar */}
            <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
                {/* Tagline */}
                <div className="container mx-auto px-4 md:px-8 lg:px-14 4xl:px-32 py-2">
                    <div className="lg:text-right text-center text-xs uppercase tracking-widest text-gray-600">
                        Get your go beyond hustle. Build boldly. Lead internationally Book!
                    </div>
                </div>

                {/* Desktop nav + mobile toggle */}
                <div className="container mx-auto flex items-center justify-between px-4 md:px-6 lg:px-14 4xl:px-32 py-4">
                    {/* Logo */}
                    <Link to="/" className="font-handwriting text-xl md:text-2xl">
                        Dr. Boahemaa Ntim
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:block">
                        <ul className="flex items-center space-x-8">
                            <li>
                                <Link
                                    to="/"
                                    onClick={() => handleLinkClick("/")}
                                    className={linkClass("/")}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    onClick={() => handleLinkClick("/about")}
                                    className={linkClass("/about")}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/books"
                                    onClick={() => handleLinkClick("/books")}
                                    className={linkClass("/books")}
                                >
                                    Books
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/events"
                                    onClick={() => handleLinkClick("/events")}
                                    className={linkClass("/events")}
                                >
                                    <div className="flex items-center">
                                        <BsSoundwave className="w-4 h-4 mr-1" />
                                        Speaking & Events
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/podcast"
                                    onClick={() => handleLinkClick("/podcast")}
                                    className={linkClass("/podcast")}
                                >
                                    Podcast
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/webinars"
                                    onClick={() => handleLinkClick("/webinars")}
                                    className={linkClass("/webinars")}
                                >
                                    Webinars & Courses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/gallery"
                                    onClick={() => handleLinkClick("/gallery")}
                                    className={linkClass("/gallery")}
                                >
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    onClick={() => handleLinkClick("/contact")}
                                    className="bg-[#D95B24] text-white px-4 py-2 hover:bg-orange-600 transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleMenu}
                />
            )}

            {/* Mobile sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-[60%] bg-white/80 backdrop-blur-md border-r border-white/20 shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-6">
                    <Link to="/" className="font-handwriting text-xl md:text-2xl mb-8 block">
                        Dr. Boahemaa Ntim
                    </Link>
                    <nav>
                        <ul className="space-y-6">
                            <li>
                                <Link
                                    to="/"
                                    onClick={() => handleLinkClick("/")}
                                    className={`block text-lg ${activeLink === "/"
                                        ? "text-[#D95B24] border-b-2 border-[#D95B24]"
                                        : "text-gray-800 hover:text-[#D95B24] border-b-2 border-transparent hover:border-[#D95B24]"
                                        } py-2 px-2 rounded-lg transition-colors`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    onClick={() => handleLinkClick("/about")}
                                    className={`block text-lg ${activeLink === "/about"
                                        ? "text-[#D95B24] border-b-2 border-[#D95B24]"
                                        : "text-gray-800 hover:text-[#D95B24] border-b-2 border-transparent hover:border-[#D95B24]"
                                        } py-2 px-2 rounded-lg transition-colors`}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/books"
                                    onClick={() => handleLinkClick("/books")}
                                    className={`block text-lg ${activeLink === "/books"
                                        ? "text-[#D95B24] border-b-2 border-[#D95B24]"
                                        : "text-gray-800 hover:text-[#D95B24] border-b-2 border-transparent hover:border-[#D95B24]"
                                        } py-2 px-2 rounded-lg transition-colors`}
                                >
                                    Books
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/events"
                                    onClick={() => handleLinkClick("/events")}
                                    className={`flex items-center text-lg ${activeLink === "/events"
                                        ? "text-[#D95B24] border-b-2 border-[#D95B24]"
                                        : "text-gray-800 hover:text-[#D95B24] border-b-2 border-transparent hover:border-[#D95B24]"
                                        } py-2 px-2 rounded-lg transition-colors`}
                                >
                                    <BsSoundwave className="w-5 h-5 mr-2" />
                                    Speaking & Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/podcast"
                                    onClick={() => handleLinkClick("/podcast")}
                                    className={`block text-lg ${activeLink === "/podcast"
                                        ? "text-[#D95B24] border-b-2 border-[#D95B24]"
                                        : "text-gray-800 hover:text-[#D95B24] border-b-2 border-transparent hover:border-[#D95B24]"
                                        } py-2 px-2 rounded-lg transition-colors`}
                                >
                                    Podcast
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/webinars"
                                    onClick={() => handleLinkClick("/webinars")}
                                    className={`block text-lg ${activeLink === "/webinars"
                                        ? "text-[#D95B24] border-b-2 border-[#D95B24]"
                                        : "text-gray-800 hover:text-[#D95B24] border-b-2 border-transparent hover:border-[#D95B24]"
                                        } py-2 px-2 rounded-lg transition-colors`}
                                >
                                    Webinars & Courses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/gallery"
                                    onClick={() => handleLinkClick("/gallery")}
                                    className={`block text-lg ${activeLink === "/gallery"
                                        ? "text-[#D95B24] border-b-2 border-[#D95B24]"
                                        : "text-gray-800 hover:text-[#D95B24] border-b-2 border-transparent hover:border-[#D95B24]"
                                        } py-2 px-2 rounded-lg transition-colors`}
                                >
                                    Gallery
                                </Link>
                            </li>
                            <li className="pt-4">
                                <Link
                                    to="/contact"
                                    onClick={() => handleLinkClick("/contact")}
                                    className="block bg-[#D95B24]/90 text-white px-6 py-3 text-center hover:bg-[#D95B24] transition-colors rounded-lg shadow-lg"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar
