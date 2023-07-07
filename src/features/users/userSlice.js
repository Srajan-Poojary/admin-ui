import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  users: [],
  error: "",
  loading: false,
};

const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
    .then((response) => response.data)
    .catch((error) => {
      // Handle the error here
      throw error;
    });
});
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    editUserData: (state, action) => {
      const { id, name, email, role } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          name,
          email,
          role,
        };
      }
    },
    deleteUserData: (state, action) => {
      // const { id } = action.payload;
      console.log("action.payload", action.payload);
      state.users = state.users.filter(
        (user) => !action.payload.includes(user.id)
      );
    },
    userDataSelect: (state, action) => {
      const { id, checkedStatus } = action.payload;
      state.users = state.users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            isSelected: checkedStatus,
          };
        }
        return user;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      // state.users = action.payload;
      state.users = action.payload.map((obj) => {
        return { ...obj, isSelected: false };
      });
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export const { editUserData, deleteUserData, userDataSelect } =
  userSlice.actions;
export { fetchUsers };
export const selectUserData = (state) => state.users.users;
export const selectUserError = (state) => state.users.error;
export default userSlice.reducer;
