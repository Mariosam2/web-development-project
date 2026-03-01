import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import exerciseReducers from "./slices/exerciseSlice";
import workoutReducers from "./slices/workoutSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    exercise: exerciseReducers,
    workout: workoutReducers,
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
