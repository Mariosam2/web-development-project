import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IExercise } from "@src/shared/interfaces/exercise/IExercise";
import type { IExerciseQuery } from "@src/shared/interfaces/query/IExercisesQuery";

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
  searchParams: {},
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
      action: PayloadAction<{ field: keyof IExerciseQuery; value: string | number | undefined }>,
    ) => {
      const { field, value } = action.payload;
      state.searchParams = { ...state.searchParams, [field]: value };
    },
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.searching = action.payload;
    },
    setFiltering: (state, action: PayloadAction<boolean>) => {
      state.filtering = action.payload;
    },

    setBodyPartsSelected: (state, action: PayloadAction<string[]>) => {
      state.selectedBodyParts = action.payload;
    },
    setTargetMusclesSelected: (state, action: PayloadAction<string[]>) => {
      state.selectedTargetMuscles = action.payload;
    },

    /* updateExercise: (state, action: PayloadAction<{ exerciseId: string; field: string; value: number }>) => {
      const { exerciseId, field, value } = action.payload;
      const updatedExercises = state.selectedExercises.map((exercise) =>
        exercise.exerciseId === exerciseId ? { ...exercise, [field]: value } : exercise,
      );
      state.selectedExercises = updatedExercises;
    }, */
  },
});

export const {
  selectExercise,
  deselectExercise,
  /* updateExercise, */ setSelectedExercises,
  setExerciseSearchParams,
  updateExerciseSearchParam,
  setSearching,
  setBodyPartsSelected,
  setTargetMusclesSelected,
  setFiltering,
} = exerciseSlice.actions;
export default exerciseSlice.reducer;
