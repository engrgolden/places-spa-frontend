import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
  data: {
    email: null,
    id: null,
    token: null,
    tokenExpirationDate: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (
      state,
      action: PayloadAction<{
        data: { email: string; id: string; token: string };
      }>
    ) => {
      state.isAuthenticated = true;
      const newData = {
        ...action.payload.data,
        tokenExpirationDate: new Date(
          new Date().getTime() + 1000 * 60 * 60
        ).toISOString(),
      };
      state.data = newData;
      localStorage.setItem("userData", JSON.stringify(newData));
    },
    unAuth: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("userData");
    },
  },
});

export const { auth, unAuth } = authSlice.actions;

export default authSlice.reducer;
