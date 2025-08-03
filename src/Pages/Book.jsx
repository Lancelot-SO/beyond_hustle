/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import TopSection from '../Components/book/TopSection'
import BookSection from '../Components/book/BookSection'
import PurchaseSection from '../Components/book/PurchaseSection'
import BookBeyond from '../Components/book/BookBeyond'
import Testimonial from '../Components/book/Testimonial'
import BookFeature from '../Components/book/BookFeature'
import BookHustle from '../Components/book/BookHustle'
import ImageGrid from '../Components/herosection/ImageGrid'
import BottomSection from '../Components/herosection/BottomSection'

const Book = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);
    return (
        <div>
            <TopSection />
            <BookSection />
            <PurchaseSection />
            <BookBeyond />
            <Testimonial />
            <BookFeature />
            <BookHustle />
            <ImageGrid />
            <BottomSection />
        </div>
    )
}

export default Book