import MyProteinSVG from "@assets/my-protein.svg";
import PanattaSVG from "@assets/panatta.svg";
import KlavyioSVG from "@assets/klavyio.svg";
import "./Slider.css";

export const Slider = () => {
  return (
    <div className="sponsor slider ">
      <div className="slide-track">
        <div className="slide">
          <img src={MyProteinSVG} alt="my protein" />
        </div>
        <div className="slide">
          <img src={PanattaSVG} alt="panatta" />
        </div>
        <div className="slide">
          <img src={KlavyioSVG} alt="klavyio" />
        </div>

        <div className="slide">
          <img src={MyProteinSVG} alt="my protein" />
        </div>
        <div className="slide">
          <img src={PanattaSVG} alt="panatta" />
        </div>
        <div className="slide">
          <img src={KlavyioSVG} alt="klavyio" />
        </div>
      </div>
    </div>
  );
};
