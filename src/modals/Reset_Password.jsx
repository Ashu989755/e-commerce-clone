import { X } from "lucide-react";
import React, {useState} from "react";
import { Envelope, reset_icn } from "../assets/image";
import { customerResetPassword } from "../apis/customer/authentication";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordValidator } from "../helpers/validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function Reset_Password({ isOpen, closeModal, token }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordValidator),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isBusiness = location.pathname === "/business-login";
console.log(token,"======")
  const [togglePassword, setTogglePassword] = useState(false);
  const [confirmTogglePassword, setConfirmTogglePassword] = useState(false);

  const handleResetPassword = async (data) => {
    try {
      const apiData = {
        Password: data.password,
       
      };
      console.log(apiData);
      const res = await customerResetPassword(apiData ,{
        headers: {
          Authorization:  `${token}`,
         }
      }
    );
      if (res?.data?.success == true) {
        closeModal();
        if (isBusiness) {
          navigate("/business-login");
        } else {
          navigate("/Login");
        }
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleTogglePassword = () => {
    setTogglePassword((prevState) => !prevState);
  };
  const handleConfirmPassword = () => {
    setConfirmTogglePassword((prevState) => !prevState);
  }

  return (
    <>
      <div>
        {/* <button onClick={openModal}>Open Modal</button> */}
        {isOpen && (
          <div
            id="add_modal"
            className="fixed z-[9999] inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                onClick={closeModal}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                {/* Modal Content */}
                <div className="bg-white ">
                  <div className="">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <div className="mod_hd flex justify-between px-6 pt-4 pb-1">
                        <h3
                          className="text-xl leading-6 text-gray-900 font-bold block"
                          id="modal-headline"
                        >
                          Reset Password
                        </h3>
                        <button type="button" onClick={closeModal}>
                          <X />
                        </button>
                      </div>
                      <div className="px-6">
                        <p className="text-sm font-medium">
                          Please enter details below
                        </p>
                      </div>
                      <div className="mt-7">
                        <div className="imgg flex justify-center my-5">
                          <img src={reset_icn} alt="" width="190px" />
                        </div>
                        <div className="desc pb-5">
                          <h3 className="font-bold text-xl text-dark_link text-center">
                            Reclaim Account
                          </h3>
                          <p className="text-center w-1/2 mx-auto my-2">
                            {" "}
                            Create a New Password Below to Regain Access
                          </p>
                        </div>
                        <form action="">
                          <div className="frg_frm px-6">
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
                                className="absolute right-3 top-4"
                                onClick={handleTogglePassword}
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
                            <p className="text-red-600 mt-1 ml-2 text-sm ">
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
                                className="absolute right-3 top-4"
                                onClick={handleConfirmPassword}
                              >
                                {confirmTogglePassword ? (
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
                            <p className="text-red-600 mt-1 ml-2 text-sm ">
                              {errors.confirmPassword?.message}
                            </p>
                            <div className="inp mb-4">
                              <button
                                onClick={handleSubmit(handleResetPassword)}
                                className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Reset_Password;
