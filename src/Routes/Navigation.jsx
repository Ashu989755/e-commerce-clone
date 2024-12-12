import {
  RouterProvider,
  Route,
  BrowserRouter as Router,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import Landing from "../Landingpage/Landing";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import RegisterNow from "../innerpage/Customers/RegisterNow";
import AddAddress from "../innerpage/Customers/AddAddress";
import Add_Card from "../innerpage/Customers/Add_Card";
import Home from "../innerpage/Customers/Home";
import Service_profile from "../innerpage/Customers/Service_profile";
import All_Notifications from "../innerpage/Customers/All_Notifications";
import My_profile from "../innerpage/Our profile/My_profile";
import Change_password from "../innerpage/Our profile/Change_password";
import Change_passwordd from "../innerpage/Business profile/Change_passwordd";
import Change_address from "../innerpage/Our profile/Change_address";
import Edit_profile from "../innerpage/Our profile/Edit_profile";
import Favorites from "../innerpage/Customers/Favorites";
import About from "../innerpage/Footerpages/About";
import Contact from "../innerpage/Footerpages/Contact";
import Terms_Conditions from "../innerpage/Footerpages/Terms_Conditions";
import PrivacyPolicy from "../innerpage/Footerpages/PrivacyPolicy";
import MyReviews from "../innerpage/Customers/MyReviews";
import MyCalendar from "../innerpage/Customers/MyCalendar";
import PastJob from "../innerpage/Customers/PastJob";
import Stripe_Checkout from "../components/Stripe_Checkout";
import NotFound from "../innerpage/Customers/NotFound";

import Estimate from "../innerpage/Customers/Estimate";
import BussinessHome from "../innerpage/Bussiness/BussinessHome";
import UserDetails from "../innerpage/Bussiness/UserDetails";
import MarketPlace from "../innerpage/Bussiness/MarketPlace";
import JobDetails from "../innerpage/Bussiness/JobDetails";
import BusinessFavorites from "../innerpage/Bussiness/BusinessFavorites";
import Message from "../innerpage/Bussiness/Message";
import Booking_Appointment from "../innerpage/Customers/Booking_Appointment";
import BusinessSignup from "../innerpage/Bussiness/AddAvailability"
import BusinessPersonalInfo from "../innerpage/Bussiness/BusinessPersonalInfo";
import BusinessLinkAccount from "../innerpage/Bussiness/BusinessLinkAccount";
// import BusinessAddress from "../innerpage/Bussiness/BusinessAddress";
import BusinessAddAddress from "../innerpage/Bussiness/BusinessAddress";
import SelectServices from "../innerpage/Bussiness/SelectServices";
import AddAvailability from "../innerpage/Bussiness/AddAvailability";
import SubscriptionPlan from "../innerpage/Bussiness/SubscriptionPlan";
import BMy_Profile from "../innerpage/Business profile/My_profile"
import Personal_editprofile from "../innerpage/Business profile/Personal_editprofile";
import Bank_details from "../innerpage/Business profile/Bank_details";
import Book_Consultation from "../innerpage/Customers/Book_Consultation";
import SendEstimates from "../innerpage/Bussiness/SendEstimates";
import Edit_Services from "../innerpage/Business profile/Edit_Services";
import Business_availability from "../innerpage/Business profile/Business_availability";
import Edit_BusinessPersonalInfo from "../innerpage/Business profile/Edit_BusinessPersonalInfo";
import Edit_Sociallink from "../innerpage/Business profile/Edit_Sociallink";
// import BEdit_profile from "../innerpage/Business profile/Edit_profile"
import Business_subscription_plan from "../innerpage/Business profile/Business_subscription_plan";
import Business_Edit_Availability from "../innerpage/Business profile/Business_Edit_Availability";
import BMyCalendar from "../innerpage/Bussiness/BMyCalendar";
import UserReviewDetails from "../innerpage/Bussiness/UserReviewDetails";
import Business_AllNotifications from "../innerpage/Bussiness/Business_AllNotifications";
import CreateDocuments from "../innerpage/Business profile/CreateDocuments";
import AddCastomer from "../innerpage/Business profile/AddCastomer";
import SendEstimatesContract from "../innerpage/Business profile/SendEstimatesContract"
import Send_Invoice from "../innerpage/Business profile/Send_Invoice";
import UpdateEstimate from "../innerpage/Business profile/UpdateEstimate";
import Message_Send_Invoice from "../innerpage/Business profile/Message_Send_Invoice";
import View_Invoice from "../innerpage/Business profile/View_Invoice";
import BussinessUserRating from "../innerpage/Bussiness/BussinessUserRating";
import SecureLS from "secure-ls";
import Private_Routing from "../components/Private_Routing";
import { useSelector } from "react-redux";
import Payment from "../modals/Payment";


export default function Navigation() {
  const { token: user, user: data } = useSelector(state => state.authSlice);
  const otp = data.otp
  console.log(otp, "====")
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        {/* <Route path="/Login" element={<Private_Routing isAuthenticated={!user}><Login /></Private_Routing>} /> */}

        {/* <Route path="/Signup" element={<Private_Routing isAuthenticated={!user}> <Signup /> </Private_Routing>} />
       
        <Route path="/" element={!user ? <Landing /> : data.role === "business" && !data.otp ? <BussinessHome /> : <Home />} />
        {/* <Route
          path="/"
          element={
            !user
              ? <Landing />
              : data.role === "business"
                ? (!data.otp && <BussinessHome />)
                : ( <Home />)
          }
        /> */}
        <Route path="/" element={<Landing />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/address" element={<AddAddress />} />
        <Route path="/add-card" element={<Add_Card />} />
        <Route path="/register" element={<RegisterNow />} />
        {/* customers */}
        {/* <Route element={<Private_Routing isAuthenticated={!!user} />}> */}
        <Route path="/home" element={<Home />} />
        <Route path="/servicer-profile/:id" element={<Service_profile />} />
        <Route path="/notification" element={<All_Notifications />} />
        <Route path="/business-notification" element={<Business_AllNotifications />} />
        <Route path="/Favorites" element={<Favorites></Favorites>} />
        <Route path="/reviews" element={<MyReviews />} />
        <Route path="/my-calendar" element={<MyCalendar />} />
        <Route path="/past-job/:id" element={<PastJob />} />
        <Route path="/checkout" element={<Stripe_Checkout />} />
        <Route path="/current-job/estimate/:id" element={<Estimate />} />
        <Route path="/booking-appointment" element={<Booking_Appointment />} />
        <Route path="/book-consultation" element={<Book_Consultation />} />
        <Route path="/paymentMethod/:type" element={<Payment />} />



        {/* </Route> */}

        {/* Bussiness */}
        <Route path="business/personal-info" element={<BusinessPersonalInfo />} />
        <Route path="business/link-account" element={<BusinessLinkAccount />} />
        <Route path="/business-add-address" element={<BusinessAddAddress />} />
        <Route path="/business-address" element={<BusinessAddAddress />} />
        <Route path="/business-add-services" element={<SelectServices />} />
        <Route path="/business-add-availability" element={<AddAvailability />} />
        <Route path="/business-subscription-plan" element={<SubscriptionPlan />} />

        {/* <Route element={<Private_Routing isAuthenticated={!!user} />}> */}
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="/user-review-details/:id" element={<UserReviewDetails />} />
        <Route path="/market-place" element={<MarketPlace />} />
        <Route path="job-details/:id" element={<JobDetails />} />
        <Route path="/business/favorites" element={<BusinessFavorites />} />
        <Route path="/business/message" element={<Message />} />
        <Route path="/business/user-rating" element={<BussinessUserRating />} />

        <Route path="business/create-documents" element={<CreateDocuments />} />
        <Route path="business/add-customer" element={<AddCastomer />} />

        <Route path="/message" element={<Message />} />
        <Route path="/message-send-invoice" element={<Message_Send_Invoice />} />


        <Route path="/business-my-profile" element={<BMy_Profile />} />
        <Route path="/business-my-calendar" element={<BMyCalendar />} />
        <Route path="/business-change-password" element={<Change_passwordd />} />
        <Route path="/business-change-address" element={<Change_address />} />
        <Route path="/business-edit-profile" element={<Edit_BusinessPersonalInfo />} />

        <Route path="/send-estimates" element={<SendEstimates />} />
        <Route path="/send-estimates-contract" element={<SendEstimatesContract />} />
        <Route path="//update-estimates" element={<UpdateEstimate />} />
        <Route path="/send-invoice" element={<Send_Invoice />} />
        <Route path="/view-invoice/:id" element={<View_Invoice />} />

        <Route path="/business-Edit-Services" element={<Edit_Services />} />
        <Route path="/business-Edit-Availability" element={<Business_availability />} />
        <Route path="/business-personal-info" element={<Edit_BusinessPersonalInfo />} />
        <Route path="/edit-social-links" element={<Edit_Sociallink />} />
        <Route path="/business-edit-availability-status" element={<Business_Edit_Availability />} />
        {/* </Route> */}
        <Route path="/business-login" element={<Login />}/>
        {/* <Route path="/business-login" element={<Private_Routing isAuthenticated={!user}><Login /></Private_Routing>} /> */}
        {/* <Route path="/business-signup" element={ <Private_Routing isAuthenticated={!user}> <Signup /> </Private_Routing>} /> */}
        <Route path="/business-signup" element={<Signup />} />
        <Route path="/business-home" element={<BussinessHome />} />


        {/* <Route path="business/add-address" element={<BusinessAddress />} /> */}

        <Route path="/change-subscription-plan" element={<Business_subscription_plan />} />

        {/* Profile pages */}
        <Route path="/my-profile" element={<My_profile />} />
        <Route path="/change-profile" element={<Change_password />} />
        <Route path="/change-address" element={<Change_address />} />
        <Route path="/edit-profile" element={<Edit_profile />} />



        {/* footer pages */}
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/terms&conditions" element={<Terms_Conditions />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/*" element={<NotFound />} />


        {/* business Profile pages */}
        <Route path="/my-profile-business" element={<BMy_Profile />} />
        <Route path="/change-profile" element={<Change_password />} />
        <Route path="/change-address" element={<Change_address />} />
        <Route path="/edit-profile" element={<Edit_profile />} />
        <Route path="/personal-editprofile" element={<Personal_editprofile />} />
        <Route path="/bank_details" element={<Bank_details />} />


      </>
    )
  );
  return <RouterProvider router={router} />;
}