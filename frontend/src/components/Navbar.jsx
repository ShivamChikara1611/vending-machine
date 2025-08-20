import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='fixed z-[50] top-0 left-1/2 -translate-x-1/2 w-full flex items-center justify-between px-[5%] xl:px-2.5 xl:justify-between text-sm py-2 text-primary xl:rounded-full xl:my-3 xl:w-fit xl:min-w-[800px] backdrop-blur-sm bg-zinc-800 shadow-lg'>
      <img
        onClick={() => navigate('/')}
        className='h-[50px] w-[50px] rounded-full cursor-pointer'
        src={assets.logo}
        alt='nav-logo'
      />
      <ul className='hidden xl:flex items-start gap-5 font-medium tracking-widest xl:mr-20'>
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
      <div className='flex items-center gap-4 xl:hidden'>
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
              className='w-[40px] bg-gray-200 rounded-full p-2 cursor-pointer fixed right-3 top-3 z-50'
              src={assets.close} // <-- Set your close icon path here
              alt='close-icon'
            />
            <div className='fixed w-full h-screen right-0 top-0 bg-black/90 z-40 flex flex-col items-center justify-center text-gray-300'>
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