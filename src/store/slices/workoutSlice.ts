import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IWorkoutQuery } from "@src/shared/interfaces/query/IWorkoutQuery";
import type { IWorkout } from "@src/shared/interfaces/workout/IWorkout";

export const WORKOUTS_LIMIT = 20;

interface WorkoutInitialState {
  selectedWorkout: IWorkout;
  searchParams: IWorkoutQuery;
  isCompleted: boolean | null;
  startDate: string | null;
  endDate: string | null;
}

const initialState: WorkoutInitialState = {
  selectedWorkout: {} as IWorkout,
  searchParams: {
    limit: WORKOUTS_LIMIT,
    query: "",
    isCompleted: null,
    startDate: "",
    endDate: "",
  },
  isCompleted: null,
  startDate: null,
  endDate: null,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setSelectedWorkout: (state, action: PayloadAction<IWorkout>) => {
      console.log("ACTION PAYLOAD", action.payload);
      state.selectedWorkout = action.payload;
    },
    updateWorkoutSearchParam: (
      state,
      action: PayloadAction<{ field: keyof IWorkoutQuery; value: string | number | boolean | null }>,
    ) => {
      const { field, value } = action.payload;
      state.searchParams = { ...state.searchParams, [field]: value };
    },
    setIsCompletedParam: (state, action: PayloadAction<boolean | null>) => {
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
        isCompleted: null,
        startDate: "",
        endDate: "",
      };
      state.isCompleted = null;
      state.startDate = null;
      state.endDate = null;
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
