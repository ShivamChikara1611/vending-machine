import React from 'react'
import { assets } from "../assets/assets.js";

const Working = () => {
    return (
        <div className='flex flex-col justify-center items-center max-w-[1200px] mx-auto my-8 px-[2%]'>
            <h1 className='text-3xl tracking-wider font-thin'>How It Works!</h1>
            <h3 className='italic mt-1 max-w-[500px] text-center text-sm font-light'>Our E-Vending Machine transforms the traditional buying process into a smooth, cloud-powered digital journey. Here’s how it works in just a few easy steps:</h3>

            {/* workflow container  */}
            <div className='flex flex-col gap-2 mt-10 max-w-[400px]'>
                {/* 1 */}
                <div className='border-2 border-primary rounded-md p-3 text-center'>
                    <h5 className='text-primary tracking-wider text-xl mb-3'>Scan the Machine’s QR Code</h5>
                    <p className='font-light text-sm'>Every vending machine has its own unique QR code linked to the cloud. Customers simply scan it using their smartphone camera or any payment app. Within seconds, the live inventory of that specific machine appears on their screen no extra app or registration needed.</p>
                </div>

                <img className='w-10 mx-auto' src={assets.arrow} alt="Arrow Icon" />

                {/* 2 */}
                <div className='border-2 border-primary rounded-md p-3 text-center'>
                    <h5 className='text-primary tracking-wider text-xl mb-3'>Select Products in Real-Time</h5>
                    <p className='font-light text-sm'>Once connected, customers browse through a digital product catalog tailored to that machine. The smart cart system shows only items currently in stock, so users get accurate information before placing an order. This ensures transparency and eliminates the frustration of “out of stock” errors.</p>
                </div>

                <img className='w-10 mx-auto' src={assets.arrow} alt="Arrow Icon" />

                {/* 3 */}
                <div className='border-2 border-primary rounded-md p-3 text-center'>
                    <h5 className='text-primary tracking-wider text-xl mb-3'>Make a Secure Payment</h5>
                    <p className='font-light text-sm'>With a few taps, customers complete their purchase using trusted digital methods — UPI, wallets, debit/credit cards, or net banking. Every transaction is encrypted and verified instantly, ensuring both speed and security. The system confirms payment in real time, creating a seamless checkout experience.</p>
                </div>

                <img className='w-10 mx-auto' src={assets.arrow} alt="Arrow Icon" />

                {/* 4 */}
                <div className='border-2 border-primary rounded-md p-3 text-center'>
                    <h5 className='text-primary tracking-wider text-xl mb-3'>Collect Purchases Instantly</h5>
                    <p className='font-light text-sm'>As soon as payment is validated, the vending machine automatically dispenses the exact items purchased. Access is tightly controlled — only valid transactions trigger the machine, and the access ends immediately after dispensing. If customers want to shop again, they simply rescan the code to start fresh.</p>
                </div>
            </div>

            <p className='mt-10 italic font-thin text-center max-w-200'>Fast, reliable, and futuristic — no coins, no queues, no wasted time. With E-Vending Machine, buying your favorite snacks and drinks becomes a modern, effortless experience.</p>

        </div>
    )
}

export default Working