/* eslint-disable no-unused-vars */
import React from 'react';
import vector1 from "../../assets/webinar/vector1.png"
import vector2 from "../../assets/webinar/vector2.png"
import { Link } from 'react-router-dom';


export default function WebinarCard() {
    return (
        <section className="py-16 px-4 lg:px-14 4xl:px-32 bg-white">
            {/* Heading */}
            <div className="flex items-center justify-center mb-12">
                <div className="flex-grow border-t border-gray-300 mx-4"></div>
                <h2 className="font-playfair font-semibold text-[#1C2237] text-[20px] md:text-[40px]">
                    Browse Our  <span className="text-[#D95B24]">Upcoming Sessions</span>
                </h2>
                <div className="flex-grow border-t border-gray-300 mx-4"></div>
            </div>

            {/* Cards with third 60% wider */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="relative w-full md:flex-1 bg-[#F5E4C4] px-6 md:px-12 py-8 md:h-[407px] flex items-center justify-center">
                    <img
                        src={vector1}
                        alt="The Power Of Breakthrough Thinking"
                        className="absolute top-0 right-0 w-[139px] h-[139px] object-cover"
                        loading='lazy'

                    />
                    <div className='flex flex-col items-center gap-4'>
                        <h3 className="font-openSans font-semibold text-[#1C2237] text-[18px] md:text-[24px] text-center">
                            Smart Money Habits for Young Adults
                        </h3>
                        <Link to="#" className='w-[154px] h-[48px] flex items-center justify-center text-white bg-[#D95B24] hover:bg-[#d3693f] shadow-lg'>Register</Link>
                    </div>
                </div>
                <div className="relative w-full md:flex-1 bg-[#F5E4C4] px-6 md:px-12 py-8 md:h-[407px] flex items-center justify-center">
                    <img
                        src={vector2}
                        alt="The Power Of Breakthrough Thinking"
                        className="absolute bottom-0 right-0 w-[139px] h-[139px] object-cover"
                        loading='lazy'

                    />
                    <div className='flex flex-col items-center gap-4'>
                        <h3 className="font-openSans font-semibold text-[#1C2237] text-[18px] md:text-[24px] text-center">
                            EARN EXTRA INCOME OF OVER GHS10K A MONTH!
                        </h3>
                        <Link to="/coaching" className='w-[154px] h-[48px] flex items-center justify-center text-white bg-[#D95B24] hover:bg-[#d3693f] shadow-lg'>Register</Link>
                    </div>
                </div>
                <div className="relative w-full md:flex-[1.6] bg-[#F5E4C4] px-6 md:px-12 py-8 md:h-[407px] flex items-center justify-center">
                    <img
                        src={vector1}
                        alt="The Power Of Breakthrough Thinking"
                        className="absolute top-0 right-0 w-[139px] h-[139px] object-cover"
                        loading='lazy'

                    />
                    <div className='flex flex-col items-center gap-4'>
                        <h3 className="font-openSans font-semibold text-[#1C2237] text-[18px] md:text-[24px] text-center">
                            Mastering the Basics of Personal Finance webinar
                        </h3>
                        <Link to="#" className='w-[154px] h-[48px] flex items-center justify-center text-white bg-[#D95B24] hover:bg-[#d3693f] shadow-lg'>Register</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
