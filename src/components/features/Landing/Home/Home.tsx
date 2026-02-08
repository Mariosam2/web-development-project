import { useEffect, useRef } from "react";
import { About } from "../About/About";
import { Hero } from "../Hero/Hero";
import * as L from "leaflet";

import "./Home.css";

export const Home = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <Hero />
      <About />

      <section className="contacts bg-c-dark py-24">
        <div className="container-xl bg-dark grid grid-cols-2">
          <div id="map" className="rounded-2xl"></div>

          <form id="contact-form" className="p-12 px-24">
            <h1 className="font-gibed text-3xl text-c-yellow mb-8">Contact Us</h1>
            <div className="form-group">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-c-dark-gray">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="bg-c-light-gray border w-full border-c-dark-gray text-c-dark text-base rounded-xl p-3 focus:outline-none"
                placeholder="example@mail.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-c-dark-gray">
                Message
              </label>
              <textarea
                rows={5}
                className="bg-c-light-gray border w-full border-c-dark-gray text-c-dark text-base rounded-xl p-3 focus:outline-none"
                name="message"
                placeholder="Your message here"
                id="message"></textarea>
            </div>
            <button className="submit text-lg btn-secondary mt-8 rounded-3xl py-1 w-30">Send</button>
          </form>
        </div>
      </section>
    </>
  );
};
