"use client";

import Image from "next/image";
import logo from "../../../../public/assets/nigc-logo.png";

export default function Header() {
  return (
    <header className="bg-linear-to-r from-primary to-secondary py-10 shadow-md sticky top-0 z-50 backdrop-blur-sm">
      <div className="w-full mx-auto relative flex flex-col lg:flex-row 3xl:max-w-[1920px]">
        {/* Company Section - Right */}
        <div className="flex flex-col mb-5 items-center sm:mb-7 lg:absolute lg:right-4 2xl:right-[200px] lg:mb-0 3xl:right-[300px]">
          <Image
            src={logo}
            width={220}
            height={100}
            alt="لوگوی شرکت ملی گاز ایران"
            className="object-contain drop-shadow-lg"
            style={{ animation: "logoFloat 3s ease-in-out infinite" }}
          />
          <div className="text-lg text-center max-w-xs leading-relaxed text-white font-semibold text-shadow-lg text-nowrap">
            مدیریت HSE و پدافند غیرعامل
          </div>
        </div>

        {/* Main Title Section - Center */}
        <div className="w-full flex flex-col justify-center text-center px-8 lg:px-64">
          <h1 className="w-full text-center text-xl font-bold text-white text-shadow-lg tracking-wide mb-4 sm:text-3xl lg:text-nowrap xl:text-4xl">
            سامانه ارزیابی ریسک حریق FRAME 2025
          </h1>
          <p className="text-sm lg:text-[17px] text-white/90">
            Fire Risk Assessment Method for Engineering
          </p>
        </div>

        {/* Spacer - Left */}
        {/* <div className="hidden lg:block w-64"></div> */}
      </div>

      <style jsx>{`
        @keyframes logoFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </header>
  );
}
