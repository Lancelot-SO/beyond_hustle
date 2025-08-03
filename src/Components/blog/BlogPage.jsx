// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blog1 from "../../assets/blog/blog1.png"
import blog2 from "../../assets/blog/blog2.png"
import blog3 from "../../assets/blog/blog3.png"
import blog4 from "../../assets/blog/blog4.png"
import blog5 from "../../assets/blog/blog5.png"
import blog6 from "../../assets/blog/blog6.png"

import gallerybg from "../../assets/gallery/gallerybg.png"


import AOS from 'aos'
import 'aos/dist/aos.css'
import BottomSection from '../herosection/BottomSection';


// Shared posts data
const posts = [
    { id: 1, imageSrc: blog1, altText: 'Medical staff at work', title: 'How To Differentiate Between Your Thoughts' },
    { id: 2, imageSrc: blog2, altText: 'Show Your Work sign', title: 'How To Differentiate Between Your Thoughts' },
    { id: 3, imageSrc: blog3, altText: 'Close-up of print media', title: 'How To Differentiate Between Your Thoughts' },
    { id: 4, imageSrc: blog4, altText: 'Lantern on table', title: 'How To Differentiate Between Your Thoughts' },
    { id: 5, imageSrc: blog5, altText: 'Bible on a shelf', title: 'How To Differentiate Between Your Thoughts' },
    { id: 6, imageSrc: blog6, altText: 'Laptop with news site', title: 'How To Differentiate Between Your Thoughts' },
];

// Blog listing page
export function BlogPage() {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        })
    }, [])

    useEffect(() => {
        // Trigger the fade-in animation
        setIsVisible(true);
    }, []);

    return (
        <div>
            <div className="mt-[100px] md:mt-[80px] lg:mt-[100px]">
                <div className="relative">
                    {/* hero image shrinks height on smaller breakpoints */}
                    <img
                        src={gallerybg}
                        alt="Hero Image"
                        className="w-full h-[300px] lg:h-full object-cover"
                    />

                    {/* headline container */}
                    <div
                        className="
                                                  absolute
                                                  top-[50%] md:top-16 lg:top-48
                                                  left-4 lg:left-14 4xl:left-32
                                                  w-[340px] md:w-[500px] lg:w-[615px]
                                                  h-auto md:h-auto lg:h-[216px]
                                                "
                    >
                        <h1
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="
                                                    font-playfair text-white
                                                    text-[32px] md:text-[48px] lg:text-[64px]
                                                    leading-[24px] md:leading-[36px] lg:leading-[72px]
                                                    font-normal tracking-[-5%]
                                                  "
                        >
                            Articles & Blogs
                        </h1>
                    </div>


                </div>
            </div>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Title with flanking lines */}
                    <div className="flex items-center justify-center mb-12">
                        <div className="flex-1 h-px bg-[#B7AE9E]" />
                        <h2 className="px-6 font-playfair text-2xl font-semibold">
                            <span className="text-[#D95B24]">Explore</span> Our <span className="text-[#D95B24]">Gallery</span> Collection
                        </h2>
                        <div className="flex-1 h-px bg-[#B7AE9E]" />
                    </div>

                    {/* Posts grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, idx) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.id}`}
                                className={`relative group overflow-hidden rounded-lg transform transition-transform duration-300
                ${isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'} hover:shadow-xl`
                                }
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <img
                                    src={post.imageSrc}
                                    alt={post.altText}
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-colors duration-300" />
                                {/* Title */}
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-white text-lg md:text-xl font-medium">{post.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <BottomSection />
        </div>

    );
}