/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Hero from '../Components/Hero'
import MainSection from '../Components/herosection/MainSection'
import PurpleSection from '../Components/herosection/PurpleSection'
import Resources from '../Components/herosection/Resources'
import Featured from '../Components/herosection/Featured'
import ImageGrid from '../Components/herosection/ImageGrid'
import BottomSection from '../Components/herosection/BottomSection'

const Home = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);
    return (
        <div>
            <Hero />
            <MainSection />
            <PurpleSection />
            <Resources />
            <Featured />
            <ImageGrid />
            <BottomSection />
        </div>
    )
}

export default Home