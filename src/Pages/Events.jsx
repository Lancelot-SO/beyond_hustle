/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import eventbg from "../assets/events/eventbg.png"
import AOS from 'aos'
import 'aos/dist/aos.css'
import EventsTop from '../Components/events/EventsTop'
import PastEvents from '../Components/events/PastEvents'
import Conference from '../Components/events/Conference'
import EventCard from '../Components/events/EventCards'
import EventVideo from '../Components/events/EventVideo'
import Testimonial from '../Components/book/Testimonial'
import MailContact from '../Components/MailContact'

const Events = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        })
    }, [])
    return (
        <div>
            <div className="mt-[100px] md:mt-[80px] lg:mt-[100px]">
                <div className="relative">
                    {/* hero image shrinks height on smaller breakpoints */}
                    <img
                        src={eventbg}
                        alt="Hero Image"
                        className="w-full h-[300px] lg:h-full object-cover"
                    />

                    {/* headline container */}
                    <div
                        className="
                                      absolute
                                      top-[50%] md:top-16 lg:top-48 tablet:top-20
                                      left-4 lg:left-14 4xl:left-32
                                      w-[340px] md:w-[500px] lg:w-[675px]
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
                            Book Dr.boahemaa Ntim
                            to Speak
                        </h1>
                    </div>


                </div>
            </div>

            <EventsTop />
            <PastEvents />
            <Conference />
            <EventCard />
            <EventVideo />
            <Testimonial />
            <MailContact />
        </div>
    )
}

export default Events