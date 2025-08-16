import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='flex items-center justify-between px-[5%] md:px-0 md:justify-evenly text-sm py-2 text-gray-200 w-full max-w-[1800px]'>
      <img
        onClick={() => navigate('/')}
        className='h-[50px] w-[50px] rounded-full cursor-pointer'
        src={assets.logo} // <-- Set your logo path here
        alt='nav-logo'
      />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
        <li className='py-1'>HOME</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about'>
        <li className='py-1'>ABOUT</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact'>
        <li className='py-1'>CONTACT</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      {/*--------Mobile Menu-----------*/}
      <div className='flex items-center gap-4 md:hidden'>
        {!showMenu ? (
          <img
            className='w-[40px] cursor-pointer'
            onClick={() => setShowMenu(true)}
            src={assets.menu} // <-- Set your menu icon path here
            alt='menu-icon'
          />
        ) : (
          <>
            <img
              onClick={() => setShowMenu(false)}
              className='w-[40px] cursor-pointer fixed right-5 top-5 z-50'
              src={assets.close} // <-- Set your close icon path here
              alt='close-icon'
            />
            <div className='fixed w-full h-screen right-0 top-0 bg-black/80 z-40 flex flex-col items-center justify-center text-gray-300'>
              <ul className='flex flex-col items-center gap-5 text-lg font-medium w-full'>
                <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-10 py-2 rounded-full'>HOME</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-10 py-2 rounded-full'>ABOUT</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-10 py-2 rounded-full'>CONTACT US</p></NavLink>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar