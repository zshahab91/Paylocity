import { IAuthState, IUser } from "@/interfaces/auth";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: IAuthState = {
  authState: false,
};
const Admin: IUser = {
  'username': 'admin',
  'password': 'admin'
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<IUser>) => {
      state.authState = Object.entries(Admin).toString() === Object.entries(action.payload).toString();
      localStorage.setItem('isLogin', String(state.authState));
    },
  },
});

export const { setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;