import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
export const globalSlice = createSlice({
  name: "global",
  initialState,
});

// export const { setMode, setLogin, setLogout } = globalSlice.actions;

export default globalSlice.reducer;
