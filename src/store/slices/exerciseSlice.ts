import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IExercise } from "@src/shared/interfaces/exercise/IExercise";

interface ExerciseInitialState {
  selectedExercises: IExercise[];
}

const initialState: ExerciseInitialState = { selectedExercises: [] };

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

    updateExercise: (state, action: PayloadAction<{ exerciseId: string; field: string; value: number }>) => {
      const { exerciseId, field, value } = action.payload;
      const updatedExercises = state.selectedExercises.map((exercise) =>
        exercise.exerciseId === exerciseId ? { ...exercise, [field]: value } : exercise,
      );
      state.selectedExercises = updatedExercises;
    },
  },
});

export const { selectExercise, deselectExercise, updateExercise, setSelectedExercises } = exerciseSlice.actions;
export default exerciseSlice.reducer;
