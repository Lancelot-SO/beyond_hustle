/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BsSoundwave } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import Shop from "./Shop";

const Navbar = () => {
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(location.pathname);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    // Update active link on route change
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    // Hide navbar while scrolling, show when scroll stops
    useEffect(() => {
        let scrollTimeout = null;

        const handleScroll = () => {
            setIsNavbarVisible(false);

            if (scrollTimeout) clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(() => {
                setIsNavbarVisible(true);
            }, 200);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        if (isMenuOpen) setIsMenuOpen(false);
    };

    const linkClass = (path) =>
        `${activeLink === path
            ? "text-[#D95B24] border-b-2 border-[#D95B24]"
            : "text-gray-700 border-b-2 border-transparent hover:text-[#D95B24] hover:border-[#D95B24]"
        } pb-1 transition-colors`;

    return (
        <>
            {/* Navbar */}
            <header
                className={`fixed top-0 left-0 w-full bg-white shadow-sm z-50
                transition-all duration-300 ease-in-out
                ${isNavbarVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
            >
                {/* Top Bar */}
                <div className="container mx-auto px-4 lg:px-14 tablet:px-10 4xl:px-32 py-2 flex flex-col md:flex-row items-center justify-between">
                    <div className="mt-4 md:mt-0 mb-2">
                        <Link
                            to="/mobile-app"
                            className="bg-[#D95B24] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#b74718] transition-colors"
                        >
                            Download App
                        </Link>
                    </div>
                    <div className="lg:text-right tablet:text-right text-center text-xs uppercase tracking-widest text-gray-600">
                        Get your go beyond hustle. Build boldly. Lead internationally.
                    </div>
                </div>

                {/* Main Nav */}
                <div className="container mx-auto flex items-center justify-between px-4 lg:px-14 tablet:px-10 4xl:px-32 py-4">
                    {/* Logo */}
                    <Link to="/" className="font-handwriting text-xl md:text-2xl">
                        Dr. Boahemaa Ntim
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:block tablet:block">
                        <ul className="flex items-center space-x-8 tablet:space-x-4">
                            {[
                                ["/", "Home"],
                                ["/about", "About"],
                                ["/books", "Books"],
                                ["/podcast", "Podcast"],
                                ["/webinars", "Webinars & Courses"],
                                ["/gallery", "Gallery"],
                            ].map(([path, label]) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        onClick={() => handleLinkClick(path)}
                                        className={linkClass(path)}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}

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

                            <li className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsShopOpen(true)}
                                    className="border border-[#D95B24] text-[#D95B24] px-4 py-2 hover:bg-[#D95B24]/10 transition-colors"
                                >
                                    Shop Now
                                </button>

                                <Link
                                    to="/contact"
                                    className="bg-[#D95B24] text-white px-4 py-2 hover:bg-orange-600 transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden tablet:hidden p-2"
                    >
                        {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={toggleMenu}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-[60%] bg-white/80 backdrop-blur-md
                border-r border-white/20 shadow-xl z-50
                transition-transform duration-300
                ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-6">
                    <Link to="/" className="font-handwriting text-xl mb-8 block">
                        Dr. Boahemaa Ntim
                    </Link>

                    <ul className="space-y-4">
                        {[
                            ["/", "Home"],
                            ["/about", "About"],
                            ["/books", "Books"],
                            ["/podcast", "Podcast"],
                            ["/webinars", "Webinars & Courses"],
                            ["/gallery", "Gallery"],
                        ].map(([path, label]) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    onClick={() => handleLinkClick(path)}
                                    className={`block text-lg py-2 border-b-2
                                    ${activeLink === path
                                            ? "text-[#D95B24] border-[#D95B24]"
                                            : "border-transparent hover:border-[#D95B24] hover:text-[#D95B24]"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}

                        <li>
                            <Link
                                to="/events"
                                onClick={() => handleLinkClick("/events")}
                                className={`flex items-center text-lg py-2 border-b-2
                                ${activeLink === "/events"
                                        ? "text-[#D95B24] border-[#D95B24]"
                                        : "border-transparent hover:border-[#D95B24] hover:text-[#D95B24]"
                                    }`}
                            >
                                <BsSoundwave className="mr-2" />
                                Speaking & Events
                            </Link>
                        </li>

                        <li className="pt-4 flex flex-col gap-3">
                            <button
                                onClick={() => {
                                    setIsShopOpen(true);
                                    setIsMenuOpen(false);
                                }}
                                className="border border-[#D95B24] text-[#D95B24] py-3 rounded-lg"
                            >
                                Shop Now
                            </button>

                            <Link
                                to="/contact"
                                onClick={() => handleLinkClick("/contact")}
                                className="bg-[#D95B24] text-white py-3 text-center rounded-lg"
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Shop Modal */}
            <Shop
                isOpen={isShopOpen}
                onClose={() => setIsShopOpen(false)}
                workbookTo="/paystack"
                artworkTo="/excerpts"
            />
        </>
    );
};

export default Navbar;
