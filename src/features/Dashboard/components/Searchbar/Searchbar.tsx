import { MagnifyingGlass } from "../../../../shared/ui/MagnifyingGlass";
import "./Searchbar.css";
export const Searchbar = () => {
  return (
    <div className="searchbar w-xs mx-auto bg-c-light-gray flex items-center mt-8 rounded-2xl border border-c-dark-gray c-shadow-md ps-3">
      <MagnifyingGlass className="me-2" size={6} />
      <input
        className="text-c-dark placeholder:text-c-dark-gray p-3  w-full focus:outline-none"
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
      />
    </div>
  );
};
