import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IExercise } from "@src/shared/interfaces/exercise/IExercise";
import type { IExerciseQuery } from "@src/shared/interfaces/query/IExercisesQuery";
const EXERCISES_LIMIT = 8;
interface ExerciseInitialState {
  selectedExercises: IExercise[];
  searchParams: IExerciseQuery;
  selectedBodyParts: string[];
  selectedTargetMuscles: string[];
  searching: boolean;
  filtering: boolean;
}

const initialState: ExerciseInitialState = {
  selectedExercises: [],
  searchParams: {
    name: "",
    targetMuscles: "",
    exerciseType: "",
    bodyParts: "",
    limit: EXERCISES_LIMIT,
    after: null,
    before: null,
  },
  selectedBodyParts: [],
  selectedTargetMuscles: [],
  searching: false,
  filtering: false,
};

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setSelectedExercises: (state, action: PayloadAction<IExercise[]>) => {
      state.selectedExercises = action.payload;
    },

    selectExercise: (state, action: PayloadAction<IExercise>) => {
      const newSelectedExercises = [...state.selectedExercises, action.payload];
      state.selectedExercises = newSelectedExercises;
    },
    deselectExercise: (state, action: PayloadAction<string>) => {
      const newSelectedExercises = state.selectedExercises.filter((exercise) => exercise.exerciseId !== action.payload);
      state.selectedExercises = newSelectedExercises;
    },
    setExerciseSearchParams: (state, action: PayloadAction<IExerciseQuery>) => {
      state.searchParams = action.payload;
    },
    updateExerciseSearchParam: (
      state,
      action: PayloadAction<{ field: keyof IExerciseQuery; value: string | number | null }>,
    ) => {
      const { field, value } = action.payload;
      state.searchParams = { ...state.searchParams, [field]: value };
    },

    setSelectedBodyParts: (state, action: PayloadAction<string[]>) => {
      state.selectedBodyParts = action.payload;
    },
    setSelectedTargetMuscles: (state, action: PayloadAction<string[]>) => {
      state.selectedTargetMuscles = action.payload;
    },
    resetExerciseFilters: (state) => {
      state.searchParams = {
        name: "",
        targetMuscles: "",
        exerciseType: "",
        bodyParts: "",
        limit: EXERCISES_LIMIT,
        after: null,
        before: null,
      };
      state.selectedBodyParts = [];
      state.selectedTargetMuscles = [];
    },
  },
});

export const {
  selectExercise,
  deselectExercise,
  setSelectedExercises,
  setExerciseSearchParams,
  updateExerciseSearchParam,
  setSelectedBodyParts,
  setSelectedTargetMuscles,
  resetExerciseFilters,
} = exerciseSlice.actions;
export default exerciseSlice.reducer;
