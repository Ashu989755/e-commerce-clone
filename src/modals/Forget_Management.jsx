import { X } from "lucide-react";
import React, { useState } from "react";
import { Envelope } from "../assets/image";
import Verify_EmailFogotPass from "./Verify_EmailForgotPass";
import { customerForgotPasswordValidator } from "../helpers/validation";
import { customerForgotPassword } from "../apis/customer/authentication";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

function Forget_Management({ isOpen, closeModal }) {

    const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(customerForgotPasswordValidator),
    });
  
  const [verifyisOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  
  
  const verifyopenModal = (e) => {
    // e.preventDefualt()
    // e.preventDefault();
    setIsOpen(true);
  };
  const verifycloseModal = () => {
    setIsOpen(false);
  };

  const handleForgotPassword = async(data) => {
    try{
      const apiData = {
        Email: data.email
      }
      console.log(apiData)
      console.log("Sending this email to API:", apiData.Email);
      
      const res = await customerForgotPassword(apiData);
      setUserEmail( data.email)

      if(res?.data?.status_code == 201){
        toast.success('Code sent to your email');
       verifyopenModal();
        closeModal();
      } else {
        toast.error(res?.data?.message || 'Error occurred');
      }
      
    }catch (error) {
      console.error('Error in forgot password process:', error);
      toast.error('An error occurred. Please try again.');
    }
}

  // const onSubmit = (data) => console.log(data)
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
                          Forgot Password
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
                          <img src={Envelope} alt="" width="190px" />
                        </div>
                        <div className="desc pb-5">
                          <h3 className="font-bold text-xl text-dark_link text-center">
                            Rediscover Access
                          </h3>
                          <p className="text-center w-1/2 mx-auto my-2">
                            Kindly Provide Your Email Address to Initiate
                            Password Reset
                          </p>
                        </div>
                        <form action=""  >
                          <div className="frg_frm px-6">
                            <div className="inp mb relative">
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
                            <p className="text-red-600 mb-4 ml-2 mt-1 text-sm flex justify-start">
                            {errors.email?.message}
                           </p>
                            <div className="inp mb-4">
                              <button
                                onClick={handleSubmit(handleForgotPassword)}
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
      
        <Verify_EmailFogotPass isOpen={verifyisOpen} closeModal={verifycloseModal}  email={userEmail}  />
    
    </>
  );
}
export default Forget_Management;
