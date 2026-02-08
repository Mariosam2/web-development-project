import WorkoutSVG from "@assets/workout.svg";
import MuscleSVG from "@assets/muscle.svg";
import MagnifyingGlassSVG from "@assets/magnifying-glass.svg";
import "./BentoGrid.css";

export const BentoGrid = () => {
  return (
    <div className="container-lg mb-48">
      <h1 className="font-gibed text-4xl pb-12">Built for your workout</h1>

      <div className="bento-grid  grid grid-cols-6 grid-rows-2 h-130 gap-12">
        <div className="col-span-4  row-span-1 h-full relative bg-c-dark-gray rounded-2xl p-8">
          <h3 className="text-xl">Customize your training experience</h3>
          <div className="flex mt-4">
            <p className="caption max-w-3/4 text-sm py-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum officiis quam repudiandae impedit,
              placeat molestiae hic mollitia, quibusdam aspernatur voluptatibus ad, minus dolores repellat eveniet
              aliquid quas labore totam doloremque quidem maxime voluptatum. Laborum a assumenda officia, ad eligendi
              pariatur.
            </p>

            <img className="ms-12 size-20 self-end" src={WorkoutSVG} alt="dumbell" />
          </div>
        </div>
        <div className="col-span-2 row-span-1 h-full relative bg-c-dark rounded-2xl p-8">
          <h3 className="text-xl text-c-yellow">Every rep starts here</h3>

          <div className="flex mt-4">
            <p className="caption max-w-4/6 text-sm py-2 text-c-light-gray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptate inventore illum corporis
              nulla aut.
            </p>

            <img className="ms-auto size-15 self-end" src={MuscleSVG} alt="muscle" />
          </div>
        </div>
        <div className="col-span-2 row-span-1 h-full relative bg-c-dark rounded-2xl p-8">
          <h3 className="text-xl text-c-yellow">Smart search</h3>

          <div className="flex mt-4">
            <p className="caption max-w-4/6 text-sm py-2 text-c-light-gray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptate inventore illum corporis
              nulla aut.
            </p>

            <img className="ms-auto size-15 self-end" src={MagnifyingGlassSVG} alt="magnifying glass" />
          </div>
        </div>
        <div className="col-span-2 row-span-1 h-full relative bg-c-dark rounded-2xl p-8">
          <h3 className="text-xl text-c-yellow">Every rep starts here</h3>

          <div className="flex mt-4">
            <p className="caption max-w-4/6 text-sm py-2 text-c-light-gray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptate inventore illum corporis
              nulla aut.
            </p>

            <img className="ms-auto size-15 self-end" src={MuscleSVG} alt="muscle" />
          </div>
        </div>
        <div className="col-span-2 row-span-1 h-full relative bg-c-dark rounded-2xl p-8">
          <h3 className="text-xl text-c-yellow">Every rep starts here</h3>

          <div className="flex mt-4">
            <p className="caption max-w-4/6 text-sm py-2 text-c-light-gray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptate inventore illum corporis
              nulla aut.
            </p>

            <img className="ms-auto size-15 self-end" src={MuscleSVG} alt="muscle" />
          </div>
        </div>
      </div>
    </div>
  );
};
