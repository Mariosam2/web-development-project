import { Envelope } from "@src/shared/ui/Envelope";
import { Location } from "@src/shared/ui/Location";
import { Phone } from "@src/shared/ui/Phone";
import LogoSquareSVG from "@assets/logo-square.svg";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer id="footer">
      <div className="py-12 px-4 border-y border-transparent 3xl:border-c-light-gray/40">
        <div className="w-full lg:container-lg xl:container-xl flex flex-col sm:flex-row sm:flex-items-center">
          <div className="flex flex-col lg:flex-row lg:items-end max-w-xs">
            <img className="w-40 aspect-square" src={LogoSquareSVG} alt="logo square" />
            <p className="text-c-light-gray text-sm py-4 pe-4 lg:pe-0 lg:px-4 lg:py-0">
              Your all-in-one fitness companion. Create workouts, track progress and train smarter with AI-powered
              routines.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center sm:ms-auto lg:gap-x-12">
            <div className="contacts p-3">
              <h2 className="text-xl text-c-light-gray">Contacts</h2>
              <div className="email flex items-center gap-x-2 py-1.5">
                <Envelope className="text-c-light-gray size-6" />
                <span className="text-sm text-c-light-gray font-thin">noreply.manmot@gmail.com</span>
              </div>
              <div className="phone-number flex items-center gap-x-2 py-1.5">
                <Phone className="text-c-light-gray size-6" />
                <span className="text-sm text-c-light-gray font-thin">+1 (212) 555-0847</span>
              </div>
              <div className="address flex items-center gap-x-2 py-1.5">
                <Location className="size-6" />
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
                  <h4 className="text-c-light-gray text-sm font-medium">About ManMot</h4>
                </li>
                <li className="py-1.5">
                  <h4 className="text-c-light-gray text-sm font-medium">Contacts</h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs sm:text-sm px-4 text-c-light-gray py-6">
        &copy; 2026 ManMot. All rights reserved. Made with ❤ by Marco.
      </p>
    </footer>
  );
};
