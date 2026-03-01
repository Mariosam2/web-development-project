import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IWorkout } from "@src/shared/interfaces/workout/IWorkout";

interface WorkoutInitialState {
  selectedWorkout: IWorkout;
}

const initialState: WorkoutInitialState = { selectedWorkout: {} as IWorkout };

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setSelectedWorkout: (state, action: PayloadAction<IWorkout>) => {
      state.selectedWorkout = action.payload;
    },
  },
});

export const { setSelectedWorkout } = workoutSlice.actions;
export default workoutSlice.reducer;
