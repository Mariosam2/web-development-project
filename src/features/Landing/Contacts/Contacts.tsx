import { useEffect, useRef } from "react";
import "./Contacts.css";
import * as L from "leaflet";
import { ContactForm } from "./components/ContactForm/ContactForm";
export const Contacts = () => {
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
    <section id="contacts" className="contacts container-xl bg-dark grid grid-cols-2 pb-48 pt-24">
      <div id="map" className="rounded-2xl"></div>
      <ContactForm />
    </section>
  );
};
