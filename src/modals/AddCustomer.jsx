import { User2, User2Icon, X } from "lucide-react";
import React, { useState } from "react";
import { LocationRed, StarYellow, UserIcon } from "../assets/image";
import { businessAddCustomer } from "../apis/business/Profile";
import { useNavigate } from "react-router-dom";
import BusinessAddAddress from "../modals/BusinessAddAddress";
import Business_Rating from "./Business_Rating";
import { registerProfileValidator } from "../helpers/validation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { toast } from "react-toastify";
 
function AddCustomer({ isOpenn, closeModal }) {
  const {
    register,
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerProfileValidator),
  });

  const [uploadedImg, setUploadedImg] = useState(null);
  const [addressOpen, setAddressOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [error, setError] = useState("");
  const [customerAddress, setCustomerAddress] = useState(null);
  const [customerRating, setCustomerRating] = useState(null);

// const Address1 = customerAddress?.Address1
//   const Address2 = customerAddress?.Address2
//   const City = customerAddress?.City
//   const State = customerAddress?.State
//   const latitude = customerAddress?.latitude
//   const longitude = customerAddress?.longitude
//   const zipCode = customerAddress?.zipCode

 

  function handleUploadedImg(e) {
    console.log(e);
    setUploadedImg(URL.createObjectURL(e.target.files[0]));
  }

  const openModal = () => {
    setIsRatingOpen(true);
  };

  const closeRatingModal = () => {
    setIsRatingOpen(false);
  };

  const openAddressModal = () => {
    setAddressOpen(true);
  };

  const closeAddressModal = () => {
    setAddressOpen(false);
  };
  const handleClick = () => {
  openAddressModal(); 
  };

  const handleRatingClick = () => {
    closeRatingModal();
    openModal();
  };

  const handleChange = (value) => {
    setPhoneValue(value);
  };

  const handleAddCustomer = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Fname", data.firstName);
      formData.append("Lname", data.lastName);
      formData.append("ContactNumber", phoneValue);
      if (customerAddress) {

        formData.append("address", JSON.stringify(customerAddress));
        // formData.append("Address1", (Address1));
        // formData.append("Address2", (Address2));
        // formData.append("City", (City));
        // formData.append("State", (State));
        // formData.append("latitude", (latitude));
        // formData.append("longitude", (longitude));
        // formData.append("zipcode", (zipCode));
        
       
      }
      if (customerRating ) {
        formData.append("rating", JSON.stringify(customerRating));
  
     }
      

      if (uploadedImg) {
        formData.append("Image", uploadedImg);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const res = await businessAddCustomer(formData);
      console.log(res,"RESPONSE:")
      toast.success(res.data.message)
      closeModal();
    } catch (error) {
     console.log("ERROR:", error);
     toast.error(res.data.message)
    }
  };

  return (
    <>
      <div>
        {isOpenn && (
          <div
            id="add_modal"
            className="fixed z-[9999] inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block ">
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
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle 
                md:max-w-md w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                {/* Modal Content */}
                <div className="bg-white ">
                  <div className="">
                    <div className="mt-3 py-5 px-5 text-center sm:mt-0 sm:text-left">
                      <div className="relative">
                        <h3 className="text-lg font-semibold">Add Customer</h3>

                        {/* upload img */}
                        <div className="inp_pro relative mt-5 mb-5 size-40 mx-auto flex justify-center ">
                          <span className="inp_fld bg-[#F7F7F7] absolute size-40 border rounded-full overflow-hidden object-contain flex justify-center mx-auto">
                            <img
                              className={`${uploadedImg ? "" : "d-none"}`}
                              src={uploadedImg}
                              alt=""
                            />
                          </span>
                          <button className="btn absolute text-text_dark w-full h-full font-bold flex items-end justify-center  ">
                            <Controller
                              name="profileImage"
                              control={control}
                              render={({
                                field: { value, onChange, ...field },
                              }) => (
                                <input
                                  {...field}
                                  className="absolute top-0 start-0 end-0 bottom-0 opacity-0"
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    onChange(e.target.files[0]);
                                    handleUploadedImg(e);
                                  }}
                                  value={value?.fileName}
                                />
                              )}
                            />
                          </button>
                        </div>
                        <p className="text-red-600 text-sm mb-2 flex justify-center ">
                          {errors.profileImage?.message}
                        </p>

                        <div className="inp my-4 relative">
                          <span className="absolute left-3 top-0 bottom-0 flex items-center ">
                            <img src={UserIcon} alt="" className="h-6 w-6" />
                          </span>
                          <input
                            className="w-full text-sm outline-0 bg-[#F7F7F7] py-4 ps-10 pe-4 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                            placeholder="First  Name"
                            type="text"
                            name=""
                            id=""
                            {...register("firstName")}
                          />
                          <p className="text-red-600 text-sm mb-2 mt-3 ml-1 flex ">
                          {errors.firstName?.message}
                        </p>
                        </div>
                        

                        <div className="inp my-4 relative">
                          <span className="absolute left-3 top-0 bottom-0 flex items-center">
                            <img src={UserIcon} alt="" className="h-6 w-6"/>
                          </span>
                          <input
                            className="w-full text-sm outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                            placeholder="Last Name"
                            type="text"
                            name=""
                            id=""
                            {...register("lastName")}
                          />
                        </div>
                        <p className="text-red-600 text-sm mb-2 flex  mb-2 mt-3 ml-1  ">
                          {errors.lastName?.message}
                        </p>
                        <div className="inp my-4 relative">
                          <div className="relative ">
                            <PhoneInputWithCountry
                              name="phone"
                              control={control}
                              defaultValue=""
                              onChange={handleChange}
                              placeholder="Enter your number"
                              className={`phone-input ${
                                errors.phone ? "input-error" : ""
                              }`}
                              rules={{ required: true }}
                            />
                          </div>
                          {error && <p style={{ color: "red" }}>{error}</p>}
                          {errors.phone && (
                            <p className="text-red-600 text-sm  mb-2 mt-3 ml-1 ">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div className="bg-white shadow-md p-2 my-4 rounded-md border border-slate-100">
                          <div onClick={handleClick}  className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-[#F5F5F5] w-[4.25rem] h-[4.25rem] rounded-lg flex items-center justify-center">
                                <img src={LocationRed} alt="" />
                              </div>
                              <p className="text-sm ms-2">
                                Add Address
                              </p>
                            </div>
                            <div>
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 20L17 14L11 8"
                                  stroke="#3C3C3C"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white shadow-md p-2 my-4 rounded-md border border-slate-100">
                          <div  onClick={handleRatingClick} className="flex items-center justify-between">
                            <div className="flex items-center" >
                              <div className="bg-[#F5F5F5] w-[4.25rem] h-[4.25rem] rounded-lg flex items-center justify-center">
                                <img src={StarYellow} alt="" />
                              </div>
                              <p className="text-sm ms-2">Add Review</p>
                            </div>
                            <div>
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 20L17 14L11 8"
                                  stroke="#3C3C3C"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <button
                            class="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                            // onClick={closeModal}
                            onClick={handleSubmit(handleAddCustomer)}
                          >
                            {" "}
                            Add Customer{" "}
                          </button>
                        </div>
                      </div>
                      <div className="mod_hd absolute right-4 top-3">
                        <button type="button" onClick={closeModal}>
                          {" "}
                          <X color="#3C3C3C" />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <BusinessAddAddress addressOpen={addressOpen} closeAddressModal={closeAddressModal} setCustomerAddress={setCustomerAddress}/>
      <Business_Rating isOpen={isRatingOpen} closeModal={closeRatingModal} setCustomerRating={setCustomerRating}/>
    </>
  );
}

export default AddCustomer;
