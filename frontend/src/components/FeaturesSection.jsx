import React from 'react'
import { assets } from "../assets/assets.js";

const FeaturesSection = () => {
    return (
        <div className='bg-gray-100 flex flex-col justify-center items-center my-8 py-10 px-[2%]'>
            <h1 className='text-3xl tracking-wider font-thin'>Why Choose E-Vending Machine?</h1>

            {/* features card */}
            <div className='max-w-[1200px] mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                {/* 1 */}
                <div className='bg-primary text-gray-200 p-4 rounded-lg'>
                    <div className='flex gap-5 items-center'>
                        <img className='w-15' src={assets.scan} alt="QR Code" />
                        <h2 className='text-2xl font-semibold text-white tracking-wider'>QR Scan to Shop</h2>
                    </div>
                    <p className='mt-2 italic leading-5'>Say goodbye to coins and cash hassles. Simply scan the QR code on the machine using your phone and instantly access a digital menu. Select your favorite items and enjoy a seamless shopping experience.</p>
                </div>

                {/* 2 */}
                <div className='bg-primary text-gray-200 p-4 rounded-lg'>
                    <div className='flex gap-5 items-center'>
                        <img className='w-15 invert' src={assets.contactless} alt="QR Code" />
                        <h2 className='text-2xl font-semibold text-white tracking-wider'>Contactless & Fast</h2>
                    </div>
                    <p className='mt-2 italic leading-5'>No more waiting in lines or touching shared buttons. Our vending machine ensures a quick and hygienic experience from scan to snack in just a few seconds.</p>
                </div>

                {/* 3 */}
                <div className='bg-primary text-gray-200 p-4 rounded-lg'>
                    <div className='flex gap-5 items-center'>
                        <img className='w-15 invert' src={assets.cart} alt="QR Code" />
                        <h2 className='text-2xl font-semibold text-white tracking-wider'>Smart Cart System</h2>
                    </div>
                    <p className='mt-2 italic leading-5'>Our intelligent digital cart allows you to add or remove items in real time. The system keeps track of stock availability, so you’ll never face “out of stock” surprises.</p>
                </div>
            </div>


        </div>
    )
}

export default FeaturesSection