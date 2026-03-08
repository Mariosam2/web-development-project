import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useGetWorkoutsQuery } from "@src/store/api/workoutApi";
import { WORKOUTS_LIMIT } from "@src/store/slices/workoutSlice";
import { useState } from "react";
import "./WorkoutAutocomplete.css";

interface WorkoutAutocompleteProps {
  onSelect: (workoutId: string) => void;
  error: string;
}

export const WorkoutAutocomplete = ({ onSelect, error }: WorkoutAutocompleteProps) => {
  const [query, setQuery] = useState("");

  const workoutSearchParams = {
    limit: WORKOUTS_LIMIT,
    query,
    isCompleted: null,
    startDate: "",
    endDate: "",
  };

  const { data: workouts } = useGetWorkoutsQuery({ ...workoutSearchParams });

  const onInputChange = (value: string) => {
    setQuery(value);
    if (!value) onSelect("");
  };

  return (
    <div className="flex flex-col gap-1">
      <Autocomplete
        label="Search workout"
        placeholder="Type to search..."
        inputValue={query}
        onInputChange={onInputChange}
        isInvalid={!!error}
        onSelectionChange={(key) => {
          if (!key) {
            onSelect("");
            return;
          }
          onSelect(key as string);
        }}>
        {(workouts?.data ?? []).map((workout) => (
          <AutocompleteItem key={workout.id}>{workout.title}</AutocompleteItem>
        ))}
      </Autocomplete>
      <span
        className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${error ? "opacity-100" : "opacity-0"}`}>
        {error ?? "\u00A0"}
      </span>
    </div>
  );
};
