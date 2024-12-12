import api from "../index";
import SecureLS from "secure-ls";




const ls = new SecureLS();
const token = ls.get("token");
console.log(token,"========")



/*****business AddUpdateProfile*****/

export async function businessPersonalProfile(data) {
  const apiUrl = "api/User/AddUpdateProfile";
  const headers = {
    "Content-Type": "multipart/form-data",
    "Authorization": token,
  };
  return await api.post(apiUrl, data, { headers });
}

//------- Business LinkAccount-------//

export async function businessLinkAccounts(data) {
  const apiUrl = "/api/User/AddLinks";
  const headers = {
   "Authorization": token,
  };
  return await api.post(apiUrl, data, { headers });
}

//-------Business DashboardData------//

export async function businessDashboardData(data) {
  const apiUrl = "api/Customer/HomeListUser";
  return await api.post(apiUrl, data);
}

//------Business MarketPlace------//

export async function businessMarketPlace(data) {
  const apiUrl = "/api/BusinessDashboard/DashboardJobs";
  return await api.post(apiUrl, data);
}

//-----Business UserDetails-----//

export async function businessUserDetails(data) {
  const apiUrl = "/api/Customer/CustomerProfile";
  return await api.post(apiUrl, data);
}

//----Business AddReview-----//

export async function businessAddReview(data) {
  const apiUrl = "/api/Customer/AddReview";
  return await api.post(apiUrl, data);
}

//----Business AddCustomer-----//

export async function businessAddCustomer(data) {
  const apiUrl = "/api/Customer/AddCustomer";
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return await api.post(apiUrl, data, { headers });
}

//----Business JobDetails-----//

export async function businessJobDetails(data) {
  const apiUrl = "/api/BusinessDashboard/JobDetail";
  return await api.post(apiUrl, data);
}

//----Business AddServices-----//

export async function businessAddServices(data) {
  const apiUrl = "/api/User/AddServices";
  return await api.post(apiUrl, data);
}

//-----Business AddAvailablity-----//

export async function businessAddAvailability(data) {
  const apiUrl = "/api/User/AddAvailability";
  return await api.post(apiUrl, data);
}

//-----Business SearchCustomer-----//

export async function businessSearch(data) {
  const apiUrl = "/api/Customer/SearchCustomers";
  return await api.post(apiUrl, data);
}

//-----Business AddBank-----//

export async function businessAddBank(data) {
  const apiUrl = "/api/User/AddOrEditBankDetail";
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return await api.post(apiUrl, data, { headers });
}
//-----Business AddAvailabilityStatus-----//

export async function businessAddAvailabilityStatus(data) {
  const apiUrl = "/api/User/SetAvailabilityStatus";
  return await api.post(apiUrl, data);
}

//----Business AllBusinessBookingDate-----//

export async function businessBookingDates(data) {
  const apiUrl = "api/BusinessDashboard/AllBusinessBookingDates";
   return await api.post(apiUrl, data);
}

//-----Business BusinessAllJobList-----//

export async function businessJobList(data) {
  const apiUrl = "api/BusinessDashboard/JobListByDate";
  return await api.post(apiUrl, data);
}

//-----Business  myReviewList-----//

export async function businessMyReviewList(data) {
  const apiUrl = "/api/User/MyReviewList";
  return await api.post(apiUrl, data);
}

//----Business AcceptRejectStatus-----//

export async function businessAcceptRejectStatus(data) {
  const apiUrl = "/api/BusinessDashboard/AcceptOrRejectBooking";
  return await api.post(apiUrl, data);
}

//----Business SendEstimates-----//

export async function businessSendEstimates(data) {
  const apiUrl = "api/BusinessDashboard/SendEstimate";
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return await api.post(apiUrl, data, { headers });
}

//----Business SaveEstimates-----//

export async function businessSaveEstimateItems(data) {
  const apiUrl = "/api/BusinessDashboard/SaveEstimateItems";
  return await api.post(apiUrl, data);
}
//----Business SaveEstimatesList-----//

export async function businessSaveEstimateList(data) {
  const apiUrl = "api/CustomerDashboard/ViewEstimate";
  return await api.post(apiUrl, data);
}

//-----Business NotificationList----//

export async function businessNotificationList(data) {
  const apiUrl = "api/Notification/NotificationList"
  return await api.post(apiUrl, data)
}

//-----Business DeleteUser-----//

export async function businessDeleteUser(data) {
  const apiUrl = "api/User/DeleteUser"
  return await api.post(apiUrl, data)
}

//-----Business UserSubscription -----//

export async function businessUserSubscription(data) {
  const apiUrl = "api/User/SaveSubscription"
  return await api.post(apiUrl, data)
}

//-----Business User/SubscriptionList ----//

export async function businessSubscriptionList(data) {
  const apiUrl = "api/User/GetPlanList"
  return await api.get(apiUrl, data)
}
