import axios from "axios";
import SecureLS from "secure-ls";
import { toast } from "react-toastify";
import { logout } from "../redux/reducers/authSlice";
import { store } from "../redux/store";
// import createStore from "../redux/store";
// store

// Create SecureLS instance
const ls = new SecureLS();
export const setToken = (token) =>{
  ls.set("token",`${token}`)
} 
// Check for and set token in axios default headers
const token = ls.get("token");
if (token) {
  axios.defaults.headers.common.Authorization = `${token}`;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;
const googleApi = import.meta.env.VITE_GOOGLE_API_KEY;

export const instance = axios.create({
  baseURL,
  googleApi,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.delete["Content-Type"] = "application/json";

// Handle logout on 401 status
// const { store } = createStore();

let isLoggingOut = false;

axios.interceptors.response.use(
  (response) => {
    if (
      response.data.status_code === 201 
      // &&
      // response.data.message !== "Data found" &&
      // response.data.message !== "Category list" &&
      // response.data.message !== "Data not found"
    ) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401 && !isLoggingOut) {
        isLoggingOut = true;
        store.dispatch(logout()).finally(() => {
          isLoggingOut = false;
        });
      }
      if (data?.message && data.message !== "Unauthenticated.") {
        toast.error(data.message);
      }
      if (!data?.message) {
        toast.error("An error occurred");
      }
    }
    return Promise.reject(new Error("Oh no!"));
  }
);

export default instance;