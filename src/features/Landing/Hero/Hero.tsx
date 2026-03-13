import CrossSVG from "@assets/cross.svg";
import HeroVideo from "@assets/hero.mp4";
import LogoIcon from "@assets/logo-icon.svg";
import { ArrowRight } from "../../../shared/ui/ArrowRight";
import "./Hero.css";
import { NavLink } from "react-router";
import { SidebarMenu } from "@src/shared/ui/SidebarMenu/SidebarMenu";
import { useState } from "react";

export const Hero = () => {
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState(false);
  return (
    <section id="hero" className="hero relative w-full h-screen">
      <button
        type="button"
        className="menu-button flex items-center absolute top-4 right-4 sm:top-7 sm:right-7 md:top-14 md:right-14 z-50 cursor-pointer"
        onClick={() => setSidebarMenuOpen(true)}>
        <span className="text-uppercase text-c-light-gray text-xl">Menu</span>
        <img src={CrossSVG} className="ms-2 size-5" alt="cross-svg" />
      </button>

      <img
        id="logo-icon"
        className="absolute top-4 left-4 sm:top-7 sm:left-7 md:top-14 md:left-14 z-20"
        width={120}
        height={120}
        src={LogoIcon}
        alt="logo icon"
      />
      <video src={HeroVideo} autoPlay loop muted playsInline className="absolute w-full h-full object-cover z-10" />
      <div className="layover z-30"></div>
      <div className="hero-content  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
        <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-8xl 2xl:text-9xl font-gibed text-c-light-gray  w-max">
          Move. Train. Succeed.
        </h1>
        <p className="caption text-sm sm:text-base xl:hidden  text-c-gray mt-2.5 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus iure, aliquam, numquam magnam
          quia esse, odit et dicta reiciendis sequi! Deserunt quam quod eos, vel temporibus quasi totam facere.
        </p>

        <div className="cta-button  flex items-center gap-2 mt-8 w-max ms-auto   lg:hidden">
          <button className=" btn-secondary  flex items-center gap-2 mt-8 w-max ms-auto   lg:hidden">
            <NavLink
              to="/login"
              className="btn-secondary w-full rounded-4xl text-center px-6 py-2 text-base lg:text-xl">
              Get Started
            </NavLink>
          </button>
          <ArrowRight className="bg-c-yellow text-c-dark rounded-full p-2 shrink-0 size-10 arrow-right" />
        </div>
      </div>
      <div className="hidden xl:block mouse absolute left-1/2 bottom-4 transform -translate-x-1/2 z-40">
        <div className="mouse-icon">
          <span className="mouse-wheel"></span>
        </div>
      </div>
      <div className="hidden sm:block line top-h  z-20"></div>
      <div className="hidden sm:block line left-v z-20"></div>
      <div className="hidden sm:block line right-v z-20"></div>
      <div className="hidden sm:block line bottom-h  z-20"></div>
      <img src={CrossSVG} className="cross hidden sm:block absolute top-h left-v z-20" alt="cross-svg" />
      <img src={CrossSVG} className="cross hidden sm:block absolute top-h right-v z-20" alt="cross-svg" />
      <img src={CrossSVG} className="cross hidden sm:block absolute bottom-h left-v z-20" alt="cross-svg" />
      <img src={CrossSVG} className="cross hidden sm:block absolute bottom-h right-v z-20" alt="cross-svg" />
      <p className="caption hidden text-c-gray  xl:block xl:absolute xl:max-w-1/4  xl:left-14 xl:bottom-14 xl:z-20  ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus iure, aliquam, numquam magnam quia
        esse, odit et dicta reiciendis sequi! Deserunt quam quod eos, vel temporibus quasi totam facere.
      </p>
      <div className="cta-button hidden lg:flex absolute right-14 bottom-14 z-50 w-full max-w-64 items-center cursor-pointer">
        <NavLink to="/login" className="btn-secondary w-full rounded-4xl text-center px-6 py-2 text-xl">
          Get Started
        </NavLink>
        <ArrowRight className="bg-c-yellow text-c-dark rounded-full p-2 shrink-0 size-10 arrow-right" />
      </div>

      <SidebarMenu isOpen={sidebarMenuOpen} onClose={() => setSidebarMenuOpen(false)} />
    </section>
  );
};
