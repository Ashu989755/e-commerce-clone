import api from '../index'

// -----Customer StripePayment ---- // 
 export const customerStripePayment  = () => {
    const apiUrl = "/api/CustomerDashboard/AddCard"
    return api.post(apiUrl)
 }

// -----Customer StripeCardList  ---- // 

 export const customerStripeCardList  = () => {
    const apiUrl = "/api/CustomerDashboard/StripeSavedCardList"
    return api.post(apiUrl)
 }


// -----Customer StripeCardList  ---- // 

 export const customerStripeDeleteCard  = (data) => {
    const apiUrl = "/api/CustomerDashboard/StripeDeleteCard";
    return api.post(apiUrl, data)
 }
// -----Customer StripeCardList  ---- // 

 export const customerStripeDefaultCard = (data) => {
    const apiUrl = "/api/CustomerDashboard/SetDefaultCard";
    return api.post(apiUrl, data)
 }


