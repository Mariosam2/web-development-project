import { DottedPlus } from "../DottedPlus";
import "./EmptyList.css";

export const EmptyList = () => {
  return (
    <div className="empty-list flex flex-col items-center h-full  justify-center col-span-full w-full pt-12">
      <p className="caption text-c-dark-gray font-semibold  text-4xl mb-12">Nothing here yet...</p>
      <DottedPlus className="text-c-dark-gray" size={58} />
    </div>
  );
};
