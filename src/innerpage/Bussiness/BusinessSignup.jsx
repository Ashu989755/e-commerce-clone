import React, { useState, useEffect } from "react";
import Footer_two from "../../layout/Footer_two";
import Header_two from "../../layout/Header_two";
import { Link } from "react-router-dom";
import { login_icn } from "../../../assets/image";
import { signupValidation } from "../../../helpers/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { businessSignUp } from "../../../apis/business/authenticate"
 import Verify_Email from "../../../modals/Verify_Email";
 import { toast } from "react-toastify";

const BusinessSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupValidation),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [confirmTogglePassword, setConfirmTogglePassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [locationn, setLocation] = useState({ longitude: "", latitude: "" });

  function handlePassword() {
    setTogglePassword((prevState) => !prevState);
  }
  function handleConfirmPassword() {
    setConfirmTogglePassword((prevState) => !prevState);
  }

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const openModal = (e) => {
    // e.preventDefualt()
   
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

 
    const handleSignUp = async (data) => {
    if (isChecked) {
      try {
        const locationData = await getLocation(); 

        const apiData = {
          Email: data.email,
          Password: data.password,
          Usertype: 0 ,
          DeviceToken: "",
          DeviceType: "web",
          TimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        };

        console.log("API Data:", apiData);
        const response = await businessSignUp(apiData);
        if (response?.data?.success == true) {
          const userData = response?.data?.data;
          const token = response.data.data.token;
          dispatch(
            login({
              token,
              user: { ...userData },
            })
          );
          console.log(token, "+++++++++++++++++++");
          toast.success('Code sent to your email');
          openModal();
        }
        else if(response?.data?.success == false){
       toast.error(response?.data?.message)  
     
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      toast.error("Please accept terms and conditions");
    }
  };


  return (
    <>
      <Header_two></Header_two>
      {/* inner section */}
      <section className=" p-20 py-32 relative">
        <div className="container mx-auto">
          <div className="grid content-center h-full">
            <div className="item shadow-2xl rounded-2xl p-10 max-w-[500px] w-[90%] mx-auto">
              <div className="img w-fit my-5 mx-auto">
                <img src={login_icn} alt="" width="90px" />
              </div>
              <div className="desc">
                <h3 className="text-2xl font-bold text-center text-dark_link">
                  Welcome Back !
                </h3>
                <p className="uppercase text-center text-sm">
                  Sign Up to continue
                </p>
              </div>
              <div className="inp_frm my-5">
                <form>
                  {/* <div className="inp mb-4 relative">
                    <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                      <svg
                        width="28"
                        height="29"
                        viewBox="0 0 28 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.1586 13.0746C14.0586 13.0646 13.9386 13.0646 13.8286 13.0746C11.4486 12.9946 9.55859 11.0446 9.55859 8.64459C9.55859 6.19459 11.5386 4.20459 13.9986 4.20459C16.4486 4.20459 18.4386 6.19459 18.4386 8.64459C18.4286 11.0446 16.5386 12.9946 14.1586 13.0746Z"
                          stroke="#3C3C3C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.15875 16.7646C6.73875 18.3846 6.73875 21.0246 9.15875 22.6346C11.9088 24.4746 16.4188 24.4746 19.1688 22.6346C21.5888 21.0146 21.5888 18.3746 19.1688 16.7646C16.4288 14.9346 11.9188 14.9346 9.15875 16.7646Z"
                          stroke="#3C3C3C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      placeholder="Full Name"
                      type="text"
                      name=""
                      id=""
                      {...register("firstName")}
                    />
                  </div> */}
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
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      placeholder="Password"
                      type={togglePassword ? "text" : "password"}
                      name=""
                      id=""
                      {...register("password")}
                    />

                    <i
                      className="absolute top-4 right-3"
                      onClick={handlePassword}
                    >
                      {togglePassword ? (
                        <i>
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
                        </i>
                      ) : (
                        // Add the content to be rendered when toggle is false here
                        <i>
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
                        </i>
                      )}{" "}
                    </i>
                  </div>
                  <p className="text-red-600 mt-1 text-sm ">
                      {errors.password?.message}
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
                      className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      placeholder="Confirm Password"
                      type={confirmTogglePassword ? "text" : "password"}
                      name=""
                      id=""
                      {...register("confirmPassword")}
                    />
                   <i
                      className="absolute top-4 right-3"
                      onClick={handleConfirmPassword}
                    >
                      {confirmTogglePassword ? (
                        <i>
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
                        </i>
                      ) : (
                        // Add the content to be rendered when toggle is false here
                        <i>
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
                        </i>
                      )}{" "}
                    </i>
                  </div>
                  <p className="text-red-600 mt-1 text-sm ">
                      {errors.confirmPassword?.message}
                    </p>
                  <div className="inp mb-4 flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      I accept all{" "}
                      <Link to="/terms&conditions">
                        <b>Terms & Conditions</b>
                      </Link>
                    </label>
                  </div>
                  <div className="inp mb-4">
                    <button
                      // to="/business/personal-info"
                      className="w-full bg-dark_link py-4 text-white font-medium rounded-lg block text-center"
                    onClick={handleSubmit(handleSignUp)}
                   >
                      Sign Up
                    </button>
                  </div>
                  <div className="info flex justify-center">
                    <p>Already have an account?</p>
                    <Link
                      to="/business-login"
                      className="text-dark_link font-bold px-2"
                    >
                      Sign in
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer_two />
      <Verify_Email isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default BusinessSignup;
