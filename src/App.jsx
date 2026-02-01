
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Footer from './Components/Footer'
import Contact from './Pages/Contact'
import Book from './Pages/Book'
import Gallery from './Pages/Gallery'
import Events from './Pages/Events'
import Webinar from './Pages/Webinar'
import Podcast from './Pages/Podcast'
import BookLunch from './Components/book/BookLunch'
import PodcastHeader from './Components/podcast/PodcastHeader'
import Excerpt from './Components/excerpts/Excerpt'
import { BlogPage } from './Components/blog/BlogPage'
import { BlogDetails } from './Components/blog/BlogDetails'
import PaystackForm from './Components/PaystackForm'
import Coaching from './Pages/Coaching'
import WebinarRegister from './Pages/WebinarRegister'
import MobileApp from './Components/MobileApp'
import Application from './Components/Application'
import PromoPopup from './Components/PromoPopup'
import { useState, useEffect } from 'react'

function App() {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    const hasSeenPromo = sessionStorage.getItem('hasSeenPromo');
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setShowPromo(true);
      }, 1500); // Small delay for better UX
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePromo = () => {
    setShowPromo(false);
    sessionStorage.setItem('hasSeenPromo', 'true');
  };

  return (
    <div>
      <PromoPopup isOpen={showPromo} onClose={handleClosePromo} />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/books' element={<Book />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/events' element={<Events />} />
          <Route path='/webinars' element={<Webinar />} />
          <Route path='/podcast' element={<Podcast />} />
          <Route path='/launch' element={<BookLunch />} />
          <Route path='/podcastphotos' element={<PodcastHeader />} />
          <Route path='/excerpts' element={<Excerpt />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/paystack" element={<PaystackForm />} />
          <Route path='/coaching' element={<Coaching />} />
          <Route path='/webinar-register' element={<WebinarRegister />} />
          <Route path='/mobile-app' element={<MobileApp />} />
          <Route path='/application' element={<Application />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
