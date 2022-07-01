import { createSlice } from "@reduxjs/toolkit";

const initialState = { content: [] };

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;