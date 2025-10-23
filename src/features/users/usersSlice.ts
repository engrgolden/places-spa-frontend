import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./user";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch(import.meta.env.VITE_HOST_URL + "api/users");
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message);
  }
  return resData;
});

const initialState: {
  users: User[];
  loading: boolean;
  error: string | null;
} = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      const newUser = action.payload.user;
      state.users.push(newUser);
    },
    removeUser(state, action) {
      const id = action.payload.id;
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Fetching users failed, please try again later.";
      });
  },
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
