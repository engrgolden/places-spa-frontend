import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OverlayState = {
  name: string;
  show: boolean;
  data?: {
    name?: string;
    coordinates?: { lat: number; lng: number };
    apiKey?: string;
    id?: string;
    errorMessage?: string;
  };
} & {
  [key: string]:
    | boolean
    | string
    | undefined
    | {
        name?: string;
        coordinates?: { lat: number; lng: number };
        apiKey?: string;
        id?: string;
        errorMessage?: string;
      };
};

const initialState: OverlayState = {
  name: "",
  show: false,
  data: {},
};

const overlaysSlice = createSlice({
  name: "overlays",
  initialState,
  reducers: {
    show: (
      state,
      action: PayloadAction<{
        name: string;
        data?: {
          name?: string;
          coordinates?: { lat: number; lng: number };
          apiKey?: string;
          id?: string;
          errorMessage?: string;
        };
      }>
    ) => {
      state.show = true;
      state.name = action.payload.name;
      state.data = action.payload.data || undefined;
    },
    hide: () => initialState,
  },
});

export const { hide, show } = overlaysSlice.actions;

export default overlaysSlice.reducer;
