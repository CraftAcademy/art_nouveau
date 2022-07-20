import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: [] };

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;