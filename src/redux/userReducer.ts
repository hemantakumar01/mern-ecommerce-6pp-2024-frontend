import { createSlice } from "@reduxjs/toolkit";
import { userReducerInitialType } from "../types/user-reducer-type";

const initialState: userReducerInitialType = {
  user: null,
  loading: false,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExixt: (state, action) => {
      (state.loading = false), (state.user = action.payload);
    },
    userNotExixt: (state) => {
      (state.loading = true), (state.user = null);
    },
  },
});

export default userReducer;
export const { userExixt, userNotExixt } = userReducer.actions;
