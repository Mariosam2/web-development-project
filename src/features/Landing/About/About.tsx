import "./About.css";
import { BentoGrid } from "./components/BentoGrid/BentoGrid";
import { Slider } from "./components/Slider/Slider";

export const About = () => {
  return (
    <section id="about" className="about min-h-screen bg-c-light-gray pt-24 pb-32">
      <BentoGrid />
      <Slider />
    </section>
  );
};
