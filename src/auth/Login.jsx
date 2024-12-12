import React, { useState } from "react";
import Footer_two from "../innerpage/layout/Footer_two";
import Header_two from "../innerpage/layout/Header_two";
import Header_Business from "../innerpage/layout/Header_business";
import { login_icn, signin } from "../assets/image";
import { login } from "../redux/reducers/authSlice";
import { Link } from "react-router-dom";
import Forget_Management from "../modals/Forget_Management";
import { loginValidator } from "../helpers/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerLogin } from "../apis/customer/authentication";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToken } from "../apis";
import SecureLS from "secure-ls";
import { useLocation } from "react-router-dom";
import Landing_header from "../Landingpage/Landing_header";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    
    resolver: yupResolver(loginValidator),
  });
  // const { skipCard } = useSelector((state) => state?.authSlice?.user)
  // console.log(skipCard);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const isBusiness = location.pathname === "/business-login";

  const [isOpen, setIsOpen] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [locationn, setLocation] = useState({ longitude: "", latitude: "" });

  function handlePassword() {
    setTogglePassword((prevState) => !prevState);
  }

  const openModal = (e) => {
    // e.preventDefualt()
    e.preventDefault();
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const locationData = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(locationData);
            resolve(locationData);
          },
          (error) => {
            console.error("Error getting location", error);
            setLocation({ latitude: "", longitude: "" });
            resolve({ latitude: "", longitude: "" });
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        resolve({ latitude: "", longitude: "" });
      }
    });
  };
  const handleLogin = async (data) => {
    try {
      // Simulate user data based on the email and password entered
      const userData = {
        email: data.email,
        token: "dummy_token", // You can use a dummy token for local testing
        role: isBusiness ? "business" : "customer",
        // Add any other user data you want to simulate
      };
  
      // Dispatch the login action with the simulated user data
      dispatch(
        login({
          token: userData.token,
          user: userData,
        })
      );
  
      // Navigate based on user type
      if (isBusiness) {
        // Business User Navigation
        navigate("/business-home"); // Change this to the desired business home page
      } else {
        // Customer User Navigation
        navigate("/home"); // Change this to the desired customer home page
      }
  
      toast.success("Login Successful");
    } catch (error) {
      console.log(error, "0000");
      toast.error("An error occurred during login!");
    }
  };
  // const handleLogin = async (data) => {
  //   try {
  //     const locationData = await getLocation();
  //     const apiData = {
  //       Email: data.email,
  //       Password: data.password,
  //       Usertype: isBusiness ? 0 : 1,
  //       DeviceToken: "",
  //       DeviceType: "web",
  //       TimeZone: "",
  //       latitude: locationData.latitude,
  //       longitude: locationData.longitude,
  //     };

  //     const response = await customerLogin(apiData);
  //     if (!response?.data?.data) {
  //       throw new Error("Invalid response structure");
  //     }
  //     const userData = response.data.data;
  //     const token = userData?.token;
  //     setToken(token);
  //     // return console.log(response.data.data)
  //     dispatch(
  //       login({
  //         token,
  //         user: { ...userData, role: isBusiness ? "business" : "customer" },
  //       })

  //     );        


  //     if (response?.data?.status_code === 201) {
  //       if (isBusiness) {
  //         // Business User Navigation
  //         if (!userData) {
  //           console.error("userData is undefined or null");
  //           return;
  //         }

  //         if (userData?.fName == null && userData?.lName == null) {
  //           console.log("Navigating to /business/personal-info");
  //           navigate("/business/personal-info");
  //           // } else if (
  //           //   userData?.facebook == null &&
  //           //   userData?.youtube == null &&
  //           //   userData?.tiktok == null &&
  //           //   userData?.website == null &&
  //           //   userData?.instagram == null
  //           // ) {
  //           //   console.log("Navigating to /business/link-account");
  //           //   navigate("/business/link-account");
  //         } else if (userData?.address1 == null && userData?.zipcode == null) {
  //           console.log("Navigating to /address");
  //           navigate("/business-add-address");
  //           // } else if (!skipCard) { // Check the skipAddCard flag
  //           //   console.log("Navigating to /business/add-card");
  //           //   navigate("/add-card"); // Redirect to Add Card page if not skipped
  //         } else if (userData?.services.length === 0) {
  //           // Check if services array is empty
  //           navigate("/business-add-services");
  //         } else if (userData?.availabilityList.length === 0) {
  //           // Check if availabilityList array is empty
  //           navigate("/business-add-availability");
  //         } else {
  //           console.log("Navigating to /business/home");
  //           navigate("/business-home");
  //         }
  //       } else {
  //         // Customer User Navigation
  //         if (!userData) {
  //           console.error("userData is undefined or null");
  //           return;
  //         }

  //         if (
  //           userData?.image == null &&
  //           userData?.fName == null &&
  //           userData?.lName == null &&
  //           userData?.contactNumber == null
  //         ) {
  //           console.log("Navigating to /register");
  //           navigate("/register");
  //         } else if (userData?.address1 == null && userData?.zipcode == null) {
  //           console.log("Navigating to /address");
  //           navigate("/address");
  //         } else {
  //           console.log("Navigating to /home");
  //           navigate("/home");
  //         }
  //       }

  //       toast.success("Login Successful");
  //     }
  //   } catch (error) {
  //     console.log(error, "0000");
  //     toast.error("Credentials do not match!");
  //   }
  // };

  const handleSignupNavigate = () => {
    navigate(isBusiness ? "/business-signup" : "/Signup");
  };

  return (
    <>
      {/* <Reset_Password isOpen={isOpen} closeModal={closeModal} /> */}
      {/* {isBusiness ? <Header_Business /> : <Header_two />} */}
      <Landing_header/>


      {/* inner section */}
      <section className="md:p-20 p-5 py-32 relative">
        <div className="container mx-auto">
          <div className="grid content-center h-full">
            <div className="item shadow-2xl rounded-2xl p-10 max-w-[500px] w-[90%] mx-auto">
              <div className="img w-fit my-5 mx-auto">
                <img src={signin} alt="" width="90px" />
              </div>
              <div className="desc mb-6">
                <h3 className="text-2xl font-bold text-center text-dark_link mb-2">
                  Welcome Back !
                </h3>
                <p className="uppercase text-center text-sm">
                  Sign In to continue
                </p>
              </div>
              <div className="inp_frm my-5">
                <form action="">
                  <div className="inp mb-4 relative">
                    <span className="absolute left-2 top-0 bottom-0 flex items-center h-full ">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 20.7046H7C4 20.7046 2 19.2046 2 15.7046V8.70459C2 5.20459 4 3.70459 7 3.70459H17C20 3.70459 22 5.20459 22 8.70459V15.7046C22 19.2046 20 20.7046 17 20.7046Z"
                          stroke="#3C3C3C"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17 9.20459L13.87 11.7046C12.84 12.5246 11.15 12.5246 10.12 11.7046L7 9.20459"
                          stroke="#3C3C3C"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      placeholder="Email"
                      type="text"
                      name=""
                      id=""
                      {...register("email")}
                    />
                  </div>
                  <p className="text-red-600 mt-1 text-sm ">
                    {errors.email?.message}
                  </p>
                  <div className="inp mb-4 relative">
                    <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 10.2046V8.20459C6 4.89459 7 2.20459 12 2.20459C17 2.20459 18 4.89459 18 8.20459V10.2046"
                          stroke="#3C3C3C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 18.7046C13.3807 18.7046 14.5 17.5853 14.5 16.2046C14.5 14.8239 13.3807 13.7046 12 13.7046C10.6193 13.7046 9.5 14.8239 9.5 16.2046C9.5 17.5853 10.6193 18.7046 12 18.7046Z"
                          stroke="#3C3C3C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17 22.2046H7C3 22.2046 2 21.2046 2 17.2046V15.2046C2 11.2046 3 10.2046 7 10.2046H17C21 10.2046 22 11.2046 22 15.2046V17.2046C22 21.2046 21 22.2046 17 22.2046Z"
                          stroke="#3C3C3C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      className=" w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      placeholder="Password"
                      type={togglePassword ? "text" : "password"}
                      name=""
                      id=""
                      {...register("password")}
                    />
                    <i
                      className="absolute right-3 top-4"
                      onClick={handlePassword}
                    >
                      {togglePassword ? (
                        <svg
                          width="28"
                          height="29"
                          viewBox="0 0 28 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5799 13.2046C17.5799 15.1846 15.9799 16.7846 13.9999 16.7846C12.0199 16.7846 10.4199 15.1846 10.4199 13.2046C10.4199 11.2246 12.0199 9.62459 13.9999 9.62459C15.9799 9.62459 17.5799 11.2246 17.5799 13.2046Z"
                            stroke="#3C3C3C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.9998 21.4746C17.5298 21.4746 20.8198 19.3946 23.1098 15.7946C24.0098 14.3846 24.0098 12.0146 23.1098 10.6046C20.8198 7.00459 17.5298 4.92459 13.9998 4.92459C10.4698 4.92459 7.17984 7.00459 4.88984 10.6046C3.98984 12.0146 3.98984 14.3846 4.88984 15.7946C7.17984 19.3946 10.4698 21.4746 13.9998 21.4746Z"
                            stroke="#3C3C3C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.9516 11.0482L11.0482 16.9516C10.2899 16.1932 9.82324 15.1549 9.82324 13.9999C9.82324 11.6899 11.6899 9.82324 13.9999 9.82324C15.1549 9.82324 16.1932 10.2899 16.9516 11.0482Z"
                            stroke="#3C3C3C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M20.7898 6.73156C18.7482 5.19156 16.4148 4.35156 13.9998 4.35156C9.88148 4.35156 6.04315 6.77823 3.37148 10.9782C2.32148 12.6232 2.32148 15.3882 3.37148 17.0332C4.29315 18.4799 5.36648 19.7282 6.53315 20.7316"
                            stroke="#3C3C3C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.82324 22.785C11.1532 23.345 12.5649 23.6484 13.9999 23.6484C18.1182 23.6484 21.9566 21.2217 24.6282 17.0217C25.6782 15.3767 25.6782 12.6117 24.6282 10.9667C24.2432 10.36 23.8232 9.78838 23.3916 9.25171"
                            stroke="#3C3C3C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18.0947 14.8167C17.7914 16.4617 16.4497 17.8033 14.8047 18.1067"
                            stroke="#3C3C3C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.048 16.9517L2.33301 25.6667"
                            stroke="#3C3C3C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M25.6671 2.33325L16.9521 11.0483"
                            stroke="#3C3C3C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                    </i>
                  </div>
                  <p className="text-red-600 mt-1 text-sm ">
                    {errors.password?.message}
                  </p>

                  <div className="inp mb-4">
                    <p
                      onClick={openModal}
                      className="text-dark_link text-end text-sm font-bold cursor-pointer"
                    >
                      Forgot Password?
                    </p>
                  </div>
                  <div className="inp mb-4">
                    <button
                      onClick={handleSubmit(handleLogin)}
                      type="submit"
                      className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="inp flex justify-between items-center mb-4">
                    <span className="border-t border-dark_link flex w-[33%] h-[1px] opacity-30"></span>
                    <p className="md:w-[33.9%] w-full text-center text-[#455A64] font-medium">
                      Or Sign in with
                    </p>
                    <span className="border-t flex border-dark_link  w-[33%] h-[1px] opacity-30"></span>
                  </div>
                  <div className="inp flex justify-between items-center mb-4">
                    <button
                      type="submit"
                      className="w-full bg-black flex justify-center gap-2 py-4 text-white font-medium rounded-lg"
                    >
                      <span>
                        <svg
                          width="19"
                          height="24"
                          viewBox="0 0 19 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.9252 0.5H14.0888C14.2201 2.12201 13.601 3.33397 12.8486 4.21163C12.1103 5.08323 11.0993 5.92858 9.4642 5.80031C9.35513 4.20153 9.97525 3.07946 10.7267 2.20382C11.4235 1.38776 12.7012 0.661595 13.9252 0.5ZM18.8751 17.3826V17.4281C18.4155 18.8198 17.7601 20.0126 16.9602 21.1195C16.23 22.1244 15.3351 23.4768 13.7374 23.4768C12.3568 23.4768 11.4397 22.589 10.0247 22.5648C8.52796 22.5405 7.70484 23.3071 6.33633 23.5H5.86973C4.86481 23.3546 4.05381 22.5587 3.46298 21.8416C1.72078 19.7227 0.374495 16.9857 0.124023 13.4831V12.454C0.23007 9.94724 1.44809 7.90912 3.06707 6.92138C3.9215 6.39619 5.09609 5.94878 6.404 6.14875C6.96453 6.23561 7.53719 6.4275 8.03914 6.61738C8.51483 6.80018 9.10971 7.12438 9.67327 7.10721C10.055 7.0961 10.4348 6.89714 10.8196 6.75675C11.9467 6.34973 13.0516 5.88313 14.508 6.10229C16.2583 6.3669 17.5005 7.14458 18.2681 8.34442C16.7875 9.28672 15.6169 10.7067 15.8169 13.1317C15.9947 15.3344 17.2753 16.6231 18.8751 17.3826Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      Apple
                    </button>
                  </div>
                  <div className="info flex justify-center flex-wrap">
                    <p className="">Don't have an account?</p>{" "}
                    <button onClick={handleSignupNavigate} className="text-dark_link font-bold px-2">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer_two />
      <Forget_Management isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

export default Login;
