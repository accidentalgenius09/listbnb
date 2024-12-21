import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  userData: {},
  activeTab: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
