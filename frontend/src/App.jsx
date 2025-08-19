import React from 'react'
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from './assets/assets';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ScanVendingMachine from './components/ScanVendingMachine';

const App = () => {
  return (
      <div className="z-10 pt-17 xl:pt-20"> {/* pt-20 = 80px */}
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/scan" element={<ScanVendingMachine />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App