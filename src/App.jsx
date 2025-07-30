
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Footer from './Components/Footer'
import Contact from './Pages/Contact'
import Book from './Pages/Book'
import Gallery from './Pages/Gallery'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/books' element={<Book />} />
          <Route path='/gallery' element={<Gallery />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
