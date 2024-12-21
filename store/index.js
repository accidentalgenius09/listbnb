import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";

const combineReducer = combineReducers({
  auth: authSliceReducer,
});

const store = configureStore({
  reducer: combineReducer,
});

export default store;
