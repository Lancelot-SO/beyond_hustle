/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React from 'react'
import AboutHeader from '../Components/about/AboutHeader';
import TopSection from '../Components/about/TopSection';
import AboutSection from '../Components/about/AboutSection';
import NextSection from '../Components/about/NextSection';
import AboutHustle from '../Components/about/AboutHustle';
import AboutMission from '../Components/about/AboutMission';
import AboutBio from '../Components/about/AboutBio';
import ImageGrid from '../Components/herosection/ImageGrid';
import BottomSection from '../Components/herosection/BottomSection';



const About = () => {
    return (
        <div>
            <div className="">
                <AboutHeader />
                <TopSection />
                <AboutSection />
                <NextSection />
                {/* will create a new component for this section if changed*/}
                <AboutSection />
                <AboutHustle />
                <AboutMission />
                <AboutBio />
                <ImageGrid />
                <BottomSection />
            </div>
        </div>
    )
}

export default About