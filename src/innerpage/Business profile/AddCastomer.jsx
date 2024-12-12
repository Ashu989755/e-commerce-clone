import React, { useState } from "react";
import Side_links from "./Side_links";
import Header_Business from "../layout/Header_business";
import { EmailIcon, PhoneIcons, UserIcon } from "../../assets/image";
import { Phone, PhoneCall, PhoneCallIcon } from "lucide-react";
import AddBusinessCustomerAddress from "../../modals/AddBusinessCustomerAddress";

const AddCastomer = () => {
  const [addressOpen, setAddressOpen] = useState(false);
  const [customerAddress, setCustomerAddress] = useState(null);

  const openAddressModal = () => {
    setAddressOpen(true);
  };

  const closeAddressModal = () => {
    setAddressOpen(false);
  };

  return (
    <>
      <Header_Business />
      <section className="py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-6">
            <
              
              
              
              
              
              div className="ad_crd py-6 col-span-2">
              <div className="grid ">
                <div className="item shadow-lg rounded-2xl p-10 w-full mx-auto">
                  <div className="desc block items-start md:flex justify-between mb-4">
                    <h3 className="text-xl font-bold text-dark_link">
                      Add Customer
                    </h3>
                  </div>

                  <div className="">
                    <form action="">
                      <div className="inp mb-5 relative">
                        <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                          <img src={EmailIcon} alt="" className="h-6 w-6" />
                        </span>
                        <input
                          className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          placeholder="Enter email"
                          type="Email"
                          name=""
                          id=""
                        />
                      </div>

                      <div className="inp mb-5 relative">
                        <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                          <img src={UserIcon} alt="" className="h-6 w-6" />
                        </span>
                        <input
                          className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          placeholder="First Name"
                          type="text"
                          name=""
                          id=""
                        />
                      </div>

                      <div className="inp mb-5 relative">
                        <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                          <img src={UserIcon} alt="" className="h-6 w-6" />
                        </span>
                        <input
                          className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          placeholder="Last Name"
                          type="text"
                          name=""
                          id=""
                        />
                      </div>

                      <div className="inp mb-5 relative">
                        <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                          <img src={PhoneIcons} alt="" className="h-6 w-6" />
                        </span>
                        <input
                          className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                          placeholder="Phone number"
                          type="text"
                          name=""
                          id=""
                        />
                      </div>

                      <div onClick={openAddressModal} className="flex gap-6">
                        <button
                          type="button"
                          className="w-full bg-white py-4 text-block border-2 font-medium rounded-lg"
                        >
                          Add Address
                        </button>
                        <button
                          type="button"
                          className="w-full bg-dark_link py-4 text-white font-medium rounded-lg"
                        >
                          Add Customer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddBusinessCustomerAddress
        addressOpen={addressOpen}
        closeAddressModal={closeAddressModal}
        setCustomerAddress={setCustomerAddress}
      />
    </>
  );
};

export default AddCastomer;
