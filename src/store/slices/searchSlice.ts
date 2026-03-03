import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WorkoutInitialState {
  searching: boolean;
  filtering: boolean;
}

const initialState: WorkoutInitialState = {
  searching: false,
  filtering: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.searching = action.payload;
    },
    setFiltering: (state, action: PayloadAction<boolean>) => {
      state.filtering = action.payload;
    },
  },
});

export const { setFiltering, setSearching } = searchSlice.actions;
export default searchSlice.reducer;
