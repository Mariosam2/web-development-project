import PreviewPNG from "@assets/ex-preview.png";
import BodyPartPNG from "@assets/body-part.png";
import { Camera } from "../../../../../../shared/ui/Camera";
import { Plus } from "../../../../../../shared/ui/Plus";
import "./ExerciseCard.css";

export const ExerciseCard = () => {
  return (
    <div className="col-span-1 c-shadow-md border border-c-dark-gray rounded-4xl cursor-pointer flex max-h-48 bg-c-light-gray relative">
      <div className="preview w-1/3 rounded-l-2xl overflow-hidden">
        <img className="w-full block object-cover" src={PreviewPNG} alt="workout preview" />
      </div>

      <div className="content w-2/3 p-4">
        <div className="heading flex">
          <h2 className="title text-2xl font-light">Exercise 1</h2>
          <div className="badges flex items-center gap-x-3 ps-8">
            <div className="badge bg-c-gray rounded-xl p-1.5">
              <img className="size-6" src={BodyPartPNG} alt="body part" />
            </div>
            <div className="badge bg-c-gray rounded-xl p-1.5">
              <span>15min</span>
            </div>
            <div className="badge bg-c-gray rounded-xl p-1.5">
              <span>4x</span>
            </div>
          </div>
        </div>
        <p className="text-c-dark-gray mt-2.5 pe-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae impedit quidem eligendi neque molestias dolor
          nihil dolorum, provident voluptates vel.
        </p>
        <div className="actions flex flex-col gap-2 absolute right-4 bottom-4">
          <Plus className="text-c-yellow bg-c-dark rounded-xl p-2" size={10} />
          <Camera className="text-c-yellow bg-c-dark rounded-xl p-2" size={10} />
        </div>
      </div>
    </div>
  );
};
