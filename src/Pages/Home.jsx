/* eslint-disable no-unused-vars */
import React from 'react'
import Hero from '../Components/Hero'
import MainSection from '../Components/herosection/MainSection'
import PurpleSection from '../Components/herosection/PurpleSection'
import Resources from '../Components/herosection/Resources'
import Featured from '../Components/herosection/Featured'
import ImageGrid from '../Components/herosection/ImageGrid'
import BottomSection from '../Components/herosection/BottomSection'

const Home = () => {
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