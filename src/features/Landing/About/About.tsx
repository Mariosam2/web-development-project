import "./About.css";
import { BentoGrid } from "./components/BentoGrid/BentoGrid";
import { Slider } from "./components/Slider/Slider";

export const About = () => {
  return (
    <section id="about" className="about min-h-screen bg-c-light-gray pt-16 sm:pt-28 pb-36">
      <BentoGrid />
      <Slider />
    </section>
  );
};
