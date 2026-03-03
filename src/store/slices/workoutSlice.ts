import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IWorkoutQuery } from "@src/shared/interfaces/query/IWorkoutQuery";
import type { IWorkout } from "@src/shared/interfaces/workout/IWorkout";

const WORKOUTS_LIMIT = 20;

interface WorkoutInitialState {
  selectedWorkout: IWorkout;
  searchParams: IWorkoutQuery;
  isCompleted: boolean | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
}

const initialState: WorkoutInitialState = {
  selectedWorkout: {} as IWorkout,
  searchParams: {
    limit: WORKOUTS_LIMIT,
    query: "",
    isCompleted: undefined,
    startDate: "",
    endDate: "",
  },
  isCompleted: undefined,
  startDate: undefined,
  endDate: undefined,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setSelectedWorkout: (state, action: PayloadAction<IWorkout>) => {
      state.selectedWorkout = action.payload;
    },
    updateWorkoutSearchParam: (
      state,
      action: PayloadAction<{ field: keyof IWorkoutQuery; value: string | number | boolean | undefined }>,
    ) => {
      const { field, value } = action.payload;
      state.searchParams = { ...state.searchParams, [field]: value };
    },
    setIsCompletedParam: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    resetWorkoutFilters: (state) => {
      state.searchParams = {
        limit: WORKOUTS_LIMIT,
        query: "",
        isCompleted: undefined,
        startDate: "",
        endDate: "",
      };
      state.isCompleted = undefined;
      state.startDate = undefined;
      state.endDate = undefined;
    },
  },
});

export const {
  setSelectedWorkout,
  updateWorkoutSearchParam,
  setIsCompletedParam,
  setStartDate,
  setEndDate,
  resetWorkoutFilters,
} = workoutSlice.actions;
export default workoutSlice.reducer;
