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
          backgroundImage: `url(${assets.main_bg2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4,
        }}
      />
      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        <ToastContainer />
        <div className='w-full flex flex-col justify-center items-center backdrop-blur-sm bg-primary/10'>
          <Navbar/>
        </div>
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