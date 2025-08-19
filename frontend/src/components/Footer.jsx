import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='bg-zinc-800 p-5 rounded-t-4xl'>
            <div className='flex flex-col sm:grid grid-cols-[2fr_2fr_2fr] gap-10 my-10  text-sm'>
                {/*----------Left Section------------*/}
                <div>
                    <img className='mb-5 w-[150px] rounded-full' src={assets.logo} alt="logo" />
                    <p className='w-full text-gray-300 italic font-thin'>E-Vending Machine is more than just a vending solution it’s a smart, cloud-powered, cashless ecosystem designed for modern lifestyles. By combining real-time inventory, secure payments, and contactless access, we make on-the-go shopping faster, safer, and more convenient than ever.
                      <br />
                      Wherever you are campuses, offices, or public spaces our mission is to bring you instant access to everyday essentials with just a scan.
                      <br />
                      E-Vending Machine redefining convenience, one scan at a time.
                    </p>
                </div>

                {/*----------Center Section------------*/}
                <div className='flex sm:flex-col gap-5 xl:flex-row xl:justify-evenly'>
                    <div>
                        <p className='text-xl font-medium mb-5 text-primary'>COMPANY</p>
                        <ul className='flex flex-col gap-1 text-gray-300 tracking-widest'>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Services</li>
                            <li>Contact us</li>
                            <li>FAQs</li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>

                    {/* working hours */}
                    <div className='flex flex-col'>
                        <p className='text-xl font-medium mb-5 text-primary'>Working Hours</p>
                        <ul className='flex flex-col gap-1 text-gray-300 tracking-widest'>
                            <li><span className='text-gray-400'>Monday - Friday:</span> 9:00 AM - 5:00 PM</li>
                            <li><span className='text-gray-400'>Saturday:</span> 9:00 AM - 1:00 PM</li>
                            <li><span className='text-gray-400'>Sunday:</span> Closed</li>
                        </ul>
                    </div>
                </div>




                {/*----------Right Section------------*/}
                <div>
                    <p className='text-xl font-medium mb-5 text-primary'>Contact Information</p>
                    <ul className='flex flex-col gap-2 text-gray-300 tracking-widest'>
                        <ul>
                            <p className='text-gray-400'>Address</p>
                            <li>Shibuya Scramble Square, 2-24-12 Shibuya, Shibuya City, Tokyo 150-0002, Japan</li>
                        </ul>
                        <ul>
                            <p className='text-gray-400'>Phone</p>
                            <li>+81 3-1234-5678</li>
                        </ul>
                        <ul>
                            <p className='text-gray-400'>Emergency</p>
                            <li>+81 80-9876-5432</li>
                        </ul>
                        <ul>
                            <p className='text-gray-400'>Email</p>
                            <li>e.vendingmachine@gmail.com</li>
                        </ul>
                    </ul>
                </div>
            </div>

            <hr className='bg-primary h-[1px] border-none' />

            <div className='md:flex md:gap-3 md:justify-center'>
                <div>
                <p className='py-5 text-sm text-center text-gray-400'>Copyright 2025@ E-Vending Machine - <span className='text-primary italic'>All Right Reserved.</span></p>
                </div>
            </div>
        </div>
    )
}

export default Footer