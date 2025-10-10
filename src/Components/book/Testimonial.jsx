/* eslint-disable no-unused-vars */
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// replace these with your actual image imports
import person1 from '../../assets/about/person1.jpg'
import person2 from '../../assets/about/person2.jpg'
import person3 from '../../assets/about/person3.jpg'


const testimonials = [
    {
        image: person1, // Using the provided image for the first testimonial
        quote:
            "At last. At last this very important book has been written, encouraging women to take up all the creative space they deserve in the world.",
        name: "DAVIDA DZATO",
        title: "UI/UX Designer",
    },
    {
        image: person2, // Placeholder for second person
        quote: "“Beyond the Hustle has given me the clarity and courage to lead my team with purpose.”",
        name: "LANCELOT HANS",
        title: "Tech Entrepreneur",
    },
    {
        image: person3, // Placeholder for third person
        quote: "“A must‑read for anyone who feels stuck in the grind. Tara’s insights are pure gold.”",
        name: "MARY SMITH",
        title: "Creative Director",
    },
]

export default function Testimonial() {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
                <ul style={{ margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
                    {dots}
                </ul>
            </div>
        ),
        customPaging: i => (
            <div
                className="w-3 h-3 rounded-full border border-gray-400 mx-1 cursor-pointer"
                style={{ backgroundColor: 'transparent' }}
            />
        ),
    }
    return (
        <section className="py-16 flex flex-col items-center justify-center bg-[#f8f6f6]">
            {/* override active dot fill */}
            <style>
                {`
      .slick-dots li.slick-active div {
        background-color: #4B5563 !important;
      }
    `}
            </style>

            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold">
                    <span className="text-[#F3732D]">What</span> Are <span className="text-[#F3732D]">They</span> Saying
                </h2>
                <div className="mt-4 space-y-1">
                    <div className="h-1 w-24 mx-auto bg-[#C4C1B7] rounded"></div>
                    <div className="h-1 w-32 mx-auto bg-[#C4C1B7] rounded"></div>
                </div>
            </div>

            {/* Slider */}
            <div className="w-full max-w-[900px] h-auto md:h-[450px] px-4">
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index}>
                            <div className="flex flex-col items-center justify-center h-full w-full p-4 md:p-8 rounded">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    loading='lazy'
                                    className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover"
                                />
                                <p className="mt-4 text-center text-[#4B4B4B] font-openSans text-base md:text-[24px]">
                                    {testimonial.quote}
                                </p>
                                <h3 className="mt-4 text-[#4B4B4B] font-openSans text-lg md:text-[20px]">
                                    {testimonial.name}
                                </h3>
                                <p className="text-gray-500 text-[14px]">{testimonial.title}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>

    )
}
