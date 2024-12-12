import { X } from "lucide-react";
import React from "react";
import { FaPercentage } from "react-icons/fa";
import { Link } from "react-router-dom";

function SendEstimates({ isOpen, closeModal ,jobDetail}) {
  console.log(jobDetail)
  
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
                          Request Payment 
                        </h3>
                        <button type="button" onClick={closeModal}>
                          <X />
                        </button>
                      </div>
                      <div className="mt-7">
                        <form action="">
                          <div className="frg_frm px-6">
                            <div className="inp mb-4 relative">
                              <span className="absolute left-3 top-0 bottom-0 flex items-center h-full ">
                                <FaPercentage />
                              </span>
                              <input
                                className="w-full outline-0 bg-[#F7F7F7] py-4 px-10 rounded-lg shadow-sm focus:shadow-md border border-transparent focus:border-text_dark"
                                placeholder="Payment percentage"
                                name=""
                                id=""
                                
                              />
                             
                            </div>
                           
                           <div className="border border-gray-200 rounded-md p-4 space-y-2 mb-4">
                                <h2 className="font-semibold ">Receipt</h2>
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold ">Total price</p>
                                    <p className="font-semibold "> ${jobDetail?.estimateDetails?.grandEstimateTotal + jobDetail?.totalAmount}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600">Total time : {jobDetail?.estimateDetails?.totalHour} Hours</p>
                                    <p className="text-gray-600">{jobDetail?.hourlyPrice}/Per Hour</p>
                                </div>
                           </div>
                          
                           
                            <div className="inp mb-4">
                              <button
                                // onClick={handleSubmit(handleResetPassword)}
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

export default SendEstimates;
