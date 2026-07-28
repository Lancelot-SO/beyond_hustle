/* eslint-disable no-unused-vars */
import React from 'react';
import vector1 from "../../assets/webinar/vector1.png"
import vector2 from "../../assets/webinar/vector2.png"
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContent } from '../../lib/useContent';
import { useScrollToHash } from '../../lib/useScrollToHash';


// Static fallback shown until the CMS responds (or if it is unreachable).
const fallbackWebinars = [
    { id: 'f1', title: 'Smart Money Habits for Young Adults', register_link: null, is_wide: false },
    { id: 'f2', title: 'EARN EXTRA INCOME OF OVER GHS10K A MONTH!', register_link: '/coaching', is_wide: false },
    { id: 'f3', title: 'Mastering the Basics of Personal Finance webinar', register_link: null, is_wide: true },
]

const RegisterButton = ({ link }) => {
    const className = 'w-[154px] h-[48px] flex items-center justify-center text-white bg-[#D95B24] hover:bg-[#d3693f] shadow-lg';
    if (link && /^https?:\/\//.test(link)) {
        return <a href={link} target="_blank" rel="noopener noreferrer" className={className}>Register</a>;
    }
    return <Link to={link || '#'} className={className}>Register</Link>;
}

RegisterButton.propTypes = {
    link: PropTypes.string,
};

export default function WebinarCard() {
    const webinars = useContent('webinars', fallbackWebinars);
    useScrollToHash('upcoming-sessions');

    return (
        <section id="upcoming-sessions" className="py-16 px-4 lg:px-14 4xl:px-32 bg-white scroll-mt-[110px]">
            {/* Heading */}
            <div className="flex items-center justify-center mb-12">
                <div className="flex-grow border-t border-gray-300 mx-4"></div>
                <h2 className="font-playfair font-semibold text-[#1C2237] text-[20px] md:text-[40px]">
                    Browse Our  <span className="text-[#D95B24]">Upcoming Sessions</span>
                </h2>
                <div className="flex-grow border-t border-gray-300 mx-4"></div>
            </div>

            {/* Cards; a "wide" card is 60% wider on desktop */}
            <div className="flex flex-col md:flex-row flex-wrap gap-6 md:gap-8">
                {webinars.map((webinar, index) => (
                    <div
                        key={webinar.id}
                        className={`relative w-full ${webinar.is_wide ? 'md:flex-[1.6]' : 'md:flex-1'} bg-[#F5E4C4] px-6 md:px-12 py-8 md:h-[407px] flex items-center justify-center`}
                    >
                        <img
                            src={index % 2 === 0 ? vector1 : vector2}
                            alt=""
                            aria-hidden="true"
                            className={`absolute right-0 w-[139px] h-[139px] object-cover ${index % 2 === 0 ? 'top-0' : 'bottom-0'}`}
                            loading='lazy'
                        />
                        <div className='flex flex-col items-center gap-4'>
                            <h3 className="font-openSans font-semibold text-[#1C2237] text-[18px] md:text-[24px] text-center">
                                {webinar.title}
                            </h3>
                            <RegisterButton link={webinar.register_link} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
