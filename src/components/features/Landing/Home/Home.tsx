import HeroVideo from "@assets/hero.mp4";
import LogoIcon from "@assets/logo-icon.svg";

export const Home = () => {
  return (
    <>
      <section className="hero relative w-screen h-screen">
        <img
          id="logo-icon"
          className="fixed top-6 left-6 z-30"
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
      </section>
    </>
  );
};
