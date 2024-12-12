import React, { useState, useEffect } from "react";
import Header_Business from "../innerpage/layout/Header_business";
import { EmailIcon, PhoneIcons, UserIcon } from "../assets/image";
import AddBusinessCustomerAddress from "./AddBusinessCustomerAddress";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { AddCustomerValidator } from "../helpers/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Add_Edit_Address from "./Add_Edit_Address";

const Add_Edit_Modal = ({ isOpen, closeModalManual, setEstimateCustomers , customerToEdit, editIndex,}) => {
  
  const {
    register,
    handleSubmit,
  
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddCustomerValidator),
    
  });

  console.log(customerToEdit,"CUSTOMER TO EDIT==================================")
  

  const [email, setEmail] = useState( "" );

  const [firstName, setFirstName] = useState( "");
  const [lastName, setLastName] = useState( "");
  const [phoneValue, setPhoneValue] = useState( "");
  const [customerAddress, setCustomerAddress] = useState( null);
  console.log(customerAddress,"==========ADDRESS***********************************************")
  const [addressOpen, setAddressOpen] = useState(false);
  const [error, setError] = useState("");

  const openAddressModal = () => {
    setAddressOpen(true);
  };

  const closeAddressModal = () => {
    setAddressOpen(false);
  };

  const handleChange = (value) => {
    setPhoneValue(value);
  };

  useEffect(() => {
   
    if (customerToEdit) {
     
      setEmail(customerToEdit.customerEmail );

      setFirstName(customerToEdit.firstName);
      setLastName(customerToEdit.lastName);
      setPhoneValue(customerToEdit.customerPhoneno);
      setCustomerAddress({
        customerAddress1: customerToEdit.customerAddress1 || "",
        customerAddress2: customerToEdit.customerAddress2 || "",
        customerCity: customerToEdit.customerCity || "",
        customerState: customerToEdit.customerState || "",
        customerCountry: customerToEdit.customerCountry || "",
        customerZipCode: customerToEdit.customerZipCode || "",
        countryCode: customerToEdit.countryCode || ""
      });
    }
  }, [customerToEdit]);


  

  const handleAddOrUpdateCustomer = () => {
    if (!customerAddress) {
      toast.error("Please add an address before proceeding.");
      return;
    }

    const newCustomer = { email, firstName, lastName, phoneValue, address: customerAddress };

    setEstimateCustomers((prevCustomers) => {
      if (editIndex !== null && editIndex >= 0) {
        const updatedCustomers = [...prevCustomers];
        updatedCustomers[editIndex] = newCustomer;
        return updatedCustomers;
      } else {
        return [...prevCustomers, newCustomer];

      }
    });

    closeModalManual();
  };







  return (
    <>
      <Header_Business />
      {isOpen && (
        <div id="add_modal" className="fixed z-[9999] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={closeModalManual}
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
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="container mx-auto">
                <div className="item shadow-lg rounded-2xl p-10 w-full mx-auto">
                  <h3 className="text-xl font-bold text-dark_link">
                    Add Customer
                  </h3>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="inp mb-5 relative">
                      <input
                        {...register("email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        type="email"
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      />
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="inp mb-5 relative">
                      <input
                        {...register("firstName")}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        type="text"
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      />
                      {errors.firstName && (
                        <p className="text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="inp mb-5 relative">
                      <input
                        {...register("lastName")}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        type="text"
                        className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                      />
                      {errors.lastName && (
                        <p className="text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                    <div className="inp my-4 relative">
                      <div className="relative ">
                        <PhoneInputWithCountry
                          name="phone"
                          control={control}
                          value={phoneValue}
                          defaultValue={customerToEdit.customerPhoneno}
                          onChange={handleChange}
                          placeholder="Enter your number"
                          className={`phone-input ${errors.phone ? "input-error" : ""
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

                    {customerAddress && (
                      <div className="mb-5">
                        <div className="inp mb-2">
                          <input
                            value={`${customerAddress.customerAddress1 || ""}${customerAddress.customerAddress2
                                ? `, ${customerAddress.customerAddress2}`
                                : ""
                              }${customerAddress.customerCity
                                ? `, ${customerAddress.customerCity}`
                                : ""
                              }${customerAddress.customerState
                                ? `, ${customerAddress.customerState}`
                                : ""
                              }${customerAddress.customerCountry
                                ? `, ${customerAddress.customerCountry}`
                                : ""
                              }`}
                            readOnly
                            placeholder="Full Address"
                            type="text"
                            className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm border border-transparent focus:border-text_dark"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-6">
                      <button
                        onClick={openAddressModal}
                        type="button"
                        className="w-full bg-white py-4 text-block border-2 font-medium rounded-lg"
                      >
                        Add Address
                      </button>
                      <button
                        onClick={handleSubmit(handleAddOrUpdateCustomer)}
                        className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                      >
                        {editIndex !== null ? "Update Customer" : "Add Customer"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Add_Edit_Address
        addressOpen={addressOpen}
        closeAddressModal={closeAddressModal}
        setCustomerAddress={setCustomerAddress}
      />
    </>
  );
};

export default Add_Edit_Modal;
