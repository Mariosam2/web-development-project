import CrossSVG from "@assets/cross.svg";
import HeroVideo from "@assets/hero.mp4";
import LogoIcon from "@assets/logo-icon.svg";
import { ArrowRight } from "../../../../shared/components/ArrowRight";
import "./Hero.css";

export const Hero = () => {
  const openNavbar = () => {
    console.log("open navbar");
  };
  return (
    <section className="hero relative w-screen h-screen">
      <div className="menu-button flex items-center absolute top-14 right-14 z-50 cursor-pointer" onClick={openNavbar}>
        <span className="text-uppercase text-c-light-gray text-xl">Menu</span>
        <img src={CrossSVG} className="ms-2 size-5" alt="cross-svg" />
      </div>

      <img
        id="logo-icon"
        className="absolute top-6 left-6 z-30"
        width={120}
        height={120}
        src={LogoIcon}
        alt="logo icon"
      />
      <video src={HeroVideo} autoPlay loop muted playsInline className="absolute w-full h-full object-cover z-10" />
      <div className="layover z-20"></div>
      <h1 className="text-9xl font-gibed text-c-light-gray  w-max absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        Move. Train. Succeed.
      </h1>
      <div className="mouse absolute left-1/2 bottom-4 transform -translate-x-1/2 z-30">
        <div className="mouse-icon">
          <span className="mouse-wheel"></span>
        </div>
      </div>
      <div className="line top-h  z-50"></div>
      <div className="line left-v z-50"></div>
      <div className="line right-v z-50"></div>
      <div className="line bottom-h  z-50"></div>
      <img src={CrossSVG} className="cross absolute top-h left-v z-50" alt="cross-svg" />
      <img src={CrossSVG} className="cross absolute top-h right-v z-50" alt="cross-svg" />
      <img src={CrossSVG} className="cross absolute bottom-h left-v z-50" alt="cross-svg" />
      <img src={CrossSVG} className="cross absolute bottom-h right-v z-50" alt="cross-svg" />

      <div className="cta-button  absolute right-14 bottom-14 z-50 w-full max-w-64 flex items-center cursor-pointer">
        <div className="btn-secondary w-full rounded-4xl text-center px-6 py-2 text-xl">Get Started</div>
        <ArrowRight className="bg-c-yellow text-c-dark rounded-full p-2 shrink-0" size={10} />
      </div>

      <p className="caption absolute left-14 bottom-14 z-50 text-c-light-gray max-w-1/4 p-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus iure, aliquam, numquam magnam quia
        esse, odit et dicta reiciendis sequi! Deserunt quam quod eos, vel temporibus quasi totam facere.
      </p>
    </section>
  );
};
