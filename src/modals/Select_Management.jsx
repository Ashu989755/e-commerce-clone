import { ArrowRight, X } from "lucide-react";
import React from "react";
import { bussiness_icn, customer_icn } from "../assets/image";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Select_Management({ isOpen, closeModal }) {
  const navigate = useNavigate();

  const handleUserTypeSelect = (type) => {
    console.log(type,"sdfsdfsf")
    if (type === "business") {
      navigate("/business-login");
    } else {
      navigate("/Login");
    }
  };

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
                          Select your Interface
                        </h3>
                        <button type="button" onClick={closeModal}>
                          <X />
                        </button>
                      </div>
                      <div className="px-6">
                        <p className="text-sm font-medium">
                          Please select your interface
                        </p>
                      </div>

                      <div className="my-5 px-6 ">
                        <div className="itm grid gap-5 cols-span-2">
                          <div className="col-span-1">
                            <a onClick={() => handleUserTypeSelect('customer')}>
                              <div className="flex items-center gap-3 p-4 border rounded-xl border-[#C9C9C9] hover:border-main_gray cursor-pointer">
                                <div className="img">
                                  <img src={customer_icn} alt="" />
                                </div>
                                <div className="desc">
                                  <h3 className="text-lg text-dark_link font-bold">
                                    Customer
                                  </h3>
                                  <p className="text-sm text-main_gray">
                                    for view review
                                  </p>
                                </div>
                                <div className="icn ms-auto">
                                  <span>
                                    <ArrowRight />
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div className="col-span-1">
                            <a onClick={() => handleUserTypeSelect('business')}>
                              <div className="flex items-center gap-3 p-4 border rounded-xl border-[#C9C9C9] hover:border-main_gray cursor-pointer">
                                <div className="img">
                                  <img src={bussiness_icn} alt="" />
                                </div>
                                <div className="desc">
                                  <h3 className="text-lg text-dark_link font-bold">
                                    Business{" "}
                                  </h3>
                                  <p className="text-sm text-main_gray">
                                    for service provider
                                  </p>
                                </div>
                                <div className="icn ms-auto">
                                  <span>
                                    <ArrowRight />
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
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
export default Select_Management;
