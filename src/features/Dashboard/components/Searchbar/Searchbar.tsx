import { useMatch } from "react-router";
import { MagnifyingGlass } from "../../../../shared/ui/MagnifyingGlass";
import "./Searchbar.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { setFiltering, setSearching, updateExerciseSearchParam } from "@src/store/slices/exerciseSlice";
import { FiltersIcon } from "@src/shared/ui/FiltersIcon";
import { useDisclosure } from "@heroui/modal";
import { FiltersModal } from "@src/shared/components/FiltersModal/FiltersModal";
import { useGetBodyPartsQuery, useGetTargetMusclesQuery } from "@src/store/api/exerciseApi";
export const Searchbar = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { selectedBodyParts, selectedTargetMuscles } = useAppSelector((state) => state.exercise);
  const { data: bodyParts, isLoading: isBodyPartsLoading } = useGetBodyPartsQuery();
  const { data: targetMuscles, isLoading: isTargetMusclesLoading } = useGetTargetMusclesQuery();
  const searchWorkouts = useMatch("/dashboard/workouts");
  const searchExercises = useMatch("/dashboard/exercises");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateExerciseSearchParam({ field: "name", value: query.trim() }));
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchWorkouts, searchExercises, dispatch]);

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    dispatch(setSearching(true));
  };

  const onApplyFilters = () => {
    dispatch(setFiltering(true));
    if (searchExercises) {
      dispatch(updateExerciseSearchParam({ field: "bodyParts", value: selectedBodyParts.join(",") }));
      dispatch(updateExerciseSearchParam({ field: "targetMuscles", value: selectedTargetMuscles.join(",") }));
    }
    //TODO: dispatch filters in correct slice
    onClose();
  };

  return (
    <>
      <div className="flex items-center w-max  mx-auto mt-8 h-12">
        <div className="searchbar w-xs h-full bg-c-light-gray flex items-center  rounded-2xl border border-c-dark-gray c-shadow-md ps-3">
          <MagnifyingGlass className="me-2 size-6" />
          <input
            className="text-c-dark placeholder:text-c-dark-gray p-3  w-full focus:outline-none"
            type="text"
            value={query}
            onChange={onChangeQuery}
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>
        <FiltersIcon
          className="size-10 cursor-pointer ms-2.5 bg-c-light-gray border border-c-dark-gray c-shadow-md rounded-2xl p-1.5"
          onClick={() => !isBodyPartsLoading && !isTargetMusclesLoading && onOpen()}
        />
      </div>
      {isOpen && (
        <FiltersModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          title="Filters"
          onConfirm={onApplyFilters}
          bodyParts={bodyParts?.data ?? []}
          targetMuscles={targetMuscles?.data ?? []}
        />
      )}
    </>
  );
};
