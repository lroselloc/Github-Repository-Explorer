import { createSlice } from "@reduxjs/toolkit";

export interface LoadingState {
  numberLoading: number;
}

const initialState: LoadingState = {
  numberLoading: 0,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    pushLoading: (state: LoadingState) => {
      state.numberLoading++;
    },
    popLoading: (state: LoadingState) => {
      state.numberLoading =
        state.numberLoading > 0 ? state.numberLoading - 1 : 0;
    },
  },
});

export const { pushLoading, popLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
