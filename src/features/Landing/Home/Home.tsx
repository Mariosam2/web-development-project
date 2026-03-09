import { About } from "../About/About";
import { Hero } from "../Hero/Hero";
import "./Home.css";
import { Contacts } from "../Contacts/Contacts";
import CrossSVG from "@assets/cross.svg";
import { NoAuthGuard } from "@src/shared/guards/NoAuthGuard";
import { Footer } from "../Footer/Footer";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export const Home = () => {
  gsap.registerPlugin(ScrollToPlugin);

  return (
    <NoAuthGuard>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <About />

          <div className="bg-c-dark relative">
            <Contacts />
            <Footer />
            <img src={CrossSVG} className="hidden 3xl:block cross absolute top right z-20" alt="cross-svg" />
            <img src={CrossSVG} className="hidden 3xl:block cross absolute bottom right z-20" alt="cross-svg" />
            <div className="hidden 3xl:block line right-b z-20"></div>
          </div>
        </div>
      </div>
    </NoAuthGuard>
  );
};
