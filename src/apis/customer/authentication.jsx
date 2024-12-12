import api from "../index";
import axios from "axios";

//-----Customer signup ---------- //

export async function customerSignUp(data) {
  const apiUrl = "api/User/SignUp";
  return await api.post(apiUrl, data);
}

//-----Customer Login ------------ //
export async function customerLogin(data) {
  const apiUrl = "api/User/authenticate";
  return await api.post(apiUrl, data);
}

//-----Customer Email Verification -------//
export async function customerOtpVerification(data) {
  const apiUrl = "api/User/VerifyOTP";
  return await api.post(apiUrl, data);
}

//----- Customer Resend Code -----//
export async function customerResendCode(data) {
  const apiUrl = "api/User/ResendOTP";
  return await api.post(apiUrl, data);
}


export async function customerRegisteration(data) {
  const apiUrl = "api/User/AddUpdateProfile";
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  
  return await api.post(apiUrl, data, {headers});
};

//- -------Customer Forgot Password ------//

export async function customerForgotPassword(data) {
  const apiUrl = "api/User/ForgotPassword";
  
  return await api.post(apiUrl, data);
};

//------Customer Contact US ------///

export async function customerContactUs(data) {
  const apiUrl = "/api/User/ContactUs";
  return await api.post(apiUrl,data)
}

//----- Customer Change Password ----//

export async function customerChangePassword(data) {
  const apiUrl = "api/User/ChangePassword";
  return await api.post(apiUrl,data)
}

//--- Customer Change Password -----//

export async function customerResetPassword(data,headers) {
  const apiUrl = "api/User/ResetPassword";
  return await api.post(apiUrl,data,headers)
}
