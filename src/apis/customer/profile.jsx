import api from '../index'
import SecureLS from "secure-ls";
// Customer Address ----// headers: {
  //   "Authorization": `Bearer ${yourToken}`,
  //   "Content-Type": "application/json"
  // }


const ls = new SecureLS();
const token = ls.get("token");


export async function customerAddAddress(data) {
  const apiUrl = "api/User/AddAddress";
  return await api.post(apiUrl, data);
}

// -------Customer Profile-----//

export async function customerProfile() {
  const apiUrl = "api/User/UserProfile";
  return await api.get(apiUrl);
}

//------Customer Contact --------//

export async function customerContact(data) {
  const apiUrl = "/api/User/ContactUs";
  return await api.post(apiUrl, data);
}

//------Customer HomeList ------//
export async function customerHomeList(data) {
  const apiUrl = "api/Customer/HomeListUser"
  return await api.post(apiUrl, data);
}

//------Customer MyReview------//

export async function customerMyReview(data) {
  const apiUrl = "api/User/MyReviews"
  return await api.post(apiUrl, data)
}

//-----Customer DashboardData-----//

export async function CustomerDashboardData(data) {
  const apiUrl = "api/CustomerDashboard/Dashboard";
  const headers = {
    // "Content-Type": "multipart/form-data",
    'Content-Type': 'application/json',
    "Authorization": token,
  };

  return await api.post(apiUrl, data, { headers })
}


//---- Customer UserDetaiData -----//

export async function customerUserDetail(data) {
  const apiUrl = "api/CustomerDashboard/UserDetail"
  return await api.post(apiUrl, data)
}

//------- Customer FavouriteList -----//

export async function customerFavouriteList(data) {
  const apiUrl = "/api/CustomerDashboard/FavoriteBusinessList"
  return await api.post(apiUrl, data)
}

//--------Customer JobList-------//

export async function customerJobList(data) {
  const apiUrl = "api/CustomerDashboard/JobListByDate"
  return await api.post(apiUrl, data)
}

//----------Customer AllBookingDates--------//

export async function customerBookingDates(data) {
  const apiUrl = "api/CustomerDashboard/AllCustomerBookingDates"
  return await api.post(apiUrl, data)
}

// --------Customer Business Booked Slot------------//

export async function customerBusinessBookedSlot(data) {
  const apiUrl = "api/CustomerDashboard/BusinessBookedSlot"
  return await api.post(apiUrl, data)
}

//-------Customer book appointment--------------//
export async function customerBookAppointment(data) {
  const apiUrl = "api/CustomerDashboard/BookAppointment";
  const headers = {
    "Content-Type": "multipart/form-data",
    // 'Content-Type': 'application/json',
  };
  return await api.post(apiUrl, data, { headers })
};

//----Customer FavouriteBusiness-----//

export async function customerFavouriteBusiness(data) {
  const apiUrl = "/api/CustomerDashboard/FavoriteBusiness"
  return await api.post(apiUrl, data)
};


//-----Customer jobDetail-----//

export async function customerjobDetail(data) {
  const apiUrl = "/api/CustomerDashboard/JobDetail"
  return await api.post(apiUrl, data)
};

//------ Customer AcceptReject Estimates-----//

export async function customerAcceptRejectEstimates(data) {
  const apiUrl = "api/CustomerDashboard/AcceptOrRejectEstimate"
  return await api.post(apiUrl, data)
}

//----- Customer GiveReviewAndRating-----//

export async function customerGiveReviewAndRating(data) {
  const apiUrl = "api/User/GiveReviewAndRating"
  return await api.post(apiUrl, data)
}
