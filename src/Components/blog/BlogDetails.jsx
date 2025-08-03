import { Link, useParams } from "react-router-dom";
import blog1 from "../../assets/blog/blog1.png"
import blog2 from "../../assets/blog/blog2.png"
import blog3 from "../../assets/blog/blog3.png"
import blog4 from "../../assets/blog/blog4.png"
import blog5 from "../../assets/blog/blog5.png"
import blog6 from "../../assets/blog/blog6.png"
import { useEffect } from "react";

import gallerybg from "../../assets/gallery/gallerybg.png"


import AOS from 'aos'
import 'aos/dist/aos.css'
import BottomSection from "../herosection/BottomSection";

// Example posts data (replace with your actual data or import)
const posts = [
    { id: 1, imageSrc: blog1, altText: 'Medical staff at work', title: 'How To Differentiate Between Your Thoughts' },
    { id: 2, imageSrc: blog2, altText: 'Show Your Work sign', title: 'How To Differentiate Between Your Thoughts' },
    { id: 3, imageSrc: blog3, altText: 'Close-up of print media', title: 'How To Differentiate Between Your Thoughts' },
    { id: 4, imageSrc: blog4, altText: 'Lantern on table', title: 'How To Differentiate Between Your Thoughts' },
    { id: 5, imageSrc: blog5, altText: 'Bible on a shelf', title: 'How To Differentiate Between Your Thoughts' },
    { id: 6, imageSrc: blog6, altText: 'Laptop with news site', title: 'How To Differentiate Between Your Thoughts' },
];

// Blog detail page
export function BlogDetails() {
    const { id } = useParams();
    const relatedPosts = posts.filter(p => p.id !== parseInt(id, 10)).slice(0, 3);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        })
    }, [])

    return (
        <div className="bg-white py-12 md:py-24 lg:py-32">
            <div className="">
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
                                                              left-4 lg:left-[20%] 4xl:left-32
                                                              w-[340px] md:w-[500px] lg:w-[815px]
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
                            Are you been Held back by This
                        </h1>
                        <div className="flex flex-col items-center justify-center">
                            <span className="font-semibold italic text-white">By Elizabeth Gilbert</span>
                            <br />
                            <span className="text-sm text-[#D95B24]">April 5, 2025</span>
                        </div>

                    </div>


                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 max-w-3xl pt-10">
                {/* Main content */}
                <div className="mb-12">

                    <div className="prose prose-lg mx-auto font-playfair text-gray-800 leading-relaxed">

                        <p>
                            This is where the unique text content for blog post ID <span className="font-bold">{id}</span> will be displayed.
                        </p>
                        <p>
                            You would typically fetch this content from a database or an API based on the URL parameter.
                        </p>
                        <p>
                            This allows each blog post to have its own distinct write-up without being hardcoded.
                        </p>
                        <p className="mt-8 text-right">
                            I love all of you.<br />
                            Thanks for reading.<br />
                            Dr.Roohiemen.com
                        </p>
                    </div>
                </div>


            </div>
            {/* You May Also Like */}
            <div className="mt-20 px-4 lg:px-14 4xl:px-32">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand">You May Also Like</h2>
                    <Link to="/blog" className="text-sm hover:underline text-[#D95B24] font-playfair">View All</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map(post => (
                        <Link key={post.id} to={`/blog/${post.id}`} className="relative group overflow-hidden rounded-lg">
                            <img
                                src={post.imageSrc}
                                alt={post.altText}
                                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-colors duration-300" />
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-white text-lg md:text-xl font-medium">{post.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <BottomSection />
        </div>
    );
}