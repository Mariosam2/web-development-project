import { About } from "../About/About";
import { Hero } from "../Hero/Hero";
import LogoSquareSVG from "@assets/logo-square.svg";

import "./Home.css";
import { Contacts } from "../Contacts/Contacts";
import { Phone } from "../../../shared/ui/Phone";
import { Envelope } from "../../../shared/ui/Envelope";
import { Location } from "../../../shared/ui/Location";
import CrossSVG from "@assets/cross.svg";

export const Home = () => {
  return (
    <>
      <Hero />
      <About />

      <section className="bg-c-dark pt-24 relative">
        <Contacts />

        <footer id="footer">
          <div className="py-12 border-y border-c-light-gray/40">
            <div className="container-xl  flex flex-items-center">
              <div className="flex items-end max-w-xs">
                <img className="w-40 aspect-square" src={LogoSquareSVG} alt="logo square" />
                <p className="text-c-light-gray text-sm  px-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At earum minus amet. Error, obcaecati totam!
                </p>
              </div>

              <div className="flex items-center ms-auto gap-x-12">
                <div className="contacts p-3">
                  <h2 className="text-xl text-c-light-gray">Contacts</h2>
                  <div className="email flex items-center gap-x-2 py-1.5">
                    <Envelope className="text-c-light-gray" size={6} />
                    <span className="text-sm text-c-light-gray font-thin">example@mail.com</span>
                  </div>
                  <div className="phone-number flex items-center gap-x-2 py-1.5">
                    <Phone className="text-c-light-gray" size={6} />
                    <span className="text-sm text-c-light-gray font-thin">+1 (212) 555-0847</span>
                  </div>
                  <div className="address flex items-center gap-x-2 py-1.5">
                    <Location size={6} />
                    <span className="text-sm text-c-light-gray font-thin">
                      742 Evergreen Terrace, Springfield, IL 62704
                    </span>
                  </div>
                </div>
                <div className="links p-3 h-full">
                  <h2 className="text-xl text-c-light-gray">Links</h2>
                  <ul className="list-none">
                    <li className="py-1.5">
                      <h4 className="text-c-light-gray text-sm font-medium">Get started</h4>
                    </li>
                    <li className="py-1.5">
                      <h4 className="text-c-light-gray text-sm font-medium">About</h4>
                    </li>
                    <li className="py-1.5">
                      <h4 className="text-c-light-gray text-sm font-medium">Contacts</h4>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-c-light-gray text-sm py-6">
            &copy; 2026 ManMot. All rights reserved. Made with ❤ by Marco.
          </p>
        </footer>
        <img src={CrossSVG} className="cross absolute top right z-20" alt="cross-svg" />
        <img src={CrossSVG} className="cross absolute bottom right z-20" alt="cross-svg" />
        <div className="line right-b z-20"></div>
      </section>
    </>
  );
};
