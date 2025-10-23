import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/models/authSlice";
import overlaysReducer from "../../features/overlay/overlaysSlice";
import usersReducer from "../../features/users/usersSlice";
import placesReducer from "../../features/places/placesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    overlays: overlaysReducer,
    users: usersReducer,
    places: placesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
