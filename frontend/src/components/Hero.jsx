import React from "react";
import { VendingMachineCanvas } from "../canvas/index.js";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();

  const handleScanNow = () => {
    navigate("/scan");
  };

  return (
    <div
      className="md:max-w-[1200px] mx-auto h-[88.5vh] flex flex-row justify-around items-center pr-[4%]"
    >
      {/* 3D Canvas */}
      <div className="w-full h-[calc(80vh-4rem)] relative z-10">
          <VendingMachineCanvas />
      </div>

      {/* Text Content */}
      <div className="z-20 text-right flex flex-col items-end">
        <h1 className="font-bold text-white text-8xl">
          Digitalize your vending experience!
        </h1>
        <h3 className="italic mt-5 text-gray-200 font-normal text-xl">
          -Scan, Choose, Pay & Collect in seconds.
        </h3>
          <button onClick={handleScanNow} className="bg-primary flex w-fit mt-8 px-10 py-2 rounded-full text-white gap-3 cursor-pointer">
            <p className="text-lg font-semibold">Scan Now</p>
            <img className="w-[30px]" src={assets.scan} alt="qr-image" />
          </button>
      </div>
    </div>
  );
};

export default Hero;
