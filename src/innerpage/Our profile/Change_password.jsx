import React, { useState } from "react";
import Header_two from "../layout/Header_two";
import Footer_two from "../layout/Footer_two";
import Side_links from "./Side_links";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerChangePassword } from "../../apis/customer/authentication";
import { changePasswordValidator } from "../../helpers/validation";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function Change_password() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordValidator),
  });
  const location = useLocation();
  const navigate = useNavigate();

  const isBusiness = location.pathname.includes("business");

  // Create state to toggle password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async (data) => {
    try {
      const apiData = {
        oldPassword: data.oldPassword,
        password: data.password,
      };
      const res = await customerChangePassword(apiData);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        if (isBusiness) {
          navigate("/business-my-profile");
        } else {
          navigate("/my-profile");
        }
      } else {
        toast.error(res?.data?.message);
      }
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <Header_two></Header_two>

      <section className="pt-20 bg-dark_link grid content-center min-h-72">
        <div className="container mx-auto py-5">
          <div className="grid-cols-2 grid">
            <div className="col-span-2">
              <h3 className="text-center text-white text-2xl font-bold">
                My Profile
              </h3>
              <p className="text-center text-white pt-3">
                Lorem ipsum dolor sit amet consectetur. Tempus urna et gravida
                condimentum.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 lg:col-span-1">
              <Side_links></Side_links>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className="my_pro border shadow-md rounded-xl p-5 my-1 bg-white">
                <h3 className="text-lg font-bold">Change Password</h3>
                <p className="mb-3">
                  Your new password must be unique from those previously used
                </p>
                <hr />

                {/* Old Password Field */}
                <div className="inp my-3 relative">
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
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18.7046C13.3807 18.7046 14.5 17.5853 14.5 16.2046C14.5 14.8239 13.3807 13.7046 12 13.7046C10.6193 13.7046 9.5 14.8239 9.5 16.2046C9.5 17.5853 10.6193 18.7046 12 18.7046Z"
                        stroke="#3C3C3C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 22.2046H7C3 22.2046 2 21.2046 2 17.2046V15.2046C2 11.2046 3 10.2046 7 10.2046H17C21 10.2046 22 11.2046 22 15.2046V17.2046C22 21.2046 21 22.2046 17 22.2046Z"
                        stroke="#3C3C3C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="Old Password"
                    type={showOldPassword ? "text" : "password"} // Toggle input type
                    {...register("oldPassword")}
                  />
                  {/* Eye icon for toggling */}
                  <span
                    className="absolute right-3 top-0 bottom-0 flex items-center h-full cursor-pointer"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
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
                  </span>
                </div>
                <p className="text-red-600 mt-1 ml-2 text-sm ">
                  {errors.oldPassword?.message}
                </p>

                {/* New Password Field */}
                <div className="inp my-3 relative">
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
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18.7046C13.3807 18.7046 14.5 17.5853 14.5 16.2046C14.5 14.8239 13.3807 13.7046 12 13.7046C10.6193 13.7046 9.5 14.8239 9.5 16.2046C9.5 17.5853 10.6193 18.7046 12 18.7046Z"
                        stroke="#3C3C3C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 22.2046H7C3 22.2046 2 21.2046 2 17.2046V15.2046C2 11.2046 3 10.2046 7 10.2046H17C21 10.2046 22 11.2046 22 15.2046V17.2046C22 21.2046 21 22.2046 17 22.2046Z"
                        stroke="#3C3C3C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="New Password"
                    type={showPassword ? "text" : "password"} // Toggle input type
                    {...register("password")}
                  />
                  {/* Eye icon for toggling */}
                  <span
                    className="absolute right-3 top-0 bottom-0 flex items-center h-full cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
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
                  </span>
                </div>
                <p className="text-red-600 mt-1 ml-2 text-sm ">
                  {errors.password?.message}
                </p>

                {/* Confirm Password Field */}
                <div className="inp my-3 relative">
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
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18.7046C13.3807 18.7046 14.5 17.5853 14.5 16.2046C14.5 14.8239 13.3807 13.7046 12 13.7046C10.6193 13.7046 9.5 14.8239 9.5 16.2046C9.5 17.5853 10.6193 18.7046 12 18.7046Z"
                        stroke="#3C3C3C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 22.2046H7C3 22.2046 2 21.2046 2 17.2046V15.2046C2 11.2046 3 10.2046 7 10.2046H17C21 10.2046 22 11.2046 22 15.2046V17.2046C22 21.2046 21 22.2046 17 22.2046Z"
                        stroke="#3C3C3C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"} // Toggle input type
                    {...register("confirmPassword")}
                  />
                  {/* Eye icon for toggling */}
                  <span
                    className="absolute right-3 top-0 bottom-0 flex items-center h-full cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
                  </span>
                </div>
                <p className="text-red-600 mt-1 ml-2 text-sm ">
                  {errors.confirmPassword?.message}
                </p>

                <div className="text-end">
                  <button
                    onClick={handleSubmit(handleChangePassword)}
                    className="bg-text_dark px-10 py-3 rounded-lg text-white"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer_two></Footer_two>
    </>
  );
}

export default Change_password;
