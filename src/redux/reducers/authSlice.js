import { createSlice } from "@reduxjs/toolkit";
import SecureLS from "secure-ls";
import axios from "axios";

const initialAuthState = {
  token: null,
  user: {},
  skipAddCard: false, 
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      console.log('Before login update:', action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
      console.log('After login update:', state);

      const ls = new SecureLS();
      ls.set("token", state.token);
      console.log("Token saved:", state.token);
      axios.defaults.headers.common.Authorization = `Bearer ${state.token}`;
    },

    updateUser(state, action) {
      console.log('Before user update:', state.user);
      state.user = { ...state.user, ...action.payload.user };
      console.log('After user update:', state.user);
    },

    logout(state) {
      state.token = null;
      state.user = {};
      axios.defaults.headers.common.Authorization = undefined;
      console.log('After logout:', state);
    },

  
  },
});

export const { login, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
