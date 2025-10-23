import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Place } from "./place";

export const fetchUserPlaces = createAsyncThunk<
  { userId: string; resData: Place[] },
  string
>("places/fetchUserPlaces", async (userId) => {
  const res = await fetch(
    `${import.meta.env.VITE_HOST_URL}api/places/${userId}/places`
  );
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message);
  }
  return { userId, resData: resData.places };
});

const initialState: {
  loading: boolean;
  error: string | null;
  userId: string | null;
  places: Place[];
} = {
  loading: false,
  error: null,
  userId: null,
  places: [],
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    addPlace(state, action) {
      const newPlace = action.payload.place;
      state.places.push(newPlace);
    },
    removePlace(state, action) {
      const placeId = action.payload.placeId;
      state.places = state.places.filter((place) => place.id !== placeId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userId = action.payload.userId;
        state.places = action.payload.resData;
      })
      .addCase(fetchUserPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Fetching user's places failed, please try again later.";
      });
  },
});

export const { addPlace, removePlace } = placesSlice.actions;
export default placesSlice.reducer;
