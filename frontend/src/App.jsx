import React from 'react'
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import { assets } from './assets/assets';

const App = () => {
  return (
    <div className="relative h-screen">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${assets.main_bg6})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6,
        }}
      />
      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col pt-20"> {/* pt-20 = 80px */}
        <ToastContainer />
        <Navbar /> {/* Place Navbar outside the padding if you want it to be global */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <div className='mt-auto'>
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default App