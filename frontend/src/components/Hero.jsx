import React from "react";
import { VendingMachineCanvas } from "../canvas/index.js";
import { useNavigate } from "react-router";
import { assets } from "../assets/assets.js";

const Hero = () => {

  const navigate = useNavigate();

  const handleScanNow = () => {
    navigate("/scan");
  };

  return (
    <div style={{ backgroundImage: `url(${assets.main_bg6})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className="md:max-w-[1200px] mx-auto xl:flex justify-around items-center relative xl:rounded-xl overflow-hidden xl:mt-8">

      {/* overlay container */}
      <div className="absolute top-0 left-0 w-full h-full z-[1] bg-black/35" />

      {/* 3D Canvas */}
      <div className="absolute top-0 left-0 w-full h-[65vh] lg:h-[calc(80vh-4rem)] xl:relative lg:z-10 pointer-events-none">
        <VendingMachineCanvas />
      </div>

      {/* Text Content */}
      <div className="text-right min-h-[65vh] lg:min-h-[calc(80vh-4rem)] flex flex-col items-end justify-center p-[2%] relative z-20">
        <h1 className="font-extrabold text-white text-6xl md:text-8xl lg:text-9xl xl:text-8xl">
          Smart. <span className="text-third">Fast.</span> Contactless
        </h1>
        <h3 className="text-2xl lg:text-4xl xl:text-2xl font-medium mt-4 text-white">- The Future of Vending is Here!</h3>
        <p className="italic mt-3 md:mt-5 text-gray-200 font-normal text-md md:text-xl lg:text-2xl xl:text-xl max-w-150">
          With E-Vending Machine, grab your favorite snacks & drinks anytime, anywhere – <span className="text-white">all with a simple scan & pay.</span>
        </p>
        <button
          onClick={handleScanNow}
          className="bg-white flex items-center mt-5 px-8 py-3 rounded-xl text-black gap-3 cursor-pointer mx-auto md:mx-0 tracking-widest relative z-30 hover:scale-105 transition-transform duration-300"
        >
          <p className="text-lg lg:text-3xl xl:text-xl font-light">Scan Now</p>
          <img className="w-8 lg:w-15 xl:w-8 invert" src={assets.scan} alt="qr-image" />
        </button>
      </div>

    </div>
  );
};

export default Hero;
