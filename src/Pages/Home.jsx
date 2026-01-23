/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Hero from '../Components/Hero'
import MainSection from '../Components/herosection/MainSection'
import PurpleSection from '../Components/herosection/PurpleSection'
import Resources from '../Components/herosection/Resources'
import Featured from '../Components/herosection/Featured'
import ImageGrid from '../Components/herosection/ImageGrid'
import BottomSection from '../Components/herosection/BottomSection'
// import PopupImageModal from '../Components/PopupImageModal'
import ArtSale from '../Components/herosection/ArtSale'

const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    return (
        <div>
            {/* Show popup modal */}
            {/* <PopupImageModal /> */}

            <Hero />
            <MainSection />
            <PurpleSection />
            <ArtSale />
            <Resources />
            <Featured />
            <ImageGrid />
            <BottomSection />
        </div>
    )
}

export default Home
